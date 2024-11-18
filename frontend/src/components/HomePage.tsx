import React from 'react';
import CampaignForm from './CampaignForm';
import CampaignList from './CampaignList';
import { useAccount } from 'wagmi';
import ConnectWallet from './ConnectWallet';


const HomePage: React.FC = () => {
  const { isConnected } = useAccount()

    if (isConnected)
      return (
        <div className="container">
          <section className="section">
            <h1 className="title">Decentralized Crowdfunding Platform</h1>
            <CampaignForm />
            <CampaignList />
          </section>
        </div>
      );

    return <ConnectWallet />;
};

export default HomePage;
