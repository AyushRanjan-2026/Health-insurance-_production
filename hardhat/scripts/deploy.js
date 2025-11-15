
const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  const Ins = await hre.ethers.getContractFactory("InsuranceClaims");
  const contract = await Ins.deploy(deployer.address);
  await contract.deployed();
  console.log("InsuranceClaims deployed to:", contract.address);
}

main().catch((e)=>{console.error(e); process.exitCode=1;});
