import { Partner } from '../Models/partner-schema.js'
import { validationResult } from 'express-validator'

// add
export const addPartner = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  const { name, 
          contactEmail, 
          address } = req.body

  try {
    const existingPartner = await Partner.findOne({
      $or: [{ name }, { contactEmail }]
    })

    if (existingPartner) {
      return res.status(409).json({
        message: 'Partner with the same name or email already exists'
      })
    }

    const newPartner = new Partner({
      name,
      contactEmail,
      address
    })

    await newPartner.save()
    res.status(201).json(newPartner)
  } catch (error) {
    console.error('Error adding partner:', error)
    res.status(500).json({ message: 'Server error' })
  }
}

// get
export const getAllpartners = async (req, res) => {
    try {
        const partners = await Partner.find()
        res.status(200).json(partners)
    } catch (error) {
        console.error('Error fetching partners:', error)
        res.status(500).json({ message: 'Internal server error' })
    }
}

// upt
export const updatePartner = async (req, res) => {
    try{
        const { id } = req.params
        const updateData = req.body
        const errors = validationResult(req)
        
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }        

        if(!id) {
            return res.status(400).json({ message: 'Partner ID is required'})
        }
        
        const updatedData = await Partner.findByIdAndUpdate(id, updateData, {new: true})
        res.status(200).json({ message: `${updatedData} is updated` })
    }catch(error){
        console.error('Error update partner:', error)
        res.status(500).json({ message: 'Internal server error' })        
    }
}

// del 
export const deletePartner = async (req, res) => {
    try {
        const { id } = req.params
        
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        if (!id) {
            return res.status(400).json({ message: 'Partner ID is required' })
        }
        const partner = await Partner.findByIdAndDelete(id);
        if (!partner) {
            return res.status(404).json({ message: 'Partner not found' })
        }
        res.status(200).json({ message: 'Partner deleted successfully' })
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' })
    }
}  