const contractAddress = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0"; // zamijeni po potrebi

const abi = [
  {
    "inputs": [
      { "internalType": "string", "name": "_title", "type": "string" },
      { "internalType": "uint256", "name": "_goal", "type": "uint256" },
      { "internalType": "uint256", "name": "_durationDays", "type": "uint256" }
    ],
    "name": "createCampaign",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "uint256", "name": "_id", "type": "uint256" }
    ],
    "name": "donate",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "uint256", "name": "_id", "type": "uint256" }
    ],
    "name": "withdraw",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "uint256", "name": "_id", "type": "uint256" }
    ],
    "name": "refund",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "campaignCount",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "name": "campaigns",
    "outputs": [
      { "internalType": "address", "name": "creator", "type": "address" },
      { "internalType": "string", "name": "title", "type": "string" },
      { "internalType": "uint256", "name": "goal", "type": "uint256" },
      { "internalType": "uint256", "name": "deadline", "type": "uint256" },
      { "internalType": "uint256", "name": "raised", "type": "uint256" },
      { "internalType": "bool", "name": "withdrawn", "type": "bool" }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];

let provider, signer, contract;

async function connectWallet() {
  if (window.ethereum) {
    provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    signer = provider.getSigner();
    contract = new ethers.Contract(contractAddress, abi, signer);
    alert("MetaMask povezan!");
    listCampaigns();
    updateTotalRaised();
  } else {
    alert("Instaliraj MetaMask.");
  }
}

async function createCampaign() {
  const title = document.getElementById("title").value;
  const goal = document.getElementById("goal").value;
  const duration = document.getElementById("days").value;

  try {
    const tx = await contract.createCampaign(
      title,
      ethers.utils.parseEther(goal),
      duration
    );
    await tx.wait();
    alert("Kampanja kreirana!");
    listCampaigns();
    updateTotalRaised();
  } catch (err) {
    console.error("Greška:", err);
    alert("Neuspjelo kreiranje.");
  }
}

async function donate() {
  const campaignId = document.getElementById("campaignIdDonate").value;
  const amount = document.getElementById("amountDonate").value;

  try {
    const tx = await contract.donate(campaignId, {
      value: ethers.utils.parseEther(amount)
    });
    await tx.wait();
    alert("Donirano!");
    listCampaigns();
    updateTotalRaised();
  } catch (err) {
    console.error("Greška:", err);
    alert("Neuspješna donacija.");
  }
}

async function withdraw() {
  const campaignId = document.getElementById("campaignIdWithdraw").value;

  try {
    const tx = await contract.withdraw(campaignId);
    await tx.wait();
    alert("Sredstva podignuta!");
    listCampaigns();
    updateTotalRaised();
  } catch (err) {
    console.error("Greška:", err);
    alert("Neuspješno podizanje.");
  }
}

async function refund() {
  const campaignId = document.getElementById("campaignIdRefund").value;

  try {
    const tx = await contract.refund(campaignId);
    await tx.wait();
    alert("Refundirano!");
    listCampaigns();
    updateTotalRaised();
  } catch (err) {
    console.error("Greška:", err);
    alert("Neuspješna refundacija.");
  }
}

async function listCampaigns() {
  if (!contract) return;
  try {
    const count = await contract.campaignCount();
    const list = document.getElementById("campaignList");
    list.innerHTML = "";

    for (let i = 0; i < count; i++) {
      const c = await contract.campaigns(i);

      const div = document.createElement("div");
      div.className = "campaign";
      div.innerHTML = `
        <h5 class="text-light">#${i}: ${c.title}</h5>
        <p class="text-light small">🎯 Cilj: ${ethers.utils.formatEther(c.goal)} ETH</p>
        <p class="text-light small">💰 Prikupljeno: ${ethers.utils.formatEther(c.raised)} ETH</p>
        <p class="text-light small">⏳ Rok: ${new Date(c.deadline * 1000).toLocaleString()}</p>
        <p class="text-light small">👤 Autor: ${c.creator}</p>
        <p class="text-light small">💼 Status: ${c.withdrawn ? "✅ Podignuto" : "📥 Aktivno"}</p>
      `;
      list.appendChild(div);
    }
  } catch (err) {
    console.error("Greška pri dohvaćanju kampanja:", err);
  }
}

async function updateTotalRaised() {
  if (!contract) return;
  try {
    const count = await contract.campaignCount();
    let total = ethers.BigNumber.from(0);

    for (let i = 0; i < count; i++) {
      const campaign = await contract.campaigns(i);
      total = total.add(campaign.raised);
    }

    const eth = ethers.utils.formatEther(total);
    document.getElementById("totalRaised").innerText = `Ukupno prikupljeno: ${eth} ETH`;
  } catch (err) {
    console.error("Greška pri ukupnom zbroju:", err);
  }
}
