import React from 'react';
import { useAccount } from 'wagmi';
import ConnectWallet from './ConnectWallet';
import CampaignForm from './CampaignForm';
import CampaignList from './CampaignList';

const HomePage: React.FC = () => {
  const { isConnected } = useAccount();

  if (!isConnected) {
    return (
      <section className="section">
        <div className="container">
          <h1 className="title">Welcome to Decentralized Crowdfunding</h1>
          <p className="subtitle">Please connect your wallet to continue.</p>
          <ConnectWallet />
        </div>
      </section>
    );
  }

  return (
    <div className="container">
      <section className="section">
        <h1 className="title">Decentralized Crowdfunding Platform</h1>
        <CampaignForm />
        <CampaignList />
      </section>
    </div>
  );
};

export default HomePage;
