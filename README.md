
# Healthcare Claims DApp (Production-style demo)

This project contains:
- Hardhat smart contract with OpenZeppelin AccessControl
- Backend with IPFS (web3.storage) upload route and DID/VC issuance placeholder
- Frontend React app that uploads FHIR JSON to IPFS, submits claim on-chain, and calls backend to issue VC

## Quick start (development)
1. Hardhat node & deploy:
   - cd hardhat
   - npm install
   - npx hardhat compile
   - npx hardhat node
   (in new terminal) npx hardhat run scripts/deploy.js --network localhost

2. Backend:
   - cd backend
   - npm install
   - copy .env.example to .env and fill WEB3STORAGE_TOKEN
   - npm start

3. Frontend:
   - cd frontend
   - npm install
   - copy .env.example to .env and set REACT_APP_WEB3STORAGE_TOKEN and REACT_APP_CONTRACT_ADDRESS
   - npm start
