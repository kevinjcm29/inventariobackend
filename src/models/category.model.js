const { Schema, model } = require("mongoose");

const categorySchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    label: {
        type: String,
        required: true,
    },
    value: {
        type: String,
        required: true,
    },
    id: {
        type: Number,
        default: Math.random()
    },
});

module.exports = model("Category", categorySchema);