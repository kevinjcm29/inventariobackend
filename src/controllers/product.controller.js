const productMethod = {};
const Product = require("../models/product.model");
const acc = require("../middlewares/accessControl");
const fs = require("fs");
const path = require("path");

function getProduct(_field) {
    try {
        return Product.findOne(_field);
    } catch (error) {
        return false;
    }
}

productMethod.getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        let _products = products.map(e => {
            const name = e.name;
            const description = e.description;
            const category = e.category;
            const price = e.price;
            const image = e.image.replace('http://localhost:1337', 'https://inventariobackend-production.up.railway.app');
            const stock = e.stock;
            const id = e.id;
            const _id = e._id;
            const created_at = e.created_at;
            const status = e.status;
            const item = {
                name,
                description,
                category,
                price,
                image,
                stock,
                id,
                _id,
                created_at, status
            };
            return item;
        });
        if (products) {
            return res.status(200).json({
                status: true,
                products: _products,
                message: "Productos buscados.",
            });
        } else {
            return res.status(400).json({
                status: false,
                message: "No se consiguieron productos.",
            });
        }
    } catch (error) {
        return res.status(400).json({
            status: false,
            message: "No se consiguieron productos.",
        });
    }
};

productMethod.getProductsbyFilter = async (req, res) => {
    try {
        const products = await Product.find();
        const category = req.params.category;
        let _products = products.map(e => {
            const name = e.name;
            const description = e.description;
            const category = e.category;
            const price = e.price;
            const image = e.image.replace('http://localhost:1337', 'https://inventariobackend-production.up.railway.app');
            const stock = e.stock;
            const id = e.id;
            const _id = e._id;
            const created_at = e.created_at;
            const status = e.status;
            const item = {
                name,
                description,
                category,
                price,
                image,
                stock,
                id,
                _id,
                created_at, status
            };
            return item;
        });
        let productosFilter;
        if (products && category) {
            if (category !== 'Todas') {
                productosFilter = _products.filter((product) => product.category === category)
            } else {
                productosFilter = _products;
            }
            return res.status(200).json({
                status: true,
                products: productosFilter,
                message: "Productos buscados.",
            });
        } else {
            return res.status(400).json({
                status: false,
                message: "No se consiguieron productos.",
            });
        }
    } catch (error) {
        return res.status(400).json({
            status: false,
            message: "No se consiguieron productos.",
        });
    }
};

productMethod.getProductsbyFilterandName = async (req, res) => {
    try {
        const products = await Product.find();
        const category = req.params.category;
        const nameProduct = req.params.name;
        let _products = products.map(e => {
            const name = e.name;
            const description = e.description;
            const category = e.category;
            const price = e.price;
            const image = e.image.replace('http://localhost:1337', 'https://inventariobackend-production.up.railway.app');
            const stock = e.stock;
            const id = e.id;
            const _id = e._id;
            const created_at = e.created_at;
            const status = e.status;
            const item = {
                name,
                description,
                category,
                price,
                image,
                stock,
                id,
                _id,
                created_at, status
            };
            return item;
        });
        let productosFilter;
        if (products && category) {
            if (category !== 'Todas') {
                productosFilter = _products.filter((product) => product.category === category)
                productosFilter = productosFilter.filter(item => item.name.toLowerCase().includes(nameProduct.toLowerCase()));
            } else {
                productosFilter = _products;
            }
            return res.status(200).json({
                status: true,
                products: productosFilter,
                message: "Productos buscados.",
            });
        } else {
            return res.status(400).json({
                status: false,
                message: "No se consiguieron productos.",
            });
        }
    } catch (error) {
        return res.status(400).json({
            status: false,
            message: "No se consiguieron productos.",
        });
    }
};

