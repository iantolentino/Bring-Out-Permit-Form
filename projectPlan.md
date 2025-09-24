📝 Project Plan: Employee Approval Selection System
1. Goal
Create a web-based system using index.html (main page) and admin.html (admin page) that:

Connects to a database (via phpMyAdmin/MySQL).
Displays a searchable, modern-designed list of users (with department info).
after opening the website it should store a session number starting with 0001-0924 that last 4 digits is the month and day today so if the usr created in other day it should 0001-0925 and so on in other days
it should have a button befor going to the main home screen that the button is Create Bring out Permit approval form"
Allows selecting up to 4 users.
Generates an Excel file formatted as an approval form with those 4 users.
Provides an admin page to add new users.
2. Database Setup (in phpMyAdmin)
Step 1: Create a Database

Log in to phpMyAdmin.
Click New on the left panel.
Enter a database name (e.g., employee_db).
Click Create.
Step 2: Create a Table for Users

Select the database employee_db.

Click Create table, name it users.

Define columns:

id → INT, Primary Key, Auto Increment.
fname → VARCHAR(100).
lname → VARCHAR(100).
email → VARCHAR(150).
department → VARCHAR(100).
dept_value → INT (for mapping/ordering if needed).
Step 3: Insert Sample Data

Use Insert in phpMyAdmin or run SQL like:
INSERT INTO users (fname, lname, email, department, dept_value)
VALUES ('Juan', 'Delacruz', 'juan@email.com', 'GS Section', 1);
3. Frontend (index.html) – Main Features
Modern Design: Use HTML + CSS (dark mode or clean layout).

4 Columns Layout:

Column 1: Section Head
Column 2: Department GM
Column 3: GS Section
Column 4: GM for Admin
Search Functionality:

Input field filters names in lowercase.
If user types juan or cruz, it finds “Juan Delacruz”.
Popup on Selection:

Clicking a user shows details (with email + copy button).
Selection Limit:

Required: User can only select up to 4 users.
Selected users are displayed in a list below.
Excel Download Button:

After 4 users are selected, a button appears.
Generates Excel with the following format:
Bring out permit form
This file contains the proof of approval of the superiors below
Date: [current date]

[email] | [position] | [yes/no approval] | [approver name]
4. Admin Panel (admin.html)
Form to Add New Users:

Fields: First Name, Last Name, Email, Department, Department Value.
Submit button → Inserts into database.
5. Workflow Recap
Admin.html: Add users to database.

Index.html:

Displays users in 4 columns.
Search and filter names.
Select up to 4 users.
Show list of selected users.
Generate Excel file with formatted approval sheet.
