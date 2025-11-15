
const express = require("express");
const router = express.Router();
const { issueVC } = require("../services/vcIssuer");

// Simple in-memory store for demo. Use DB for production.
const store = {};

router.post("/submit", async (req, res) => {
  const data = req.body;
  const id = data.claimIdOnChain || Date.now();
  store[id] = data;
  // issue a VC (DID-JWT-VC style) and return it
  const vc = await issueVC(data);
  res.json({ ok: true, id, vc });
});

router.get("/:id", (req,res)=>{
  const id = req.params.id;
  res.json(store[id] || null);
});

module.exports = router;
