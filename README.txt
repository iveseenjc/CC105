# CC105 Task Manager App

This is a simple task manager app built with HTML, CSS, JavaScript, Node.js, and MySQL.

## Requirements
- Node.js (https://nodejs.org/en/download)
- MySQL (e.g., via XAMPP or MySQL Workbench)
- A code editor (VS Code recommended)
- Optional: Live Server extension in VS Code

---

## IF YOU HAVEN'T ALREADY, INSTALL node.js
1. Go to your preffered terminal (e.g. Powershell, CMD,  VS Code Terminal)
2. Run the following in order (WITHOUT THE DASH "-"):
    - winget install Schniz.fnm
    - fnm install 22
    - node -v
    - npm -v
    NOTE: if any of the following commands fails, try to restart your terminal or your computer

## Setup Instructions
1. Follow these credentials when establishing your connection
    - Connection Method: Standard (TCP / IP)
    - Hostname: localhost
    - Port: 3306
    - Username: root
    - Password: "" (No password / empty)

2. Start your MySQL Server (In MySQL Workbench or XAMPP)
3. Import / Restore "database-setup.sql" and execute the entire query to create the necessary database
4. Go to VS Code and open the project
5. Open a new Terminal (Ctrl + `) and run the following:
    - node server.js
    NOTE: to know if it is connected, it should output: 
        -> Server running on http://localhost:3000
        -> MySQL Connected!

6. Run the website either via "index.html" or the "Live Server" extension.
7. Enjoy our output!