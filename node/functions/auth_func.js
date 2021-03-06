const user = require("../models/user");
const map = require("../models/map");
const hash = require("./hash").hash;
const chalk = require("chalk");

async function push(data) {
    try {
        const valid = await user.exists({ $and: [{ email: data.email }] });
        console.log(data);
        if (valid == null) {
            data.password = hash(data.password);
            const newUser = new user(data);
            const saveUser = await newUser.save();
            console.log(saveUser);
            return true;
        }
        return false;
    } catch (e) {
        console.log(e);
        console.log(
            chalk.bold.red("\n\tError !!! in auth function (push)\n"),
            chalk.bold.red.inverse("\tlocation: ./functions/auth_function.js\n")
        );

    }
    return null;
}

async function check(userMail, userPassword) {
    try {
        const valid = await user.exists({
            $and: [{ email: userMail }, { password: hash(userPassword) }],
        });
        if (valid == null) {
            return false;
        }
        return true;
    } catch (e) {
        console.log(e);
        console.log(
            chalk.bold.red("\n\tError !!! in auth function (check)\n"),
            chalk.bold.red.inverse("\tlocation: ./functions/auth_function.js\n")
        );
    }
    return null;
}

async function update(data) {
    try {
        data.password = hash(data.password);
        data.changedAt = new Date();
        const updateUsr = await user.updateOne({ email: data.email }, data);
        console.log(updateUsr);
        console.log(chalk.green.bold("\n\t User updated successfully"));
    } catch (e) {
        console.log(e);
        console.log(
            chalk.bold.red("\n\tError !!! in auth function (update)\n"),
            chalk.bold.red.inverse("\tlocation: ./functions/auth_function.js\n")
        );
    }
}

async function del(userMail, userPassword) {
    try {
        const valid = await user.deleteOne({
            $and: [{ email: userMail }, { password: hash(userPassword) }],
        });
        if (valid == null) {
            return false;
        }
        return true;
    } catch (e) {
        console.log(e);
        console.log(
            chalk.bold.red("\n\tError !!! in auth function (check)\n"),
            chalk.bold.red.inverse("\tlocation: ./functions/auth_function.js\n")
        );
    }
    return null;
}

async function getinfo(userMail, userPassword) {
    try {
        const val = await user.findOne({
            email: userMail,
            password: userPassword
        });
        console.log("user value :", val);
        return val
    } catch (e) {
        console.log(e);
        console.log(
            chalk.bold.red("\n\tError !!! in auth function (getinfo)\n"),
            chalk.bold.red.inverse("\tlocation: ./functions/auth_function.js\n")
        );
    }
    return false;
}

async function addloc(data) {
    try {
        console.log(data);
        const newloc = new map(data);
        const savloc = await newloc.save();
        console.log(savloc);
        return true;
    } catch (e) {
        console.log(e);
        console.log(
            chalk.bold.red("\n\tError !!! in auth function (addloc)\n"),
            chalk.bold.red.inverse("\tlocation: ./functions/auth_function.js\n")
        );

    }
    return null;
}

async function getloc(name) {

    try {
        const val = await map.findOne({
            name: name,
        });
        console.log("user value :", val.images);

        return val
    } catch (e) {
        console.log(e);
        console.log(
            chalk.bold.red("\n\tError !!! in auth function (getloc)\n"),
            chalk.bold.red.inverse("\tlocation: ./functions/auth_function.js\n")
        );
    }
    return false;
}

module.exports = { push, check, update, del, getinfo, addloc, getloc };