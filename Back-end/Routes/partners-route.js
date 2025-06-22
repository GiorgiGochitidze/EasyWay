import express from 'express'
import { addPartner } from '../Controllers/partners-controller.js'
import { getAllpartners } from '../Controllers/partners-controller.js'
import { updatePartner } from '../Controllers/partners-controller.js'
import { deletePartner } from '../Controllers/partners-controller.js'

const addPartnerRouter = express.Router()

addPartnerRouter.post(
  '/add',
  addPartner
)

// get
const getPartnersRouter = express.Router()
getPartnersRouter.post(
    '/showAll', 
    getAllpartners)

// upt
const updatePartnerRouter = express.Router()
updatePartnerRouter.put('/update/:id',
    updatePartner
)

// del
const deletePartnerRouter = express.Router()
deletePartnerRouter.delete(
    '/delete/:id',
    deletePartner
)

export { addPartnerRouter,
        getPartnersRouter,
        updatePartnerRouter,
        deletePartnerRouter }
