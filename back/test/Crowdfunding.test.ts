import hre from "hardhat";
import { expect } from "chai";
import { Crowdfunding } from "../typechain-types";

const { ethers } = hre;

describe("Crowdfunding", function () {
  let crowdfunding: Crowdfunding;
  let owner: any, addr1: any, addr2: any;

  beforeEach(async function () {
    const CrowdfundingFactory = await ethers.getContractFactory("Crowdfunding");
    [owner, addr1, addr2] = await hre.ethers.getSigners();
    crowdfunding = await CrowdfundingFactory.deploy(await owner.getAddress()) as Crowdfunding;
    await crowdfunding.getDeployedCode();
  });

  it("Should get a campaign", async function () {
    await crowdfunding.createCampaign(ethers.parseEther("1"), 86400);
    const campaign = await crowdfunding.getCampaign(0);

    expect(campaign).to.not.be.null;
    expect(campaign.goal).to.equal(ethers.parseEther("1"));
  });

  it("Should get campaignCount", async function () {
    await crowdfunding.createCampaign(ethers.parseEther("1"), 86400);
    const campaignCount = await crowdfunding.getCampaignCount();

    expect(campaignCount).to.not.be.null;
    expect(campaignCount).to.equal(1);
  });

  it("Should create a new campaign", async function () {
    await crowdfunding.createCampaign(ethers.parseEther("1"), 86400);
    const campaign = await crowdfunding.campaigns(0);

    const campaignCount = await crowdfunding.campaignCount();

    expect(campaignCount).to.equal(1);
    expect(campaign.goal).to.equal(ethers.parseEther("1"));
  });

  it("Should allow users to pledge", async function () {
    await crowdfunding.createCampaign(ethers.parseEther("1"), 86400);
    await crowdfunding.connect(addr1).pledge(0, { value: ethers.parseEther("0.5") });
    const campaign = await crowdfunding.campaigns(0);
    expect(campaign.pledged).to.equal(ethers.parseEther("0.5"));
  });

  it("Should allow the owner to claim funds if goal is reached", async function () {
    await crowdfunding.createCampaign(ethers.parseEther("1"), 86400);
    await crowdfunding.connect(addr1).pledge(0, { value: ethers.parseEther("1") });
    await ethers.provider.send("evm_increaseTime", [86400]);
    await crowdfunding.claimFunds(0);
  });

  it("Should allow users to refund if goal is not reached", async function () {
    await crowdfunding.createCampaign(ethers.parseEther("1"), 86400);
    await crowdfunding.connect(addr1).pledge(0, { value: ethers.parseEther("0.5") });
    await ethers.provider.send("evm_increaseTime", [86400]);
    await crowdfunding.connect(addr1).refund(0);
  });
});
