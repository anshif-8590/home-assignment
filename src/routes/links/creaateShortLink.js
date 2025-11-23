import express from "express"
import { customAlphabet } from "nanoid"
const generateCode = customAlphabet("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789", 6);
const router = express.Router()




const CheckUrl = (url) => {
    // try {
    //     new URL(url)
    //     return true
    // } catch  {
    //     return false
        
    // }
    // if (new URL(url)){
    //     return true
    // }else{
    //     return false
    // }
}

const createShortLink =async ( req , res ) => {
    router.post("/create", async ( req , res ) => {
        console.log("hlo")
        console.log(req.body)
        const { long_url , code } = req.body
        res.json({ msg : true , data : long_url , data : code})

    })




}
export default createShortLink