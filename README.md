# 📋 Bring Out Permit Form

A simple **web-based form** for managing "Bring Out Permits" within a company.
This app allows requisitioners to list items, set validity dates, and track approvals from different authorities.

---

## ✨ Features

* **Requester Information**: Capture requisitioner name, department, and dates.
* **Auto-Date Handling**: Requested and Approved dates are pre-filled and disabled for editing.
* **Itemized Table**: Add multiple items with quantity, serial number (optional), and remarks.
* **Approval Workflow**: Checkboxes for Section Head, Department GM, GS Section, Admin GM, and optional Guard.
* **Dynamic Add Item**: Add more rows to the table with a single click.
* **Form Validation**: Ensures required fields are filled before submission.
* **Confirmation Message**: Displays submission status.

---

## 📂 Project Structure

```
bring-out-permit/
├── index.html   # Main form
├── style.css    # Styling
├── app.js       # Form logic (dynamic items, validation, submission)
```

---

## 🛠 Requirements

* Any modern browser (Chrome, Edge, Firefox, Safari).
* No backend or server needed — runs purely on the frontend.

---

## ▶️ Usage

1. Open `index.html` in your browser.
2. Fill out the requisitioner’s name, department, and validity date.
3. Add items to the table (click **Add Item** for more rows).
4. Tick the checkboxes as approvals are granted.
5. Click **Submit** to finalize.
6. A message will appear confirming the submission.

---

## 🎨 Design

* Minimalist layout with labels and inputs clearly aligned.
* Responsive form container for desktop and tablet.
* Easy-to-read table for item listings.

---

## 📸 Example Workflow

1. Employee enters name and department.
2. Lists items (e.g., Laptop, Tools, Equipment).
3. Section Head and GM approve via checkboxes.
4. GS Section verifies, Admin GM approves, Guard optionally inspects.
5. Submission completes the permit record.

---

## 📜 License

MIT License — free for personal and organizational use.
