const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const path = require("path");
const app = express();
require('./config/config')

const {
    login,
    register,
    authenticate,
} = require("./controllers/user.controller");

const {
    getProduct,
    getProducts,
    createProduct,
    updateProduct,
    getProductsbyFilter,
    getProductsbyFilterandName,
    deleteProduct,
    getProductsbyName,
    updateProductPoster,
    updateProductGallery,
    deleteProductGalleryPhoto,
} = require("./controllers/product.controller");

const {
    createCategory,
    getCategories,
    updateCategory,
    getCategorybyName,
    getCategory,
    deleteCategory,
} = require("./controllers/category.controller")
const upload = require("./middlewares/uploadMiddleware");

// Set more security to request
app.use(helmet())

// Allow cors
app.use(cors())

// Set module for helped request information
app.use(morgan("combined"))

// Allow json request
app.use(express.json());
app.use(express.urlencoded({ extended: true, parameterLimit: 100000, limit: "500mb" }));

// Define static files access
// app.use('/public', express.static(`${__dirname}/img/products`))
app.use('/public', express.static(__dirname + '/img/products'));

// Configure routes
app.post("/api/register", register);

app.post("/api/login", login);

app.get("/api/authenticate", authenticate);

app.post("/api/createProduct", upload.single('image'), createProduct);

app.get("/api/getProducts", getProducts);

app.put("/api/updateProduct", updateProduct);
app.put("/api/updateCategory", updateCategory);

app.delete("/api/deleteProduct", deleteProduct);

app.delete("/api/deleteCategory", deleteCategory);

app.post("/api/createCategory", createCategory);

app.get("/api/getCategories", getCategories);
app.get("/api/getProductsbyFilter/:category", getProductsbyFilter)
app.get("/api/getProductsbyName/:name", getProductsbyName)
app.get("/api/getCategorybyName/:name", getCategorybyName)
app.get("/api/getProductsbyFilterandName/:category/:name", getProductsbyFilterandName)
app.get("/api/getCategory/:id", getCategory);
app.get("/api/getProduct/:id", getProduct)

module.exports = app;
