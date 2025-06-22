import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import mongoose from 'mongoose'


import { registerRouter } from './Routes/auth-route.js'
import { loginRouter } from './Routes/auth-route.js'

import { createDiscountRouter } from './Routes/discount-route.js'
import { getDiscountRouter } from './Routes/discount-route.js'
import { updateDiscountRouter } from './Routes/discount-route.js'
import { deleteDiscountRouter } from './Routes/discount-route.js'

import { addPartnerRouter }  from './Routes/partners-route.js'
import { getPartnersRouter } from './Routes/partners-route.js'
import { updatePartnerRouter } from './Routes/partners-route.js'
import { deletePartnerRouter } from './Routes/partners-route.js'

dotenv.config()


const app = express()
const PORT = process.env.PORT || 3000

const corsOptions = {
    origin: "*", 
    credentials: true, 
} 

app.use(cors(corsOptions))
app.use(express.json())
app.use(cookieParser())

const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.muavqao.mongodb.net/`

app.use('/register', registerRouter)
app.use('/login', loginRouter)

app.use('/createDiscount', createDiscountRouter)
app.use('/showDiscounts', getDiscountRouter)
app.use('/uptDiscount', updateDiscountRouter)
app.use('/delDiscount', deleteDiscountRouter)

app.use('/addPartner', addPartnerRouter)
app.use('/showPartners', getPartnersRouter)
app.use('/uptPartner', updatePartnerRouter)
app.use('/delPartner', deletePartnerRouter)



mongoose
    .connect(url)
    .then(() => console.log("MongoDB connected"))
    .catch((error) => {
        console.log("Error", error.message)
        process.exit(1)
    })

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

