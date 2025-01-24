const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const app = express();
const bodyParser = require('body-parser');
const mysql = require('mysql');
const saltRounds = 10;

app.use(cors({
    origin: 'http://127.0.0.1:5501' // Allow requests from port 5501
}));
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'nutrimate'
});

db.connect(err => {
    if (err) {
        throw err;
    }
    console.log('MySQL connected...');
});

// Global variables to store user email
let globalEmail = null;



app.post('/signup', async (req, res) => {
    const { fname, lname, email, password, height, weight, birthdate, goal } = req.body;

    // Check if the email already exists in the database
    const checkEmailQuery = 'SELECT * FROM users WHERE email = ?';
    db.query(checkEmailQuery, [email], async (err, results) => {
        if (err) {
            console.error('Error checking email:', err); // Log error details
            return res.status(500).json({ success: false, message: 'Error checking email' });
        }

        if (results.length > 0) {
            // Email already exists in the database
            return res.status(400).json({ success: false, message: 'This email is already in use' });
        }

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Proceed to insert the new user
        const sql = 'INSERT INTO users (fname, lname, email, password, height, weight, birthdate, goal) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
        db.query(sql, [fname, lname, email, hashedPassword, height, weight, birthdate, goal], (err, result) => {
            if (err) {
                console.error('Error saving user data:', err); // Log error details
                return res.status(500).json({ success: false, message: 'Error saving user data' });
            }

            res.json({ success: true });
        });
    });
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;

    const emailQuery = 'SELECT * FROM users WHERE email = ?';
    db.query(emailQuery, [email], async (err, emailResults) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Internal server error. Please try again later.' });
        }

        if (emailResults.length === 0) {
            return res.status(400).json({ success: false, errorField: 'email', message: 'The email you entered does not exist in our records.' });
        }

        const user = emailResults[0];
        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            return res.status(400).json({ success: false, errorField: 'password', message: 'Incorrect password. Please try again.' });
        }

        // Save email to global variable
        globalEmail = email;
        res.json({ success: true, message: 'Login successful.' });
    });
});

app.post('/search', (req, res) => {
    const { ingredient } = req.body;
    const email = globalEmail;

    if (!email) {
        return res.status(400).json({ success: false, message: 'User is not logged in' });
    }

    // Get the user's goal from the users table
    const goalQuery = 'SELECT goal FROM users WHERE email = ?';
    db.query(goalQuery, [email], (err, goalResults) => {
        if (err) {
            console.error('Error fetching user goal:', err);
            return res.status(500).json({ success: false, message: 'Error fetching user goal' });
        }

        if (goalResults.length === 0) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        const userGoal = goalResults[0].goal;

        let tableName;

        // Determine the table to query based on the user's goal
        if (userGoal == 'maintaining') {
            tableName = 'maintain';
        } else if (userGoal == 'cutting') {
            tableName = 'cut';
        } else if (userGoal == 'bulking') {
            tableName = 'bulk';
        } else {
            return res.status(400).json({ success: false, message: 'Invalid user goal' });
        }


        // Query the appropriate table for recipes containing the specified ingredient
        const searchQuery = `
            SELECT RecipeName, Ingredients, Proteins, Carbs, Fat, TotalCalories, Instructions
            FROM ${tableName}
            WHERE Ingredients LIKE ?
        `;
        db.query(searchQuery, [`%${ingredient}%`], (err, results) => {
            if (err) {
                console.error('Error searching recipes:', err);
                return res.status(500).json({ success: false, message: 'Error searching recipes' });
            }

            res.json({ success: true, recipes: results });
        });
    });
});

