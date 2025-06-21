import express from 'express'
import { body, param } from 'express-validator'
import { addPartner } from '../Controllers/partners-controller.js'
import { getAllpartners } from '../Controllers/partners-controller.js'
import { updatePartner } from '../Controllers/partners-controller.js'
import { deletePartner } from '../Controllers/partners-controller.js'

const addPartnerRouter = express.Router()

addPartnerRouter.post(
  '/add',
  [
    body('name')
      .notEmpty()
      .withMessage('Name is required'),
    body('contactEmail')
      .notEmpty()
      .withMessage('Contact email is required'),
    body('photos')
      .notEmpty()
      .withMessage('Photos is required'),
    body('telephoneNumber')
      .notEmpty()
      .withMessage('Number is required'),    
    body('address').custom(value => {
      if (
        !value ||
        typeof value !== 'object' ||
        !value.street?.trim() ||
        !value.city?.trim() ||
        !value.state?.trim() ||
        !value.postalCode?.trim()
      ) {
        throw new Error('All address fields are required and cannot be empty')
      }
      return true
    })
  ],
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
    [
        param('id').isMongoId().withMessage('Partner id is required')
    ],
    updatePartner
)

// del
const deletePartnerRouter = express.Router()
deletePartnerRouter.delete(
    '/delete/:id',
    [
        param('id').isMongoId().withMessage('Invalid partner ID'),
    ],
    deletePartner
)

export { addPartnerRouter,
        getPartnersRouter,
        updatePartnerRouter,
        deletePartnerRouter }
