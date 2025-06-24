async function main() {
    const Crowdfund = await ethers.getContractFactory("Crowdfund");
    const contract = await Crowdfund.deploy(); 
    await contract.waitForDeployment(); 
    console.log("Crowdfund deployed to:", await contract.getAddress());
  }
  
  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
  