
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/access/AccessControl.sol";

contract InsuranceClaims is AccessControl {
    bytes32 public constant INSURER_ROLE = keccak256("INSURER_ROLE");
    uint256 public claimCount;

    struct Claim {
        uint256 id;
        address claimant;
        string fhirHash;
        uint256 amount;
        bool approved;
        uint256 timestamp;
    }

    mapping(uint256 => Claim) public claims;
    mapping(address => uint256[]) public claimsByAddress;

    event ClaimSubmitted(uint256 indexed id, address indexed claimant, string fhirHash, uint256 amount);
    event ClaimApproved(uint256 indexed id, address indexed approver);

    constructor(address admin) {
        _setupRole(DEFAULT_ADMIN_ROLE, admin);
        _setupRole(INSURER_ROLE, admin);
        claimCount = 0;
    }

    function submitClaim(string memory fhirHash, uint256 amount) external returns (uint256) {
        claimCount += 1;
        claims[claimCount] = Claim({
            id: claimCount,
            claimant: msg.sender,
            fhirHash: fhirHash,
            amount: amount,
            approved: false,
            timestamp: block.timestamp
        });
        claimsByAddress[msg.sender].push(claimCount);
        emit ClaimSubmitted(claimCount, msg.sender, fhirHash, amount);
        return claimCount;
    }

    function approveClaim(uint256 id) external onlyRole(INSURER_ROLE) {
        Claim storage c = claims[id];
        require(c.id != 0, "Claim does not exist");
        require(!c.approved, "Already approved");
        c.approved = true;
        emit ClaimApproved(id, msg.sender);
    }

    function getClaimsOf(address who) external view returns (uint256[] memory) {
        return claimsByAddress[who];
    }
}
