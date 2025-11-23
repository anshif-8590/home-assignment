import express  from "express"
import  dotenv  from "dotenv"
import morgan from "morgan"
import { client, connectDB } from "./src/config/db.js"
import Route from "./src/routes"
dotenv.config()


connectDB()

const app = express()
app.use(express.json())
morgan(':method :url :status :res[content-length] - :response-time ms')

 
app.get("/test" ,( req , res ) => {
    return res.send("Success")
})

// app.get("/data" , async (req , res ) => {
//     const data = await client ` SELECT * FROM links`
//     console.log(data)
// })

app.listen( 3000 , () => 
    console.log("Server is started")
)