const express = require("express");
const router = express.Router();
const func = require("../../functions/auth_func");
const chalk = require("chalk");
const cookieParser = require("cookie-parser");
const token = require("../../functions/token");
require("dotenv").config();

router
    .use((req, res, callback) => {
        console.log(chalk.bold.yellow(`\n${req.url}@ ${new Date()}\n`));
        callback();
    })
    .use(express.json())
    .use(express.urlencoded({ extended: true }))

router
    .route("/")
    .get((req, res) => {
        console.log(chalk.yellow.bold.inverse("\n    map get request    \n"));
        res.send("login page");
    })
    .post((req, res) => {
        console.log(chalk.yellow.bold.inverse("\n    map post request    \n"));
        console.log(chalk.green("request api : "), req.body);
        func.getloc(req.body.name).then(
            (value) => {
                if (value == true) {
                    console.log(chalk.bold.green("\n\t location fetched successfully\n"));
                    res.send("got successfully" + val);
                } else if (value == false) {
                    console.log(chalk.bold.red("\n\t user user already exists\n"));
                    res.send("user already exists ");
                } else if (value == null) {
                    res.send("Error occurred in connection, with db");
                }
            },
            (e) => {
                console.log(e);
                console.log(chalk.red.bold("\n\tError occurred in registration\n"), chalk.red.inverse.bold("\tlocation: ./router/register.js\n"));
            }
        );

    });

module.exports = router;