const mongoose = require('mongoose')
const Schema = mongoose.Schema

const newtourSchema = new Schema({
    tourName: { type: String, required: true },
    adultPrice: {type: String, required: true},
    childPrice: {type: String, required: true},
    tourInfo: {
      type: [
        {
          key: { type: String, required: true },
          value: { type: String, required: true }
        }
      ],
      default: [] // Ensure default is an empty array
    },
    aboutTour: { type: String, required: true },
    included: { type: String, required: true },
    itinerary: {
      type: [
        {
          day: { type: String, required: true },
          heading: { type: String, required: true },
          content: { type: String, required: true }
        }
      ],
      default: [] // Ensure default is an empty array
    },
    images: {
      type: [
        {
          imgkey: { type: String, required: true },
          value: { type: String, required: true }
        }
      ],
      default: [] // Ensure default is an empty array
    }
  });
  

module.exports = mongoose.model('newtours', newtourSchema)