productMethod.getProductsbyName = async (req, res) => {
    try {
        const products = await Product.find();
        const nameProduct = req.params.name;
        let productosName;
        let _products = products.map(e => {
            const name = e.name;
            const description = e.description;
            const category = e.category;
            const price = e.price;
            const image = e.image.replace('http://localhost:1337', 'https://inventariobackend-production.up.railway.app');
            const stock = e.stock;
            const id = e.id;
            const _id = e._id;
            const created_at = e.created_at;
            const status = e.status;
            const item = {
                name,
                description,
                category,
                price,
                image,
                stock,
                id,
                _id,
                created_at, status
            };
            return item;
        });
        if (products && nameProduct) {
            if (nameProduct !== '') {
                productosName = _products.filter(item => item.name.toLowerCase().includes(nameProduct.toLowerCase()));
            } else {
                productosName = _products;
            }
            return res.status(200).json({
                status: true,
                products: productosName,
                message: "Productos buscados.",
            });
        } else {
            return res.status(400).json({
                status: false,
                message: "No se consiguieron productos.",
            });
        }
    } catch (error) {
        return res.status(400).json({
            status: false,
            message: "No se consiguieron productos.",
        });
    }
};

productMethod.getProduct = async (req, res) => {
    try {
        const productID = req.params.id;
        if (productID) {
            const product = await getProduct({ _id: productID });
            if (product) {
                return res.status(200).json({
                    status: true,
                    product,
                    message: "Producto conseguido",
                });
            } else {
                return res.status(400).json({
                    status: false,
                    message: "No se consiguio el producto.",
                });
            }
        } else {
            return res.status(400).json({
                status: false,
                message: "Se necesita el ID del producto.",
            });
        }
    } catch (error) {
        return res.status(400).json({
            status: false,
            message: "No se consiguio el producto.",
        });
    }
};


productMethod.createProduct = async (req, res) => {
    const { name, description, price, stock, category } = req.body;
    const products = await Product.find();
    let content = products.filter(item => item.name.toLowerCase().includes(name.toLowerCase()));
    if (content !== undefined && content.length === 0) {
        if (name && description && price && stock && category) {
            try {
                const product = new Product({
                    name,
                    description,
                    price,
                    stock,
                    category
                });

                if (req.file) {
                    const { filename } = req.file
                    product.setImgUrl(filename)
                }

                await product.save();
                return res.status(200).json({
                    status: true,
                    message: "The product was created successfully.",
                });
            } catch (error) {
                return res.status(400).json({
                    status: false,
                    message: "Ocurrio un problema, vuelvelo a intentar",
                });
            }
        } else {
            return res.status(400).json({
                status: false,
                message: "Se necesitan rellenar todos los campos.",
            });
        }
    } else {
        return res.status(400).json({
            status: false,
            message: "Ya existe un producto con ese nombre, intente con otro nombre",
        });
    }

};

productMethod.updateProduct = async (req, res) => {
    const {
        productID,
        name,
        description,
        price,
        category,
        stock,
    } = req.body;
    if (productID) {
        const product = await getProduct({ _id: productID });
        if (product) {
            const toUpdateProduct = {};
            name ? (toUpdateProduct.name = name) : false;
            description
                ? (toUpdateProduct.description = description)
                : false;
            category ? (toUpdateProduct.category = category) : false;
            price ? (toUpdateProduct.price = price) : false;
            stock ? (toUpdateProduct.stock = stock) : false;

            try {
                await product.updateOne({
                    $set: toUpdateProduct,
                });
                return res.status(200).json({
                    status: true,
                    message: "El producto fue editado correctamente.",
                });
            } catch (error) {
                return res.status(400).json({
                    status: false,
                    message: "Ocurrio un problema, vuelvelo a intentar",
                });
            }
        } else {
            return res.status(400).json({
                status: false,
                message: "No se consiguio el producto.",
            });
        }
    } else {
        return res.status(400).json({
            status: false,
            message: "The ID is required",
        });
    }

};



productMethod.deleteProduct = async (req, res) => {
    try {
        const { productID } = req.body;
        if (productID) {
            const product = await getProduct({ _id: productID });
            if (product) {
                try {
                    product.remove()
                    return res.status(200).json({
                        status: true,
                        message: "Producto borrado correctamente",
                    });
                } catch (error) {
                    return res.status(400).json({
                        status: false,
                        message: "Ocurrio un problema, vuelvelo a intentar",
                    });
                }
            } else {
                return res.status(400).json({
                    status: false,
                    message: "No se consiguio el producto.",
                });
            }
        } else {
            return res.status(400).json({
                status: false,
                message: "Se necesita el ID del producto.",
            });
        }
    } catch (error) {
        return res.status(400).json({
            status: false,
            message: "No se consiguio el producto.",
        });
    }
};


module.exports = productMethod;
