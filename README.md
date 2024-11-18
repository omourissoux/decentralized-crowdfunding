
# **Decentralized Crowdfunding Platform**

![PWA Badge](https://img.shields.io/badge/Progressive%20Web%20App-PWA-blue)  
![React Badge](https://img.shields.io/badge/Frontend-React-blue)  
![Hardhat Badge](https://img.shields.io/badge/Backend-Hardhat-yellow)  
![Solidity Badge](https://img.shields.io/badge/Smart%20Contracts-Solidity-363636)  
![License Badge](https://img.shields.io/badge/license-MIT-green)

## A decentralized crowdfunding platform built with **React PWA**, **Hardhat**, and **Solidity**

---

## **Features**

### 🖥️ **Frontend (React PWA)**

- Mobile-first design using **Bulma CSS**.
- Progressive Web App (PWA) with offline capabilities.
- Wallet authentication via **Wagmi** and **WalletConnect**.
- Responsive UI for managing campaigns.

### 🔗 **Backend (Hardhat & Solidity)**

- Smart contracts for creating and managing campaigns.
- Full support for Ethereum-based wallets.
- Deployed on a testnet (e.g., Goerli or Sepolia).
- Gas-optimized Solidity code using the latest version of **OpenZeppelin**.

---

## **Getting Started**

### Prerequisites

Ensure you have the following installed on your system:

- **Node.js** >= 18.x
- **npm** or **yarn**
- **Hardhat CLI**
- **MetaMask** or any Ethereum wallet

---

### **1. Clone the Repository**

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

---

### **2. Setup the Backend (Hardhat)**

Navigate to the `backend/` folder to set up the Hardhat environment:

```bash
cd backend
npm install
```

#### **Configure the Network**

1. Create a `.env` file:
   ```bash
   cp .env.example .env
   ```

2. Add your **Infura/Alchemy API Key** and **Private Key**:
   ```dotenv
   ALCHEMY_API_KEY=your-alchemy-api-key
   PRIVATE_KEY=your-private-key
   ```

#### **Compile Contracts**

```bash
npx hardhat compile
```

#### **Run Tests**

```bash
npx hardhat test
```

#### **Deploy to a Testnet**

```bash
npx hardhat run scripts/deploy.ts --network goerli
```

---

### **3. Setup the Frontend (React PWA)**

Navigate to the `frontend/` folder to set up the React application:

```bash
cd frontend
npm install
```

#### **Start the Development Server**

```bash
npm start
```

---

## **Directory Structure**

```
root/
│
├── backend/
│   ├── contracts/           # Solidity contracts
│   ├── scripts/             # Deployment scripts
│   ├── test/                # Test cases
│   ├── artifacts/           # Generated files after compilation
│   ├── typechain/           # TypeScript types for contracts
│   └── hardhat.config.ts    # Hardhat configuration
│
├── frontend/
│   ├── public/              # Static assets (manifest, icons)
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── styles/          # Custom styles
│   │   ├── wagmiConfig.ts   # Wagmi configuration
│   │   └── App.tsx          # Main React component
│   ├── serviceWorker.ts     # Service worker for PWA
│   └── index.tsx            # Application entry point
│
└── README.md                # Project documentation
```

---

## **Usage**

### Create a Campaign

1. Connect your wallet via WalletConnect.
2. Enter the campaign goal (in ETH) and duration (in seconds).
3. Click **"Create Campaign"**.

### View Campaigns

1. Click **"Load Campaigns"** to fetch active campaigns.
2. View details such as goal, pledged amount, creator, and deadline.

### Pledge to a Campaign

1. Select a campaign and pledge an amount in ETH.
2. Confirm the transaction in your wallet.

### Claim or Refund

- Campaign creators can claim funds if the goal is met.
- Contributors can refund their ETH if the goal is not met.

---

## **Deployment**

### Deploy Smart Contracts to Ethereum Mainnet/Testnet

1. Ensure your `.env` is correctly configured.
2. Deploy using Hardhat:
   ```bash
   npx hardhat run scripts/deploy.ts --network mainnet
   ```

### Build and Deploy the PWA

1. Build the frontend:
   ```bash
   npm run build
   ```
2. Deploy the `build/` folder to any static hosting service, such as:
   - **Netlify**
   - **Vercel**
   - **GitHub Pages**

---

## **Technologies Used**

### **Frontend**
- **React** (PWA)
- **Wagmi** (Wallet management)
- **Bulma** (CSS Framework)
- **Workbox** (Service worker)

### **Backend**
- **Hardhat** (Smart contract development)
- **Solidity** (Smart contracts)
- **OpenZeppelin** (Security standards)

---

## **Testing**

- **Unit Tests** : Solidity contracts are tested using Hardhat.
- **Integration Tests** : Wallet interactions are tested with Wagmi.

---

## **Contributing**

We welcome contributions! Follow these steps to contribute:

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature/your-feature
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add new feature"
   ```
4. Push to the branch:
   ```bash
   git push origin feature/your-feature
   ```
5. Open a Pull Request.

---

## **License**

This project is licensed under the **MIT License**. See the [LICENSE](./LICENSE) file for details.

---

## **Acknowledgements**

- [Wagmi Documentation](https://wagmi.sh/docs)
- [Hardhat Documentation](https://hardhat.org/docs)
- [Bulma CSS](https://bulma.io/)
- [WalletConnect](https://walletconnect.com/)

---
