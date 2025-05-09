-- Create the database if it doesn't exist
CREATE DATABASE IF NOT EXISTS db_group5_cc105;

-- Use the todo_app database
USE db_group5_cc105;

-- Create the tasks table if it doesn't exist
CREATE TABLE IF NOT EXISTS tasks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    task_title VARCHAR(255) NOT NULL,
    task_due DATETIME,
    task_priority VARCHAR(50) DEFAULT 'Medium',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);