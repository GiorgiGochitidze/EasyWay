import express from 'express'

import { registerUser } from '../Controllers/auth-controller.js'
import { loginUser } from '../Controllers/auth-controller.js'


const registerRouter = express.Router()

registerRouter.post(
    '/',
     registerUser)

const loginRouter = express.Router()

loginRouter.post(
    '/',
     loginUser)

export { registerRouter, 
         loginRouter }     