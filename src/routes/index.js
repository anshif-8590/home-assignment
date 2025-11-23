import express from "express"
import createShortLink from "./links/creaateShortLink.js"
import { customAlphabet } from "nanoid"
import { client } from "../config/db.js"
const router = express.Router()
const generateCode = customAlphabet("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789", 6);




router.get("/test", (req, res) => {
    res.json({ msg: "Successs" })
})




const CheckUrl = (url) => {
    try {
        new URL(url)
        return true
    } catch {
        return false

    }

}

router.post("/create", async (req, res) => {

    const { long_url, code } = req.body
    const urlStatus = CheckUrl(long_url)

    if (urlStatus) {
        let linkCode = code || generateCode()
        if (/^[A-Za-z0-9]{6,8}$/.test(linkCode)) {
            try {
                await client`
               INSERT INTO links ( code , long_url )
               VALUES ( ${linkCode} , ${long_url})`

                return res.status(201).json({ msg: "Success", code: linkCode, URL: long_url, clicks: 0 })
            } catch (error) {
                if (error.message.includes("duplicate key")) {
                    return res.status(409).json({ error: "Code already exists" });
                }
            }

        } else {
            return res.status(400).json({ error: "Invalid code" })
        }

    } else {
        return res.status(400).json({ error: "Invalid URL" });
    }


})


export default router