
const express = require("express");
const router = express.Router();
const multer = require("multer");
const { Web3Storage, getFilesFromPath } = require("web3.storage");
const upload = multer();

// This route expects a JSON file upload (FHIR JSON) in the 'file' field
router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const token = process.env.WEB3STORAGE_TOKEN || "";
    if (!token) return res.status(500).json({ error: "No Web3.Storage token in .env" });
    const client = new Web3Storage({ token });
    const buffer = req.file.buffer;
    const files = [ new File([buffer], "claim.json") ];
    const cid = await client.put(files);
    res.json({ cid });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: e.message });
  }
});

module.exports = router;
