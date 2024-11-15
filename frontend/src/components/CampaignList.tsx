// src/components/CampaignList.tsx

import React, { useState } from "react";
import { ethers } from "ethers";
import Crowdfunding from "../contractsAbi/Crowdfunding.json";

const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS as string;

const CampaignList: React.FC = () => {
  const [campaigns, setCampaigns] = useState<any[]>([]);

  const fetchCampaigns = async () => {
    const provider = new ethers.BrowserProvider((window as any).ethereum);
    const contract = new ethers.Contract(contractAddress, Crowdfunding.abi, provider);

    const campaignsCount = await contract.campaignCount();
    const fetchedCampaigns = [];
    for (let i = 0; i < campaignsCount; i++) {
      const campaign = await contract.campaigns(i);
      fetchedCampaigns.push(campaign);
    }
    setCampaigns(fetchedCampaigns);
  };

  return (
    <div className="column is-mobile">
      <h2 className="subtitle">Available Campaigns</h2>
      <button className="button is-info is-fullwidth" onClick={fetchCampaigns}>Load Campaigns</button>
      <div className="list">
        {campaigns.map((campaign, index) => (
          <div key={index} className="box">
            <p><strong>Goal:</strong> {ethers.formatEther(campaign.goal)} ETH</p>
            <p><strong>Pledged:</strong> {ethers.formatEther(campaign.pledged)} ETH</p>
            <p><strong>Creator:</strong> {campaign.creator}</p>
            <p><strong>Deadline:</strong> {new Date(campaign.deadline * 1000).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CampaignList;
