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
    - Password: ("Leave this blank, unless you already have one set. In that case, you'd have to modify the credentials in serve.js")
    NOTE: You will need to match the credentials from the "server.js" file (around line:13 - 19). This are the default, but if ever you changed the
    configuration, feel free to match them via editing the "server.js" file.

2. Start your MySQL Server (In MySQL Workbench or XAMPP)
3. Import / Restore "database-setup.sql" and execute the entire query to create the necessary database
4. Go to VS Code and open the project
5. Open a new Terminal (Ctrl + `) and run the following: # SIDE NOTE: Apparently, Powershell blocks certain commands like "npm install", so use CMD instead as your terminal
    - npm install # just to make sure everything works
    - node server.js # to run the local server
    NOTE: to know if it is connected, it should output: 
        -> Server running on http://localhost:3000
        -> MySQL Connected!

6. Run the website either via "index.html" or the "Live Server" extension.
7. Enjoy our output!
