// Import the db connection
import db from './connection.js';

// Check if '--delete' was passed as a command-line argument
const deleteMode = process.argv.includes('--delete');
console.log(process.argv);

async function setupDatabase() {
    try {
        // Delete tables if in delete mode
        if (deleteMode) {
            console.log("Deleting tables...");
            await db.exec(`DROP TABLE IF EXISTS Users`);
        }

        // Create Users table
        console.log("Creating tables...");
        await db.exec(`
            CREATE TABLE IF NOT EXISTS Users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                email TEXT NOT NULL UNIQUE,
                password TEXT NOT NULL
            );
        `);

        // Populate the table with sample data if in delete mode
        if (deleteMode) {
            console.log("Inserting sample data...");
            await db.run(`INSERT INTO Users (name, email, password) VALUES ('John Doe', 'john@example.com', '$2b$14$1pNSNCJTq3K6hx.MUhkQtOs1tTmc6SBfHV/.dcUkJ/rh//1QB7GxO')`);
            await db.run(`INSERT INTO Users (name, email, password) VALUES ('Jane Smith', 'jane@example.com', '$2b$14$1pNSNCJTq3K6hx.MUhkQtOs1tTmc6SBfHV/.dcUkJ/rh//1QB7GxO')`);
            await db.run(`INSERT INTO Users (name, email, password) VALUES ('Alice Johnson', 'alice@example.com', '$2b$14$1pNSNCJTq3K6hx.MUhkQtOs1tTmc6SBfHV/.dcUkJ/rh//1QB7GxO')`);
        }

        console.log("Database setup completed successfully.");
    } catch (error) {
        console.log('An error occurred while running setupDatabase.js:', error);
    }
}

setupDatabase();
