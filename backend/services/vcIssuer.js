
// Minimal DID-JWT-VC style issuance (placeholder)
const { createVerifiableCredentialJwt, Issuer } = require('did-jwt-vc');
require('dotenv').config();

// In production use a secure DID key or integration with a KMS
const ISSUER_DID = process.env.ISSUER_DID || 'did:example:insurer';
const ISSUER_PRIVATE_KEY = process.env.ISSUER_PRIVATE_KEY || 'replace_with_real_key';

async function issueVC(claim) {
  // For production: assemble full VC payload and sign with issuer private key
  const vcPayload = {
    sub: claim.claimantAddress,
    nbf: Math.floor(Date.now() / 1000),
    vc: {
      '@context': ['https://www.w3.org/2018/credentials/v1'],
      type: ['VerifiableCredential', 'ClaimReceipt'],
      credentialSubject: {
        id: claim.claimantAddress,
        claim: {
          id: claim.claimIdOnChain,
          fhir: claim.fhirIpfsHash,
          amount: claim.amount
        }
      }
    }
  };

  try {
    // Placeholder: did-jwt-vc requires a signer object. For simplicity, return payload as 'signed' object.
    return { jwt: 'demo.vc.jwt.placeholder', payload: vcPayload };
  } catch (e) {
    console.error(e);
    throw e;
  }
}

module.exports = { issueVC };
