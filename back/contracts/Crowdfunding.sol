// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.27;

contract Crowdfunding {
    struct Campaign {
        address creator;
        uint256 goal;
        uint256 pledged;
        uint256 deadline;
        bool isClaimed;
    }

    uint256 public campaignCount;
    mapping(uint256 => Campaign) public campaigns;
    mapping(uint256 => mapping(address => uint256)) public contributions;

    event CampaignCreated(uint256 campaignId, address indexed creator, uint256 goal, uint256 deadline);
    event Pledged(uint256 campaignId, address indexed contributor, uint256 amount);
    event Refunded(uint256 campaignId, address indexed contributor, uint256 amount);
    event Claimed(uint256 campaignId, address indexed creator, uint256 amount);

    modifier onlyCampaignOwner(uint256 _campaignId) {
        require(campaigns[_campaignId].creator == msg.sender, "Not the campaign owner");
        _;
    }

    function createCampaign(uint256 _goal, uint256 _duration) external {
        require(_goal > 0, "Goal must be greater than zero");
        require(_duration > 0, "Duration must be greater than zero");

        uint256 deadline = block.timestamp + _duration;

        campaigns[campaignCount] = Campaign({
            creator: msg.sender,
            goal: _goal,
            pledged: 0,
            deadline: deadline,
            isClaimed: false
        });

        emit CampaignCreated(campaignCount, msg.sender, _goal, deadline);
        campaignCount++;
    }

    function pledge(uint256 _campaignId) external payable {
        Campaign storage campaign = campaigns[_campaignId];
        require(block.timestamp < campaign.deadline, "Campaign has ended");
        require(msg.value > 0, "Pledge amount must be greater than zero");

        campaign.pledged += msg.value;
        contributions[_campaignId][msg.sender] += msg.value;

        emit Pledged(_campaignId, msg.sender, msg.value);
    }

    function claimFunds(uint256 _campaignId) external onlyCampaignOwner(_campaignId) {
        Campaign storage campaign = campaigns[_campaignId];
        require(block.timestamp >= campaign.deadline, "Campaign still active");
        require(campaign.pledged >= campaign.goal, "Goal not reached");
        require(!campaign.isClaimed, "Funds already claimed");

        campaign.isClaimed = true;
        payable(campaign.creator).transfer(campaign.pledged);

        emit Claimed(_campaignId, msg.sender, campaign.pledged);
    }

    function refund(uint256 _campaignId) external {
        Campaign storage campaign = campaigns[_campaignId];
        require(block.timestamp >= campaign.deadline, "Campaign still active");
        require(campaign.pledged < campaign.goal, "Goal was reached");

        uint256 amount = contributions[_campaignId][msg.sender];
        require(amount > 0, "No contributions to refund");

        contributions[_campaignId][msg.sender] = 0;
        payable(msg.sender).transfer(amount);

        emit Refunded(_campaignId, msg.sender, amount);
    }
}
