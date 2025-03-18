import "dotenv/config"
import express from "express"
import nunjucks from "nunjucks"
import morgan from "morgan"
import logger from "morgan"
import bcrypt from "bcrypt"
import session from "express-session"
import indexRouter from "./routes/index.js"
import loginRouter from "./routes/login.js"



const app = express()
const port = 3000

nunjucks.configure("views", {
  autoescape: true,
  express: app,
})

app.use(logger("dev"))
app.use("/", indexRouter)
app.use("/", loginRouter)


app.use(session({
  secret: "keyboard cat",
  resave: false,
  saveUninitialized: true,
  cookie: { sameSite: true }
}))

app.use(express.static("public"))



let myPlaintextPassword = "detlösenordsomduvillha"
bcrypt.hash(myPlaintextPassword, 10, function(err, hash) {
	// här får vi nu tag i lösenordets hash i variabeln hash
	console.log(hash)
})




app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})