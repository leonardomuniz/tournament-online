import cors from 'cors'
import express, { urlencoded } from 'express'
import 'reflect-metadata'
import { AppDataSource } from './4-framework/database/data-source'
import { routers } from './4-framework/function/collection'

const port = process.env.PORT || 3030
const app = express()

app.use(cors())

app.use(urlencoded({ extended: true }))
app.use(express.json())

app.use(routers)

AppDataSource.initialize().then(async () => {
	app.listen(port, () => {
		console.log(`Server is listening at port ${port}`)
	})
})
