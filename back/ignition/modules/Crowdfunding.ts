// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const CrowdfundingModule = buildModule("CrowdfundingModule", (m) => {

  const crowdfunding = m.contract("Crowdfunding", [], {});

  return { crowdfunding };
});

export default CrowdfundingModule;