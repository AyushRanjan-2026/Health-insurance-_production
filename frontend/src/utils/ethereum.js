
import { ethers } from "ethers";

const ABI = [
  {"inputs":[{"internalType":"string","name":"fhirHash","type":"string"},{"internalType":"uint256","name":"amount","type":"uint256"}],
   "name":"submitClaim","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"}
];

export const getContract = async (contractAddress) => {
  if (!window.ethereum) throw new Error("MetaMask not found");
  await window.ethereum.request({ method: "eth_requestAccounts" });
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  return new ethers.Contract(contractAddress, ABI, signer);
};

export async function submitClaimOnChain(fhirHash, amount){
  const CONTRACT = process.env.REACT_APP_CONTRACT_ADDRESS || "REPLACE_DEPLOYED_ADDRESS";
  const contract = await getContract(CONTRACT);
  return await contract.submitClaim(fhirHash, amount);
}
