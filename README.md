
# CC105 Task Manager App

This is a simple task manager web application built with HTML, CSS, JavaScript, Node.js, and MySQL.

---

## ✅ Requirements

- [Node.js](https://nodejs.org/en/download)
- MySQL (e.g., via **XAMPP** or **MySQL Workbench**)
- Visual Studio Code (VS Code) — *recommended*
- SQLTools + SQLTools MySQL/MariaDB/TiDB extension (VS Code)
- (Optional) Live Server extension in VS Code

---

## ⚙️ Node.js Installation

If you don't have Node.js installed:

1. Open a terminal (PowerShell, CMD, or VS Code Terminal)
2. Run the following commands one at a time (without the dashes `-`):
   ```bash
   winget install Schniz.fnm
   fnm install 22
   node -v
   npm -v
   ```
3. If any of these commands fail, try restarting your terminal or your computer.

---

## 🛠️ MySQL Setup (Workbench or XAMPP)

1. Use the following credentials when creating a new MySQL connection:
   - **Connection Name**: (Any name, e.g., `task-manager`)
   - **Connection Method**: Standard (TCP/IP)
   - **Host**: `localhost`
   - **Port**: `3306`
   - **Username**: `root`
   - **Password**: *(Leave blank unless you’ve set one)*

   > ⚠️ Make sure these credentials match those in your `server.js` file (lines ~13–19):
   ```js
   const db = mysql.createPool({
   	host: "localhost",
   	user: "root",
   	password: "", // Or your password
   	database: "db_group5_cc105",
   	port: 3306,
   	multipleStatements: true
   });
   ```

2. Start your MySQL Server using Workbench or XAMPP.

---

## 💻 Project Setup (VS Code)

1. Open the project folder in VS Code.

2. Open a new terminal ``(Ctrl + `)`` and run:

   ```bash
   npm install         # Install dependencies
   npm install mysql2  # Install MySQL client
   node server.js      # Start the server
   ```

   You should see output like:
   ```
   Server running on http://localhost:3000
   MySQL Connected!
   ```

3. Run the frontend by:
   - Opening `index.html` directly in your browser, or
   - Using the **Live Server** extension in VS Code

---

## ✅ Optional: VS Code SQLTools Setup

If you want to manage the database inside VS Code:

1. Install **SQLTools** and **SQLTools MySQL/MariaDB/TiDB** from the Extensions tab.
2. Open the SQLTools tab (cylinder icon) and add a new connection.
3. Match the following settings:
   - **Driver**: MySQL
   - **Server Address**: `localhost`
   - **Database**: `db_group5_cc105`
   - **Port**: `3306`
   - **Username**: `root`
   - **Password**: *(Leave blank unless set)*

4. Test the connection → Save it if successful.

---

## 🎉 You're All Set!

The local server is running and the database is connected. You can now use the task manager app locally!
