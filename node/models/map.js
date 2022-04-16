const mongo = require("mongoose");
const place = mongo.Schema({
    _id: String,
    name: {
        type: String,
        required: true,
        lowercase: true
    },
    address: String,
    types: [String],
    images: {

        type: [mongo.SchemaTypes.ObjectId],
        default: [new mongo.Types.ObjectId,
            new mongo.Types.ObjectId
        ]
    },
    coordinates: { lat: Number, lng: Number },
    createdAt: {
        type: Date,
        default: new Date,
        immutable: true
    },
    changedAt: {
        type: Date,
        default: new Date,
        immutable: false,
    },

})

module.exports = mongo.model("Place", place)