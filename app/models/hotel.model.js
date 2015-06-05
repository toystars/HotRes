// import the mongoose module
var mongoose = require('mongoose');

// create a mongoose object
var Schema = mongoose.Schema;

/* 
  instantiate a mongoose schema object to store
  meta info of database object
*/
var hotelSchema = new Schema({
    name: { type: String },
    managerId: { type: String },
    pictureUrl: { type: String },
    state: { type: String },
    city: { type: String },
    rating: { type: String },
    numberOfRooms: { type: Number },
    availableRooms: { type: Number },
    description: { type: String }
});

module.exports = mongoose.model('Hotel', hotelSchema);