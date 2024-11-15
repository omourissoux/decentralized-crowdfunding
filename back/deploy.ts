import { ignition } from "hardhat";
import CrowdfundingModule from "./ignition/modules/Crowdfunding";

async function main() {
  const deployCrowdfunding = ignition.deploy(CrowdfundingModule);

  const deployed = await deployCrowdfunding;

  console.log("Crowdfunding contract deployed to:", deployed.crowdfunding.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
