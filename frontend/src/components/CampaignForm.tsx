import { config } from "process";
import React, { useState } from "react";
import { useWriteContract } from "wagmi";
import { CrowdfundingContractAbi } from "../contractsAbi/CrowdfundingContractAbi";

const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS as `0x${string}`;

const CampaignForm: React.FC = () => {
  const [goal, setGoal] = useState<string>("");
  const [duration, setDuration] = useState<string>("");

  const { writeContractAsync, isPending } = useWriteContract();

  const createCampaign = async () => {
    if (!goal || !duration) return;

    console.log("Creating campaign with goal", goal, "and duration", duration);

    await writeContractAsync({
      ...config,
      address: contractAddress,
      functionName: "createCampaign",
      args: [BigInt(goal) * BigInt(1e18), parseInt(duration, 10)],
      abi: CrowdfundingContractAbi
    });

    console.log("Campaign created");

    setGoal("");
    setDuration("");
    
  }

  return (
    <div className="column is-mobile">
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
        <button className={`button is-link is-large ${isPending && 'is-loading'}`} onClick={createCampaign}>
          Create Campaign
        </button>
      </div>
    </div>
  );
};

export default CampaignForm;
