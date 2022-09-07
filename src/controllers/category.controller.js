const categoryMethod = {};
const Category = require("../models/category.model");
const Product = require("../models/product.model");

function getCat(_field) {
    try {
        return Category.findOne(_field);
    } catch (error) {
        return false;
    }
}

categoryMethod.createCategory = async (req, res) => {
    const { name } = req.body;
    const category = await Category.find();
    let content = category.filter(item => item.name.toLowerCase().includes(name.toLowerCase()));
    if (content !== undefined && content.length === 0) {
        if (name) {
            try {
                const category = new Category({
                    name,
                    label: name,
                    value: name
                });

                await category.save();
                return res.status(200).json({
                    status: true,
                    message: "La categoria fue creada exitosamente.",
                });
            } catch (error) {
                return res.status(400).json({
                    status: false,
                    message: "Ocurrio un problema, intentalo de nuevo.",
                });
            }
        } else {
            return res.status(400).json({
                status: false,
                message: "se requieren todos los campos",
            });
        }
    } else {
        return res.status(400).json({
            status: false,
            message: "Ya existe una categoria con ese nombre, intente con otro nombre",
        });
    }

};

categoryMethod.getCategories = async (req, res) => {
    try {
        const category = await Category.find();
        if (category) {
            return res.status(200).json({
                status: true,
                category,
                message: "categorias buscadas",
            });
        } else {
            return res.status(400).json({
                status: false,
                message: "no hay categorias",
            });
        }
    } catch (error) {
        return res.status(400).json({
            status: false,
            message: "no hay categorias",
        });
    }
};

categoryMethod.getCategory = async (req, res) => {
    try {
        const categoryID = req.params.id;
        const products = await Product.find();
        if (categoryID) {
            const category = await getCat({ _id: categoryID });
            let cantidadDeProductos = products.filter((ir) => ir.category === category.name).length;
            if (category) {
                return res.status(200).json({
                    status: true,
                    category: {
                        category,
                        cantidadDeProductos
                    },
                    message: "cateogorias buscadas.",
                });
            } else {
                return res.status(400).json({
                    status: false,
                    message: "no hay categorias.",
                });
            }
        } else {
            return res.status(400).json({
                status: false,
                message: "Se necesita el ID de la categoria.",
            });
        }
    } catch (error) {
        return res.status(400).json({
            status: false,
            message: "no hay categorias.",
        });
    }
};

categoryMethod.deleteCategory = async (req, res) => {
    try {
        const { categoryID } = req.body;
        if (categoryID) {
            const category = await getCat({ _id: categoryID });
            const products = await Product.find();
            let productosdelaCategoria = products.filter((ir) => ir.category === category.name);
            if (category) {
                try {
                    category.remove()
                    productosdelaCategoria.map(e => {
                        e.remove()
                    })
                    return res.status(200).json({
                        status: true,
                        message: "categoria borrada correctamente",
                    });
                } catch (error) {
                    return res.status(400).json({
                        status: false,
                        message: "Ocurrio un problema, intentalo de nuevo",
                    });
                }
            } else {
                return res.status(400).json({
                    status: false,
                    message: "no hay categorias.",
                });
            }
        } else {
            return res.status(400).json({
                status: false,
                message: "Se necesita el ID de la categoria.",
            });
        }
    } catch (error) {
        return res.status(400).json({
            status: false,
            message: "no hay categorias.",
        });
    }
};

categoryMethod.getCategorybyName = async (req, res) => {
    try {
        const categories = await Category.find();
        const nameCategory = req.params.name;
        let categoriesName;
        if (categories && nameCategory) {
            if (nameCategory !== '') {
                categoriesName = categories.filter(item => item.name.toLowerCase().includes(nameCategory.toLowerCase()));
            } else {
                categoriesName = categories;
            }
            return res.status(200).json({
                status: true,
                category: categoriesName,
                message: "Categorias find",
            });
        } else {
            return res.status(400).json({
                status: false,
                message: "No cat found",
            });
        }
    } catch (error) {
        return res.status(400).json({
            status: false,
            message: "No cat found",
        });
    }
};

categoryMethod.updateCategory = async (req, res) => {
    const {
        categoryID,
        name,
    } = req.body;
    if (categoryID) {
        const category = await getCat({ _id: categoryID });
        const products = await Product.find();
        let productosdelaCategoria = products.filter((ir) => ir.category === category.name);
        if (category) {
            const toUpdatecategory = {};
            const toUpdateProduct = {};
            name ? (toUpdatecategory.name = name) : false;
            name ? (toUpdatecategory.label = name) : false;
            name ? (toUpdatecategory.value = name) : false;
            name ? (toUpdateProduct.category = name) : false;

            try {
                await category.updateOne({
                    $set: toUpdatecategory,
                });

                const posts = await Promise.all(
                    productosdelaCategoria.map(async (e) => {
                        await e.updateOne({
                            $set: toUpdateProduct,
                        });
                    })
                )

                return res.status(200).json({
                    status: true,
                    message: "La categoria fue actualizada correctamente.",
                });
            } catch (error) {
                return res.status(400).json({
                    status: false,
                    message: "Ocurrio un problema, intentalo de nuevo",
                });
            }
        } else {
            return res.status(400).json({
                status: false,
                message: "No se consiguio la categoria.",
            });
        }
    } else {
        return res.status(400).json({
            status: false,
            message: "Se necesita el ID de la categoria",
        });
    }

};

module.exports = categoryMethod;