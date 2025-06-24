  Crowdfunding DApp

**Crowdfunding App** is a decentralized web application (DApp) built on Ethereum, enabling transparent and secure crowdfunding campaigns without intermediaries.

      

   Table of Contents

1. [Features]( features)
2. [Demo]( demo)
3. [Tech Stack]( tech  stack)
4. [Folder Structure]( folder  structure)
5. [Getting Started]( getting  started)

   * [Prerequisites]( prerequisites)
   * [Installation]( installation)
   * [Deployment]( deployment)
   * [Usage]( usage)
6. [How It Works]( how  it  works)
7. [Why Web 3.0?]( why  web  30)
8. [Contributing]( contributing)
9. [License]( license)

      

   Features

* **Create Campaigns**: Define a title, funding goal (in ETH), and deadline.
* **Donate Funds**: Contribute ETH to live campaigns.
* **Withdraw Funds**: Campaign owners can withdraw collected funds if the goal is met.
* **Refunds**: Donors can claim refunds if the campaign fails to reach its goal.
* **Campaign Listings**: View all campaigns with details (title, goal, amount raised, status).
* **On  Chain Transparency**: All actions are recorded on Ethereum for immutability and security.

      

   Demo

> *(Include a link or GIF of the running application here)*

      

   Tech Stack

| Technology  | Purpose                                |
|                        |                                                                              |
| Solidity    | Smart contracts on Ethereum            |
| Hardhat     | Local blockchain environment & testing |
| Ethers.js   | Frontend ↔ Blockchain communication    |
| HTML/CSS/JS | User interface and interaction logic   |
| Bootstrap   | Basic styling and responsive layout    |
| MetaMask    | Web3 wallet for user authentication    |

      

   Folder Structure

```
crowdfund  dapp/
├── contracts/           Solidity smart contracts
│   └── Crowdfund.sol    Crowdfunding contract
├── frontend/            Frontend application
│   ├── index.html       User interface
│   ├── app.js           DApp interaction logic
│   └── pozadina.png     Background image
├── scripts/             Deployment scripts
│   └── deploy.js        Deploy contract to network
├── hardhat.config.js    Hardhat configuration
└── package.json         Project dependencies
```

      

   Getting Started

    Prerequisites

* [Node.js](https://nodejs.org/) v14+
* [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/)
* [MetaMask](https://metamask.io/) extension

    Installation

1. Clone the repo:

   ```bash
   git clone https://github.com/yourusername/crowdfund  dapp.git
   cd crowdfund  dapp
   ```
2. Install dependencies:

   ```bash
   npm install
   ```

    Deployment

1. Start a local Hardhat node:

   ```bash
   npx hardhat node
   ```
2. Deploy smart contracts:

   ```bash
   npx hardhat run scripts/deploy.js     network localhost
   ```

    Usage

1. Open `frontend/index.html` in your browser.
2. Connect MetaMask to the local Hardhat network.
3. Create, fund, or manage campaigns directly from the UI.

      

   How It Works

1. **Create Campaign**: Users submit a title, funding goal (ETH), and duration (days). The contract stores campaign details on  chain.
2. **Donations**: Contributors send ETH to the contract; balances update in real  time.
3. **Withdraw / Refund**:

   * If the funding goal is reached by the deadline, the campaign owner can withdraw funds.
   * Otherwise, donors can claim refunds after the deadline.
4. **Display Campaigns**: Frontend fetches campaign data from the contract and displays status, funds raised, and deadlines.

      

   Why Web 3.0?

* **Decentralization**: Data lives on the blockchain, not a central server.
* **User Ownership**: Each participant uses their own wallet for full control over funds.
* **Trustless Interaction**: Smart contracts enforce rules without intermediaries.

      

   Contributing

Contributions are welcome! Please open an issue or submit a pull request.

      

  

Distributed under the MIT License. See [LICENSE](LICENSE) for details.
