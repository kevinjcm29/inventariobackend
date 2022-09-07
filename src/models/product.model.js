const { Schema, model } = require("mongoose");

const productSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    category : {
        type: String,
        required: true,
    },
    image: {
        type: String,
    },
    price: {
        type: Number,
        required: true,
        default: 0,
    },
    stock: {
        type: Number,
        default: 0,
        required: true,
    },
    id: {
        type: Number,
        default: Math.random()
    },
    created_at: {
        type: Date,
        default: new Date(),
    },
    status: {
        type: Boolean,
        default: true,
    }
});

productSchema.methods.setImgUrl = function setImgUrl (filename) {
    const host = "http://localhost"
    const port = 1337;

    this.image = `${host}:${port}/public/${filename}`
}

module.exports = model("Product", productSchema);