app.get('/macros', (req, res) => {
    const email = globalEmail;  // You can also pass the email via query or request body if needed

    if (!email) {
        return res.status(400).json({ success: false, message: 'User is not logged in' });
    }

    // Query the database for the user's height, weight, birthdate, and goal
    const query = 'SELECT height, weight, birthdate, goal FROM users WHERE email = ?';

    db.query(query, [email], (err, results) => {
        if (err) {
            console.error('Error fetching user data:', err);
            return res.status(500).json({ success: false, message: 'Error fetching user data' });
        }

        if (results.length === 0) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        const { height, weight, birthdate, goal } = results[0];

        // Function to calculate age from birthdate
        function calculateAge(birthdate) {
            const today = new Date();
            const birthDate = new Date(birthdate);
            let age = today.getFullYear() - birthDate.getFullYear();
            const month = today.getMonth();
            if (month < birthDate.getMonth() || (month === birthDate.getMonth() && today.getDate() < birthDate.getDate())) {
                age--;
            }
            return age;
        }

        const age = calculateAge(birthdate);

        // Calculate macros based on height, weight, age, and goal
        let proteins, carbs, fats, totalCalories;

        if (goal === 'cutting') {
            proteins = (weight * 1.5).toFixed(2);  // Higher protein intake for cutting
            carbs = (weight * 2.0).toFixed(2);    // Lower carbs for cutting
            fats = (weight * 0.5).toFixed(2);     // Lower fats for cutting
            totalCalories = (weight * 10 + height * 6.25 - age * 5 - 500).toFixed(2); // Caloric deficit for cutting
        } else if (goal === 'bulking') {
            proteins = (weight * 1.2).toFixed(2);  // Moderate protein intake for bulking
            carbs = (weight * 3.0).toFixed(2);    // Higher carbs for bulking
            fats = (weight * 1.0).toFixed(2);     // Higher fats for bulking
            totalCalories = (weight * 10 + height * 6.25 - age * 5 + 500).toFixed(2); // Caloric surplus for bulking
        } else if (goal === 'maintaining') {
            proteins = (weight * 1.0).toFixed(2);  // Moderate protein intake for maintaining
            carbs = (weight * 2.5).toFixed(2);    // Moderate carbs for maintaining
            fats = (weight * 0.8).toFixed(2);     // Moderate fats for maintaining
            totalCalories = (weight * 10 + height * 6.25 - age * 5).toFixed(2); // Maintenance calories
        }
        globalCalories = totalCalories;
        globalProtein = proteins;
        globalCarbs = carbs;
        globalFats = fats;


        res.json({
            success: true,
            protein: proteins,
            carbs: carbs,
            fats: fats,
            totalCalories: totalCalories
        });
    });
});
app.post('/searchByRecipeName', (req, res) => {
    const { recipeName } = req.body;
    const email = globalEmail;

    if (!email) {
        return res.status(400).json({ success: false, message: 'User is not logged in' });
    }

    // Get the user's goal from the users table
    const goalQuery = 'SELECT goal FROM users WHERE email = ?';
    db.query(goalQuery, [email], (err, goalResults) => {
        if (err) {
            console.error('Error fetching user goal:', err);
            return res.status(500).json({ success: false, message: 'Error fetching user goal' });
        }

        if (goalResults.length === 0) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        const userGoal = goalResults[0].goal;
        let tableName;

        // Determine the table to query based on the user's goal
        if (userGoal == 'maintaining') {
            tableName = 'Ingredients';
        } else if (userGoal == 'cutting') {
            tableName = 'cut';
        } else if (userGoal == 'bulking') {
            tableName = 'bulk';
        } else {
            return res.status(400).json({ success: false, message: 'Invalid user goal' });
        }



        // Query the appropriate table for recipes containing the specified recipe name
        const searchQuery = `
            SELECT RecipeName, Ingredients, Proteins, Carbs, Fat, TotalCalories, Instructions
            FROM ${tableName}
            WHERE RecipeName LIKE ?
        `;
        db.query(searchQuery, [`%${recipeName}%`], (err, results) => {
            if (err) {
                console.error('Error searching recipes:', err);
                return res.status(500).json({ success: false, message: 'Error searching recipes' });
            }
            res.json({ success: true, recipes: results });
        });
    });
});
app.get('/high-protein-recipes', (req, res) => {
    const email = globalEmail;

    if (!email) {
        return res.status(400).json({ success: false, message: 'User is not logged in' });
    }

    const goalQuery = 'SELECT goal FROM users WHERE email = ?';
    db.query(goalQuery, [email], (err, goalResults) => {
        if (err) {
            console.error('Error fetching user goal:', err);
            return res.status(500).json({ success: false, message: 'Error fetching user goal' });
        }

        if (goalResults.length === 0) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        const userGoal = goalResults[0].goal;
        let tableName;

        if (userGoal === 'maintaining') {
            tableName = 'maintain';
        } else if (userGoal === 'cutting') {
            tableName = 'cut';
        } else if (userGoal === 'bulking') {
            tableName = 'bulk';
        } else {
            return res.status(400).json({ success: false, message: 'Invalid user goal' });
        }

        const searchQuery = `
            SELECT RecipeName, Ingredients, Proteins, Carbs, Fat, TotalCalories, Instructions
            FROM ${tableName}
            WHERE Proteins >= 25
        `;
        db.query(searchQuery, (err, results) => {
            if (err) {
                console.error('Error searching high-protein recipes:', err);
                return res.status(500).json({ success: false, message: 'Error searching high-protein recipes' });
            }


            res.json({ success: true, recipes: results });
        });
    });
});

app.get('/high-carb-recipes', (req, res) => {
    const email = globalEmail;

    if (!email) {
        return res.status(400).json({ success: false, message: 'User is not logged in' });
    }

    const goalQuery = 'SELECT goal FROM users WHERE email = ?';
    db.query(goalQuery, [email], (err, goalResults) => {
        if (err) {
            console.error('Error fetching user goal:', err);
            return res.status(500).json({ success: false, message: 'Error fetching user goal' });
        }

        if (goalResults.length === 0) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        const userGoal = goalResults[0].goal;
        let tableName;

        if (userGoal === 'maintaining') {
            tableName = 'maintain';
        } else if (userGoal === 'cutting') {
            tableName = 'cut';
        } else if (userGoal === 'bulking') {
            tableName = 'bulk';
        } else {
            return res.status(400).json({ success: false, message: 'Invalid user goal' });
        }

        const searchQuery = `
            SELECT RecipeName, Ingredients, Proteins, Carbs, Fat, TotalCalories, Instructions
            FROM ${tableName}
            WHERE Carbs >= 2
        `;
        db.query(searchQuery, (err, results) => {
            if (err) {
                console.error('Error searching high-protein recipes:', err);
                return res.status(500).json({ success: false, message: 'Error searching high-protein recipes' });
            }


            res.json({ success: true, recipes: results });
        });
    });
});


