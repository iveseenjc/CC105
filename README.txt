# CC105 Task Manager App
This is a simple task manager app built with HTML, CSS, JavaScript, Node.js, and MySQL.

## Requirements
- Node.js (https://nodejs.org/en/download)
- MySQL (e.g., via XAMPP or MySQL Workbench)
- VS Code (Recommended)
- SQLTools and SQLTools MySQL/MariaDB/TiDB extensions (for VS Code)
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
## MySQL Workbench
1. Follow these credentials when establishing your connection
    - Connection Name: (Will vary / Whatever you want)
    - Connection Method: Standard (TCP / IP)
    - Hostname: localhost
    - Port: 3306
    - Username: root
    - Password: ("Leave this blank, unless you already have one set. In that case, you'd have to modify the credentials in serve.js")
    NOTE: You will need to match the credentials from the "server.js" file (around line:13 - 19). This are the default, but if ever you changed the
    configuration, feel free to match them via editing the "server.js" file.

2. Start your MySQL Server (In MySQL Workbench or XAMPP)
3. Import / Restore "database-setup.sql" and execute the entire query to create the necessary database

## VS Code
4. Go to VS Code and open the project
5. Install SQLTools and MySQL/MariaDB/TiDB from the extensions tab.
6. On the left-hand bar, press the new cylinder bar (SQL Tools Tab) and add a new connection.
7. Choose MySQL for the database driver.
8. In this part, the connections HAVE TO MATCH ON ALL sides (Workbench, SQLTools, server.js), so follow your credentials if you changed them.
    - Connection Name: (Will vary / Whatever you want, doesn't really matter)
    - Connection Group: (Can be left blank)
    - Connect Using: Server and Port
    - Server Address: localhost
    - Database: db_group5_cc105
    - Port: 3306
    - Username: root
    - Password Mode: SQLTools Driver Credentials / Use Empty Password / Save as plaintext in settings 
        L (The choice is yours, the password is the same. If it's not blank, don't use Empty password)
    - (For Password Mode Driver Credentials or Save as Plaintext in settings) 
        L Password: ("Leave this blank, unless you already have one set. In that case, you'd have to modify the credentials in serve.js")

9. Click on "Test Connection". If it is successful, then Click "Save Connection", otherwise double-check your credentials
10. Open a new Terminal (Ctrl + `) and run the following: 
    # SIDE NOTE: Apparently, Powershell blocks certain commands like "npm install", so use CMD instead as your terminal
    - npm install        # just to make sure everything works
    - node server.js     # to run the local server
    NOTE: to know if it is connected, it should output:
        -> Server running on http://localhost:3000
        -> MySQL Connected!

11. Run the website either via "index.html" or the "Live Server" extension.
12. Enjoy our output!
