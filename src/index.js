const express = require('express');
const app = express();
const path = require("path");
const { Registration, Login } = require("./mongodb");

const templatePath = path.join(__dirname, '../templates');

app.use(express.json());
app.set("view engine", "hbs");
app.set("views", templatePath);
app.use(express.urlencoded({ extended: false }));

// Serve static files (CSS, images, etc.)
app.use(express.static(path.join(__dirname, 'public')));

// Route to render the index page
app.get("/", (req, res) => {
    res.render("index");
});

// Route to render the login page
app.get("/login", (req, res) => {
    res.render("login_cust");
});

// Route to handle login form submission
app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await Registration.findOne({ email, password });
        if (user) {
            res.render("index");
        } else {
            res.send("Wrong email or password");
        }
    } catch (error) {
        console.error("Error logging in:", error);
        res.send("An unexpected error occurred. Please try again later.");
    }
});

// Route to render the signup page
app.get("/signup", (req, res) => {
    console.log("GET SIGN UP"); 
    res.render("reg_cust");
});

// Route to handle signup form submission
app.post("/signup", async (req, res) => {
    const { email, password, confirmPassword } = req.body;
    if (password !== confirmPassword) {
        return res.render("reg_cust", { errorMessage: "Passwords do not match" });
    }
    try {
        await Registration.create({ email, password, confirmPassword });
        console.log("Data inserted successfully");
        res.render("login_cust"); // Render the login page after signup
    } catch (error) {
        console.error("Error inserting data into MongoDB:", error);
        // Handle the error appropriately
        res.render("reg_cust", { errorMessage: "An unexpected error occurred. Please try again later." });
    }
});

// Route to render the create exhibition page
app.get("/create_exhibition", (req, res) => {
    console.log("hi")
    res.render("create_exhibition"); // Assuming "create_exhibition.hbs" is in your templates directory
});

app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});
