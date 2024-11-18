import React, { useState } from 'react';
import { ethers } from 'ethers';
import { useReadContract, useReadContracts } from 'wagmi';
import { hardhat } from 'wagmi/chains'

const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS as `0x${string}`;

const CampaignList: React.FC = () => {
  const [campaigns, setCampaigns] = useState<any[]>([]);

  console.log("contractAddress", contractAddress);

  const crowdFunfingContract ={
    chainId: hardhat.id,
    address: contractAddress
  }

  const {data : campaignCount, isLoading: isLoadingCampaignCount } = useReadContract({
    ...crowdFunfingContract,
    functionName: "getCampaignCount",
    query: {
      enabled: !!contractAddress
    }
  });

  const buildCampaignsCalls = () => {
    const campaignCountFormatted = campaignCount ? Number(campaignCount.toString()) : 0;
    console.log("Formatted campaignCount:", campaignCountFormatted);
    
    return Array.from({ length: campaignCountFormatted }).map(
      (_, index) => ({
        ...crowdFunfingContract,
        functionName: "getCampaign",
        args: [index],
        // query: {
        //   enabled: index > 0 && !!isLoadingCampaignCount
        // }
      })
    );
  }

  const { data: campaignsData, isLoading: campaignsLoading } = useReadContracts({ contracts : buildCampaignsCalls() });

  const fetchCampaigns = () => {

    console.log("Fetching campaigns : ", campaignsData);

    const fetchedCampaigns = campaignsData?.map((campaign: any) => ({
      ...campaign,
      goal: ethers.formatEther(campaign.goal),
      pledged: ethers.formatEther(campaign.pledged),
    }));

    console.log("Fetched campaigns:", fetchedCampaigns);

    setCampaigns(fetchedCampaigns ?? []);
  }

  return (
    <div className="column is-mobile">
      <h2 className="subtitle">Available Campaigns</h2>
      <button className={`button is-info is-large ${isLoadingCampaignCount && campaignsLoading && 'is-loading'}`} onClick={fetchCampaigns}>Load Campaigns</button>
      <div className="list">
        {campaigns.map((campaign, index) => (
          <div key={index} className="box">
            <p><strong>Goal:</strong> {campaign.goal} ETH</p>
            <p><strong>Pledged:</strong> {campaign.pledged} ETH</p>
            <p><strong>Creator:</strong> {campaign.creator}</p>
            <p><strong>Deadline:</strong> {new Date(Number(campaign.deadline) * 1000).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CampaignList;
