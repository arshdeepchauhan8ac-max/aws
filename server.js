const express = require("express")
const app = express()
const morgan = require("morgan")
const rateLimit = require("express-rate-limit")
const mongoose = require("mongoose")
const UserData = require("./models/UserData")
const joi = require("joi")
app.use(express.json())
// Rate limiter
const limiter = rateLimit({
	windowMs: 15 * 60 * 1000,
	limit: 100,
	standardHeaders: 'draft-8',
	legacyHeaders: false,
	ipv6Subnet: 56,
})

app.use(limiter)
app.use(morgan("dev"))

const DB = async () => {
	try {
		const conn = await mongoose.connect("mongodb+srv://arshdeepchauhan8ac_db_user:Arsh12345@cluster0.zu4ft7b.mongodb.net/mydatabase?appName=Cluster0")
		console.log("DB connected successfully:", conn.connection.host)
	} catch (error) {
		console.log(error)
		process.exit(1)
	}
}
DB()

app.post("/api/data", async (req, res) => {
	try {
		const { name, email, phone } = req.body
		const schema = joi.object({
			name: joi.string().required(),
			email: joi.string().email().required(),
			phone: joi.string().pattern(/^[6-9]\d{9}$/).required()
		})
		const { error } = schema.validate({ name, email, phone })

		if (error) {
			return res.status(400).json({ message: error.details[0].message })
		}

		const userData = new UserData({
			name,
			email,
			phone
		})
		await userData.save()
		res.status(201).json(userData)
	} catch (error) {
		console.log(error)
		res.status(500).json({ message: "Internal server error" })
	}
})
app.get("/api/userdata", async (req, res) => {
	try {
		const getdata = await UserData.find()
		res.status(200).json({ data: getdata })

	} catch (error) {
		console.log(error)
		res.status(500).json({ message: "Internal server error" })
	}
})
app.get("/api/userdata/:id", async (req, res) => {
	try {
		const id = req.params.id
		const filterdata = await UserData.findOne({ _id: id })
		res.status(200).json({ data: filterdata })
	} catch (error) {
		console.log(error)
		res.status(500).json({ message: "Internal server error" })
	}
})

app.get("/api", (req, res) => {
	res.send("server working")
})

app.listen(8000, () => {
	console.log("server running on port 8000")
})