import { connection } from "../sql_connection.js";
import * as bcrypt from 'bcrypt'
import { response } from "express";
import jwt from 'jsonwebtoken'

async function checkUsernameAndEmail(username, email) {
    try {
        let res
        try {
            let [results, fields] = await connection.promise().query(`select (username = ?) as username, (email = ?) as email from user where username = ? OR email = ?;`, [username, email, username, email])
            res = results[0]
        }
        catch (error) { console.log(error) }
        if (res)
            return [res.username, res.email]
        return true
    }
    catch (err) {
        console.log(err)
        return [-1]
    }
}
async function getUserByLogin(text) {
    try {
        let userByName = (await connection.promise().query(`select * from user where username = ?`, [text, text]))[0][0]
        if (userByName) return userByName
        let userByMail = (await connection.promise().query(`select * from user where email = ?`, [text, text]))[0][0]
        if (userByMail) return userByMail
    } catch (error) {
        throw error
    }
}

export const passToken = async (req, res, next) => {
    try {
        const token = await req.headers.authorization?.split(" ")[1]
        const decodedToken = await jwt.verify(token, "RANDOM-TOKEN")
        req.user = await decodedToken;
    }
    catch (err) { }
    finally {
        next()
    }
}

export const register = async (req, res) => {
    const { email, username, password } = req.body;
    if (!username || !password) return res.status(400).json({ message: 'Provide username email and password' })

    //Check and response with error for username, email, password section
    const uniq = await checkUsernameAndEmail(username, email)
    if (uniq !== true) {
        if (uniq[0] === -1) return res.status(500).json({ message: 'Something gone wrong with db' })

        if (uniq[0] && uniq[1]) return res.status(400).json({ message: "Username and Email are already taken" })
        if (uniq[0]) return res.status(400).json({ message: "Username is already taken" })
        if (uniq[1]) return res.status(400).json({ message: "Email is already taken" })
    }
    //Create hash section
    bcrypt.hash(password, 10)
        .then((hashedPassword) => {
            let user = { email: email, password: hashedPassword, username: username }
            connection.query(`insert into user set ?`, user, function (error, results, fields) {
                if (error) {
                    return res.status(500).json({ message: "Cannot create user", error: error })
                }
                res.status(200).json({ message: "User created successfuly" })
            })
        })
        .catch((error) => {
            res.status(500).json({ message: "Password was not hashed successfully", error: error })
        })

}

export const login = async (req, res) => {
    const { login, password } = req.body
    try {
        let user = await getUserByLogin(login)
        let compartion = await new Promise(function (resolve, reject) {
            bcrypt.compare(password, user.password, function (err, res) {
                if (err) reject(err)
                else resolve(res)
            })
        })
        if (!compartion) {
            return res.status(400).json({ message: "Password doesn't match" })
        }
        let token = jwt.sign(
            {
                email: user.email,
                id: user.user_id,
                username: user.username
            },
            "RANDOM-TOKEN",
            { expiresIn: "7d" }
        )

        res.status(200).send({ message: "Login successful", email: user.email, username: user.username, token })
    } catch (error) {
        console.log(error)
        res.status(400).json({ message: "Password doesn't match", error })
    }
}