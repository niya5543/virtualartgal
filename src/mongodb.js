// mongodb.js
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/artgallery")
    .then(() => {
        console.log("mongodb connected");
    })
    .catch(() => {
        console.log("failed to connect");
    });

const RegistrationSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    confirmPassword: {
        type: String,
        required: true
    }
});

const LoginSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const Registration = mongoose.model("reg_custs", RegistrationSchema);
const Login = mongoose.model("login_custs", LoginSchema);

module.exports = { Registration, Login };
