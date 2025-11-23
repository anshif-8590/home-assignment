import express  from "express"
import  dotenv  from "dotenv"
import morgan from "morgan"
import cors from "cors"
import { client, connectDB } from "./src/config/db.js"
import Route from "./src/routes/index.js"
dotenv.config()



const app = express()
const Name = "Url-shortner"
const PORT = process.env.PORT || 3000
app.use(express.json())
app.use(cors())
app.use(morgan("dev"))

connectDB()


app.get ("/healthz", ( req , res ) => {
    res.status(200).json({ ok: true, version: "1.0" });
})

app.use('/',Route)


app.listen( PORT , () => 
    console.log(`Server started successfully at http://localhost:${PORT} - ${Name} backend service!`)
)
