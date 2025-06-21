import mongoose from 'mongoose'

const photoSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true
  },
  altText: {
    type: String,
    default: ''
  }
}, { timestamps: true })


export const Photo = mongoose.model('Photo', photoSchema)
