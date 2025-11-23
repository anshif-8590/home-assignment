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
morgan(':method :url :status :res[content-length] - :response-time ms')

 connectDB()




app.use('/api/',Route)


app.listen( PORT , () => 
    console.log(`Server started successfully at http://localhost:${PORT} - ${Name} backend service!`)
)
