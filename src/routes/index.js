import express from "express"
import { customAlphabet } from "nanoid"
import { client } from "../config/db.js"
const router = express.Router()
const generateCode = customAlphabet("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789", 6);




const CheckUrl = (url) => {
    try {
        new URL(url)
        return true
    } catch {
        return false

    }

}

router.post("/api/links", async (req, res) => {

    const { long_url, code } = req.body
    const urlStatus = CheckUrl(long_url)

    if (urlStatus) {
        let linkCode = code || generateCode()
        if (/^[A-Za-z0-9]{6,8}$/.test(linkCode)) {
            try {
                await client`
               INSERT INTO links ( code , long_url )
               VALUES ( ${linkCode} , ${long_url})`

                return res.status(201).json({  code: linkCode , long_url, clicks: 0 , last_clicked: null, })
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

router.get("/api/links",async ( req ,res ) => {
    const data = await client ` SELECT * FROM links ORDER BY created_at DESC`
   return res.status(200).json ({   data })
})

router.get ("/api/links/:code" , async ( req , res ) => {
    const { code } = req.params
    const data  = await client ` SELECT * FROM links WHERE code = ${ code }`

    if ( data.length === 0 ) {
        return res.status(404).json ({ msg : "Code not found " })
    }else{
        return res.status(200).json ({  data })
    }
})

router.delete ("/api/links/:code" , async ( req , res ) => {
    const { code } = req.params
    const data = await client ` DELETE  FROM links WHERE code = ${ code }`
    if (data.length === 0){
        return res.status(404).json({ error: "Code not found" });
    }else{

        return res.status(200).json ({ msg : " Code deleted "})
    }
})

router.get ("/:code" , async ( req , res ) => {
    const { code } = req.params
    const data = await client  ` SELECT * FROM links WHERE code = ${ code }`
    if ( data.length === 0 ){
        return res.status(404).json ({ msg : "Code not found " })
    }else{
        const linkData = data[0]
        const updatedData = await client 
        ` 
        UPDATE links 
        SET clicks = clicks +1 , last_clicked = NOW()
        WHERE code = ${ code } `

        return res.redirect(302 , linkData.long_url)
    }
})


export default router