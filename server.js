const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// MySQL Connection
const db = mysql.createPool({
	host: "localhost",
	user: "root",
	password: "",
	port: 3306,
	multipleStatements: true
});

// Auto-create database and table if they don't exist
const setupSQL = `
	CREATE DATABASE IF NOT EXISTS db_group5_cc105;
	USE db_group5_cc105;
	CREATE TABLE IF NOT EXISTS tasks (
		id INT AUTO_INCREMENT PRIMARY KEY,
		task_title VARCHAR(255) NOT NULL,
		task_due DATETIME,
		task_priority VARCHAR(50) DEFAULT 'Medium',
		created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
	);
`;

db.query(setupSQL, (err, results) => {
	if (err) {
		console.error("Setup failed:", err);
		return;
	}
	console.log("MySQL Connected!");
});

// Routes
app.post("/api/tasks", (req, res) => {
	const { task_title, task_due, task_priority } = req.body;
	const sql = "INSERT INTO tasks (task_title, task_due, task_priority) VALUES (?, ?, ?)";

	db.query(sql, [task_title, task_due, task_priority], (err, result) => {
		if (err) {
			console.error("Insert error:", err);
			return res.status(500).json({ error: "Failed to add task" });
		}

		res.status(201)
			.json({ id: result.insertId, task_title, task_due, task_priority });
	});
});

app.get("/api/tasks", (req, res) => {
	const sql = "SELECT * FROM tasks ORDER BY created_at DESC";

	db.query(sql , (err, results) => {
		if (err) {
			return res.status(500).json({ error: "Database error" });
		}

		res.json(results);
	});
});

// Update a task
app.put("/api/tasks/:id", (req, res) => {
	const { id } = req.params;
	const { task_title, task_due, task_priority } = req.body;

	const sql =
		"UPDATE tasks SET task_title = ?, task_due = ?, task_priority = ? WHERE id = ?";

	db.query(sql, [task_title, task_due, task_priority, id], (err, result) => {
		if (err) return res.status(500).json({ error: "Failed to update task" });
		res.json({ message: "Task updated" });
	});
});

// DELETE all tasks
app.delete('/api/tasks', (req, res) => {
	db.query('DELETE FROM tasks', (err, result) => {
		if (err) 
			return res.status(500).json({ error: 'Failed to delete all tasks' });
		
		res.json({ message: `Deleted ${result.affectedRows} tasks` });
	});
});  

// Delete a task
app.delete("/api/tasks/:id", (req, res) => {
	const { id } = req.params;
	const sql = "DELETE FROM tasks WHERE id = ?";

	db.query(sql, [id], (err, result) => {
		if (err) 
			return res.status(500).json({ error: "Failed to delete task" });

		res.json({ message: "Task deleted" });
	});
});

// Start server
app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`);
});
