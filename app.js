document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('requisition-form');
    const dateRequestedInput = document.getElementById('date-requested');
    const dateApprovedInput = document.getElementById('date-approved');
    const addItemBtn = document.getElementById('add-item');
    const submitBtn = document.getElementById('submit-btn');
    const messageDiv = document.getElementById('message');

    // Set today's date automatically
    const today = new Date().toISOString().split('T')[0];
    dateRequestedInput.value = today;

    // Generate Unique ID for this session
    const uniqueId = 'REQ' + Math.floor(Math.random() * 1000000);

    // Session Management: Save the requisition data in sessionStorage
    sessionStorage.setItem('requisition-id', uniqueId);

    // Add New Item Row to the table
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

    // Automatically set Date Approved when GM approves
    document.getElementById('approved-by').addEventListener('change', (e) => {
        if (e.target.checked) {
            dateApprovedInput.value = today;
        }
    });

    // Handle Form Submission
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Check if GM has approved
        if (!document.getElementById('approved-by').checked) {
            messageDiv.textContent = 'Approval from GM for Admin is required.';
            messageDiv.style.color = 'red';
            return;
        }

        // Simulate sending email on approval
        sendApprovalEmail();

        // Show success message
        messageDiv.textContent = 'Requisition Submitted Successfully!';
        messageDiv.style.color = 'green';

        // Clear form
        form.reset();
    });

    // Simulate Email Sending with EmailJS (needs a real service in production)
    function sendApprovalEmail() {
        // Use an email service like EmailJS or an SMTP server to send the email
        const emailContent = {
            requisitionId: uniqueId,
            approvedBy: 'GM for Admin',
            approvalDate: dateApprovedInput.value,
        };

        console.log('Sending email with approval details...', emailContent);
        // Call EmailJS or another email service API here
    }
});
