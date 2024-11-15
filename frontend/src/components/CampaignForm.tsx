import React, { useState } from "react";
import { BrowserProvider, Contract } from "ethers";
import Crowdfunding from "../contractsAbi/Crowdfunding.json";

const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS as string;

const CampaignForm: React.FC = () => {
  const [goal, setGoal] = useState<string>("");
  const [duration, setDuration] = useState<string>("");

  const createCampaign = async () => {
    if (!goal || !duration) return;

    const provider = new BrowserProvider((window as any).ethereum);
    const signer = await provider.getSigner();
    const contract = new Contract(contractAddress, Crowdfunding.abi, signer);

    await contract.createCampaign(BigInt(goal) * BigInt(1e18), parseInt(duration, 10));
    setGoal("");
    setDuration("");
  };

  return (
    <div className="column is-half">
      <h2 className="subtitle">Create a Campaign</h2>
      <div className="field">
        <label className="label">Goal (ETH)</label>
        <div className="control">
          <input
            className="input"
            type="text"
            placeholder="Goal in ETH"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
          />
        </div>
      </div>
      <div className="field">
        <label className="label">Duration (in seconds)</label>
        <div className="control">
          <input
            className="input"
            type="text"
            placeholder="Duration in seconds"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          />
        </div>
      </div>
      <div className="control">
        <button className="button is-link is-fullwidth" onClick={createCampaign}>
          Create Campaign
        </button>
      </div>
    </div>
  );
};

export default CampaignForm;
