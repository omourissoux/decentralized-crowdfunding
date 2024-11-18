// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const publicKey = process.env.PUB_KEY as `0x${string}`;
console.log("publicKey", publicKey);
console.log("publicKey", process.env.PUB_KEY);

const CrowdfundingModule = buildModule("CrowdfundingModule", (m) => {

  const crowdfunding = m.contract("Crowdfunding", ["0xdD2FD4581271e230360230F9337D5c0430Bf44C0"], {});

  return { crowdfunding };
});

export default CrowdfundingModule;