app.get('/high-fat-recipes', (req, res) => {
    const email = globalEmail;

    if (!email) {
        return res.status(400).json({ success: false, message: 'User is not logged in' });
    }

    const goalQuery = 'SELECT goal FROM users WHERE email = ?';
    db.query(goalQuery, [email], (err, goalResults) => {
        if (err) {
            console.error('Error fetching user goal:', err);
            return res.status(500).json({ success: false, message: 'Error fetching user goal' });
        }

        if (goalResults.length === 0) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        const userGoal = goalResults[0].goal;
        let tableName;

        if (userGoal === 'maintaining') {
            tableName = 'maintain';
        } else if (userGoal === 'cutting') {
            tableName = 'cut';
        } else if (userGoal === 'bulking') {
            tableName = 'bulk';
        } else {
            return res.status(400).json({ success: false, message: 'Invalid user goal' });
        }

        const searchQuery = `
            SELECT RecipeName, Ingredients, Proteins, Carbs, Fat, TotalCalories, Instructions
            FROM ${tableName}
            WHERE Fat >= 10
        `;
        db.query(searchQuery, (err, results) => {
            if (err) {
                console.error('Error searching high-protein recipes:', err);
                return res.status(500).json({ success: false, message: 'Error searching high-protein recipes' });
            }


            res.json({ success: true, recipes: results });
        });
    });
});

app.get('/profile', (req, res) => {
    const email = globalEmail; // Assuming globalEmail is set during login

    if (!email) {
        return res.status(400).json({ success: false, message: 'User is not logged in' });
    }

    // Query to fetch user data including goal and birthdate
    const userQuery = 'SELECT fname, lname, email, birthdate, height, weight, goal FROM users WHERE email = ?';
    db.query(userQuery, [email], (err, userResults) => {
        if (err) {
            console.error('Error fetching user data:', err);
            return res.status(500).json({ success: false, message: 'Error fetching user data' });
        }

        if (userResults.length === 0) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        const user = userResults[0]; // Assuming only one user with the email

        let birthdate = new Date(user.birthdate);
        birthdate.setDate(birthdate.getDate() + 1);
        birthdate = birthdate.toISOString().split('T')[0];

        // Send the user data including goal and age to the frontend
        res.json({
            success: true,
            name: `${user.fname} ${user.lname}`,
            email: user.email,
            birthdate: birthdate,
            height: user.height,
            weight: user.weight,
            goal: user.goal
        });
    });
});
app.put('/updateProfile', (req, res) => {

    const { fname, lname, email, height, weight, birthdate, goal } = req.body;

    if (!fname || !lname || !email || !height || !weight || !birthdate || !goal) {
        return res.status(400).json({ success: false, message: 'Missing required fields' });
    }
    // Query to update user data
    const userQuery = 'UPDATE users SET fname = ?, lname = ?, email = ?, height = ?, weight = ?, birthdate = ?, goal = ? WHERE email = ?';
    db.query(userQuery, [fname, lname, email, height, weight, birthdate, goal, email], (err, result) => {
        if (err) {
            console.error('Error updating user data:', err);
            return res.status(500).json({ success: false, message: 'Error updating user data' });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        res.json({ success: true, message: 'User updated successfully' });
    });
});
app.get('/suggested-recipes', (req, res) => {
    const email = globalEmail;

    if (!email) {
        return res.status(400).json({ success: false, message: 'User is not logged in' });
    }

    const goalQuery = 'SELECT goal FROM users WHERE email = ?';
    db.query(goalQuery, [email], (err, goalResults) => {
        if (err) {
            console.error('Error fetching user goal:', err);
            return res.status(500).json({ success: false, message: 'Error fetching user goal' });
        }

        if (goalResults.length === 0) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        const userGoal = goalResults[0].goal;
        let tableName;

        if (userGoal === 'maintaining') {
            tableName = 'maintain';
        } else if (userGoal === 'cutting') {
            tableName = 'cut';
        } else if (userGoal === 'bulking') {
            tableName = 'bulk';
        } else {
            return res.status(400).json({ success: false, message: 'Invalid user goal' });
        }

        const searchQuery = `
            SELECT RecipeName, Ingredients, Proteins, Carbs, Fat, TotalCalories, Instructions
            FROM ${tableName}
            LIMIT 5
        `;
        db.query(searchQuery, (err, results) => {
            if (err) {
                console.error('Error fetching suggested recipes:', err);
                return res.status(500).json({ success: false, message: 'Error fetching suggested recipes' });
            }

            res.json({ success: true, recipes: results });
        });
    });
});
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});