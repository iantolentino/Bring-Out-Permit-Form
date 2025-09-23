// server.js
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const xlsx = require('xlsx');

const app = express();
app.use(bodyParser.json());

// 🔹 Shared folder path (disabled for now)
// const SHARED_PATH = '\\\\10.129.8.11\\common';

// Save Excel file locally
function saveToExcel(data) {
  const date = new Date().toISOString().split('T')[0];
  const filename = `BRING_OUT_PERMIT_${date}.xlsx`;
  const filePath = path.join(__dirname, filename); // save in project folder

  const rows = [
    ['Requisition ID', data.requisitionId],
    ['Requisitioner', data.requisitioner],
    ['Department', data.department],
    ['Date Requested', data.dateRequested],
    ['Date Approved', data.dateApproved],
    ['Validity Date', data.validityDate],
    [],
    ['Approvals'],
    ['Section Head', data.approvals.sectionHead ? '✔' : '✖'],
    ['Department GM', data.approvals.departmentGM ? '✔' : '✖'],
    ['Verified by GS Section', data.approvals.verifiedBy ? '✔' : '✖'],
    ['Approved by GM for Admin', data.approvals.approvedBy ? '✔' : '✖'],
    ['Inspected by Guard', data.approvals.inspectedBy ? '✔' : '✖'],
    [],
    ['Items'],
    ['Item', 'Quantity', 'Serial', 'Remarks'],
    ...data.items.map(i => [i.item, i.quantity, i.serial, i.remarks])
  ];

  const ws = xlsx.utils.aoa_to_sheet(rows);
  const wb = xlsx.utils.book_new();
  xlsx.utils.book_append_sheet(wb, ws, 'Permit');
  xlsx.writeFile(wb, filePath);

  return { filePath, filename };
}

// API: Generate Excel and return download URL
app.post('/api/save', (req, res) => {
  try {
    const data = req.body;
    const { filename } = saveToExcel(data);
    res.send(`/download/${filename}`);
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// API: Serve the generated Excel file for download
app.get('/download/:filename', (req, res) => {
  const filePath = path.join(__dirname, req.params.filename);
  res.download(filePath, req.params.filename, (err) => {
    if (err) console.error("Download error:", err);
    fs.unlink(filePath, () => {}); // cleanup after download
  });
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
