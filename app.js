document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('requisition-form');
  const dateRequestedInput = document.getElementById('date-requested');
  const dateApprovedInput = document.getElementById('date-approved');
  const addItemBtn = document.getElementById('add-item');
  const messageDiv = document.getElementById('message');

  // Auto-set today's date
  const today = new Date().toISOString().split('T')[0];
  dateRequestedInput.value = today;

  // Generate unique ID
  const uniqueId = 'REQ' + Math.floor(Math.random() * 1000000);
  sessionStorage.setItem('requisition-id', uniqueId);

  // Add more items to table
  addItemBtn.addEventListener('click', () => {
    const table = document.getElementById('items-table');
    const newRow = table.insertRow(table.rows.length);
    newRow.innerHTML = `
      <td><input type="text" placeholder="Item Name"></td>
      <td><input type="number" placeholder="Quantity"></td>
      <td><input type="text" placeholder="Serial No."></td>
      <td><input type="text" placeholder="Remarks"></td>
    `;
  });

  // Auto set approval date
  document.getElementById('approved-by').addEventListener('change', (e) => {
    if (e.target.checked) {
      dateApprovedInput.value = today;
    }
  });

  // Submit form
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (!document.getElementById('approved-by').checked) {
      messageDiv.textContent = 'Approval from GM for Admin is required.';
      messageDiv.style.color = 'red';
      return;
    }

    const data = collectFormData();

    try {
      const res = await fetch('/api/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (!res.ok) throw new Error("Failed to generate Excel");

      const downloadUrl = await res.text(); // backend sends "/download/<filename>"
      window.location.href = downloadUrl;   // trigger download

      messageDiv.textContent = 'Excel file generated and downloaded!';
      messageDiv.style.color = 'green';
      form.reset();

    } catch (err) {
      console.error(err);
      messageDiv.textContent = 'Submission failed.';
      messageDiv.style.color = 'red';
    }
  });

  // Collect all form data
  function collectFormData() {
    const rows = document.querySelectorAll('#items-table tr');
    let items = [];
    rows.forEach((row, idx) => {
      if (idx === 0) return; // skip header
      const inputs = row.querySelectorAll('input');
      if (inputs[0].value.trim() !== '') {
        items.push({
          item: inputs[0].value,
          quantity: inputs[1].value,
          serial: inputs[2].value,
          remarks: inputs[3].value
        });
      }
    });

    return {
      requisitionId: uniqueId,
      requisitioner: document.getElementById('requisitioner-name').value,
      department: document.getElementById('company-department').value,
      dateRequested: dateRequestedInput.value,
      dateApproved: dateApprovedInput.value,
      validityDate: document.getElementById('validity-date').value,
      approvals: {
        sectionHead: document.getElementById('section-head').checked,
        departmentGM: document.getElementById('department-gm').checked,
        verifiedBy: document.getElementById('verified-by').checked,
        approvedBy: document.getElementById('approved-by').checked,
        inspectedBy: document.getElementById('inspected-by').checked
      },
      items
    };
  }
});
