# Integrating Blockchain & Dual Verification to Enhance Security in Smart Agriculture Crowdfunding

![Blockchain](https://img.shields.io/badge/Main_Tech-Blockchain-blueviolet)
![Security](https://img.shields.io/badge/Focus-Security_%26_Trust-green)
![Status](https://img.shields.io/badge/Status-Completed-success)

## 📖 Overview
Traditional crowdfunding for agriculture often suffers from a lack of transparency and high risk of fraud. This project introduces a **Smart Agriculture Crowdfunding Platform** that leverages Blockchain technology and a **Dual Verification Mechanism** to ensure that funds are used appropriately and investors are protected.

## 🛡️ Key Features
- **Blockchain Ledger:** Every transaction and funding milestone is recorded on an immutable ledger, providing 100% transparency.
- **Dual Verification Mechanism:** Implements a two-tier validation process involving both automated smart contract triggers and manual/IOT-based agricultural verification.
- **Smart Contracts:** Automated fund release based on project milestones (Escrow-style).
- **Security:** Reduced risk of "rug pulls" or misappropriation of agricultural funds.

## 🏗️ System Architecture
The system is divided into three main layers:
1. **User Interface:** A dashboard for farmers to list projects and investors to fund them.
2. **Logic Layer:** The Dual Verification engine that checks project progress.
3. **Blockchain Layer:** Smart contracts (Solidity/Ethereum) handling the financial transactions.



## 🛠️ Tech Stack
- **Blockchain:** Ethereum / Solidity (Smart Contracts)
- **Backend:** Node.js, Express
- **Frontend:** React.js
- **Database:** PostgreSQL (for off-chain metadata)
- **Tools:** Truffle/Hardhat, Metamask

## 🚀 Getting Started

### Prerequisites
- Node.js (v16+)
- Metamask Extension
- A local blockchain like Ganache

### Installation
1. Clone the repo:
   ```bash
   git clone [https://github.com/Maitray-Jariwala/Your-Repo-Name.git](https://github.com/Maitray-Jariwala/Your-Repo-Name.git)

2. Install Dependencies:
   ```bash
   npm install
   
3. Deploy Smart Contracts:
   ```bash
   truffle migrate

4. Run the application:
   ```bash
   npm start

📈 Impact
By integrating decentralized trust, this project aims to empower small-scale farmers who lack access to traditional banking while providing urban investors with a secure way to support sustainable agriculture.
