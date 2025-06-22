import express from 'express'
import { createDiscount } from '../Controllers/discount-controller.js'
import { getAllDiscounts }from '../Controllers/discount-controller.js'
import { updateDiscount } from '../Controllers/discount-controller.js'
import { deleteDiscount }from '../Controllers/discount-controller.js'

// create
const createDiscountRouter = express.Router()
createDiscountRouter.post(
    '/create',
    createDiscount
) 

// get
const getDiscountRouter = express.Router()
getDiscountRouter.post('/showAll', getAllDiscounts)

// upt
const updateDiscountRouter = express.Router()
updateDiscountRouter.put('/update/:id',
    updateDiscount
)

// del
const deleteDiscountRouter = express.Router()
deleteDiscountRouter.delete(
    '/delete/:id',
    deleteDiscount
)

export { createDiscountRouter, 
         getDiscountRouter, 
         updateDiscountRouter, 
         deleteDiscountRouter }