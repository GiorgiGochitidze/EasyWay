import mongoose from 'mongoose'

const partnerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  contactEmail: {
    type: String,
    required: true,
    validate: {
        validator: function (v) {
            return /^.+@.+\..+$/.test(v)
        },
        message: props => `${props.value} is not a valid email!`
    }  
  },
  photos: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Photo', 
    required: true
  }],
  telephoneNumber: {
    type: String
  },
  address: {
    street: String,
    city: String,
    state: String,
    postalCode: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}) 

export const Partner = mongoose.model('Partner', partnerSchema)
