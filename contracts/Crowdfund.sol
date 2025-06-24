// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Crowdfund {
    struct Campaign {
        address creator;
        string title;
        uint goal;
        uint deadline;
        uint raised;
        bool withdrawn;
        mapping(address => uint) contributions;
    }

    uint public campaignCount;
    mapping(uint => Campaign) public campaigns;

    event CampaignCreated(uint id, string title, address creator);
    event DonationReceived(uint campaignId, address donor, uint amount);
    event FundsWithdrawn(uint campaignId);
    event RefundIssued(uint campaignId, address donor);

    function createCampaign(string memory _title, uint _goal, uint _durationDays) external {
        require(_goal > 0, "Goal must be positive");

        Campaign storage c = campaigns[campaignCount];
        c.creator = msg.sender;
        c.title = _title;
        c.goal = _goal;
        c.deadline = block.timestamp + (_durationDays * 1 days);

        emit CampaignCreated(campaignCount, _title, msg.sender);
        campaignCount++;
    }

    function donate(uint _id) external payable {
        Campaign storage c = campaigns[_id];
        require(block.timestamp < c.deadline, "Campaign ended");
        require(msg.value > 0, "Must send ETH");

        c.contributions[msg.sender] += msg.value;
        c.raised += msg.value;

        emit DonationReceived(_id, msg.sender, msg.value);
    }

    function withdraw(uint _id) external {
        Campaign storage c = campaigns[_id];
        require(msg.sender == c.creator, "Only creator can withdraw");
        require(block.timestamp >= c.deadline, "Campaign still active");
        require(c.raised >= c.goal, "Goal not reached");
        require(!c.withdrawn, "Already withdrawn");

        c.withdrawn = true;
        payable(c.creator).transfer(c.raised);
        emit FundsWithdrawn(_id);
    }

    function refund(uint _id) external {
        Campaign storage c = campaigns[_id];
        require(block.timestamp >= c.deadline, "Campaign still active");
        require(c.raised < c.goal, "Goal was reached");

        uint amount = c.contributions[msg.sender];
        require(amount > 0, "Nothing to refund");

        c.contributions[msg.sender] = 0;
        payable(msg.sender).transfer(amount);
        emit RefundIssued(_id, msg.sender);
    }
}
