
import React, { useState } from "react";
import axios from "axios";
import { submitClaimOnChain } from "../utils/ethereum";
import { Web3Storage } from "web3.storage";

export default function ClaimForm(){
  const [file, setFile] = useState(null);
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState("");

  async function uploadToIpfs(file) {
    const token = process.env.REACT_APP_WEB3STORAGE_TOKEN || '';
    if(!token) throw new Error("No Web3.Storage token. Set REACT_APP_WEB3STORAGE_TOKEN");
    const client = new Web3Storage({ token });
    const cid = await client.put([file]);
    return cid;
  }

  async function onSubmit(e){
    e.preventDefault();
    setStatus("Uploading to IPFS...");
    try {
      const fileObj = new File([file], "claim.json");
      const cid = await uploadToIpfs(fileObj);
      setStatus("IPFS CID: " + cid + " — sending tx...");
      const tx = await submitClaimOnChain(cid, parseInt(amount));
      await tx.wait();
      // call backend to issue VC
      await axios.post("http://localhost:4000/api/claims/submit", {
        claimantAddress: window.ethereum.selectedAddress,
        fhirIpfsHash: cid,
        amount: parseInt(amount),
        claimIdOnChain: 1
      });
      setStatus("Submitted & VC issued (demo)");
    } catch (e) {
      setStatus("Error: " + e.message);
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <div>
        <label>FHIR JSON file</label>
        <input type="file" accept=".json" onChange={e=>setFile(e.target.files[0])} />
      </div>
      <div>
        <label>Amount</label>
        <input value={amount} onChange={e=>setAmount(e.target.value)} />
      </div>
      <button>Submit Claim</button>
      <p>{status}</p>
    </form>
  );
}
