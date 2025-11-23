import express from "express"
const router = express.Router()



router.get("/test",( req , res ) => {
    res.json ({ msg : "Successs"})
})



router.post("/create", ( req , res ) => {
    
})


export default router