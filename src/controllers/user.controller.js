const userMethods = {};
require("dotenv").config();
const User = require("../models/user.model");
const Rol = require("../models/rol.model");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs')


async function getUser(param) {
    try {
        return User.findOne(param);
    } catch (error) {
        return false;
    }
}

userMethods.login = async (req, res) => {
   const user = await User.findOne({
		email: req.body.email,
	})

	if (!user) {
		return { status: 'error', error: 'Invalid login' }
	}

	const isPasswordValid = await bcrypt.compare(
		req.body.password,
		user.password
	)

	if (isPasswordValid) {
		const token = jwt.sign(
			{
				name: user.name,
				email: user.email,
			},
			'secret123'
		)

        const username = user.username;

		return res.json({ status: 'ok', user: token, username: username })
	} else {
		return res.json({ status: 'error', user: false })
	}
};

userMethods.register = async (req, res) => {
    const { username, email, password } = req.body;
    if (username && email && password) {
        try {
                const verifyUsername = await getUser({ username });
                if (verifyUsername) {
                    return res.status(400).json({
                        status: false,
                        message: "The username has already taken",
                    });
                }
                const verifyEmail = await getUser({ email });
                if (verifyEmail) {
                    return res.status(400).json({
                        status: false,
                        message: "The email has already taken",
                    });
                }

                const user = new User({
                    username,
                    email,
                    password,
                });
                user.password = await user.encryptPassword(user.password);

                if (await user.save()) {
                    return res.status(200).json({
                        status: true,
                        message: "User created successfull.",
                    });
                } else {
                    return res.status(400).json({
                        status: false,
                        message: "There was a problem, please try again.",
                    });
                }
        } catch (error) {
            return res.status(400).json({
                status: false,
                message: "There was an error, please try again",
            });
        }
    } else {
        return res.status(400).json({
            status: false,
            message: "Fill all requered fields",
        });
    }
};

userMethods.authenticate = (req, res) => {
    try {
        const token = req.headers['x-access-token'];
        if (token) {
            if (token) {
                return res.status(200).json({
                    status: true,
                    message: "The token is correct.",
                });
            } else {
                return res.status(400).json({
                    status: false,
                    message: "The token is incorrect.",
                });
            }
        } else {
            return res.status(400).json({
                status: false,
                message: "The token is required.",
            });
        }
    } catch (error) {
        return res.status(400).json({
            status: false,
            message: "The token is invalid.",
        });
    }
};

module.exports = userMethods;
