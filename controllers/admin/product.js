const { db } = require("../../config/database.js");
const deleteImage = require("../../util/delete-image-file");
const Op=db.Sequelize.Op

const FarmerProduct = db.farmerProduct;

const Product = db.product;
const ProductType = db.productType;
//add product
const create = async (req, res) => {
  const productImage = req.files.filter((file) => {
    return file.fieldname === "product_image";
  });

  const typeImage = req.files.filter((file) => {
    return file.fieldname !== "product_image";
  });

  let productInfo = {
    name: req.body.name,
    imageUrl: productImage[0].filename,
  };

  try {
    let newProduct = await Product.create(productInfo);
    let types = [];
    if (newProduct) {
      for (let i = 0; i < typeImage.length; i++) {
        const type = {
          title: req.body["title" + i],
          description: req.body["description" + i],
          imageUrl: `${typeImage[i].filename}`,
          productId: newProduct.id,
        };

        types.push(type);
      }
    }

    const pType = await ProductType.bulkCreate(types);

    res.status(200).json({ newProduct, pType });
  } catch (err) {
    console.log("err");
    res.status(400).json("Error" + err);
  }
};

const getAll = async (req, res) => {
  try {
   const search=req.query.search
    var searchCondition = search ? {name: { [Op.like]: `%${search}%` }} : null;

    const products = await Product.findAll({
      where:searchCondition,
      include: [
        {
          model: FarmerProduct,
        },
      ],
    });

    const manipulatedProducts = products.map((product) => {
      return {
        id: product.id,
        name: product.name,
        imageUrl: product.imageUrl,
        totalProduct: product.farmerProducts.reduce((total, fproduct) => {
          return total + fproduct.currentQuantity;
        }, 0),
      };
    });
    res.json(manipulatedProducts);
  } catch (error) {
    res.status(404).json("Error " + error);
  }
};

const getProductType = async (req, res) => {
  try {
    const productTypes = await ProductType.findAll({
      where: { productId: req.params.id },
      include: [
        {
          model: FarmerProduct,
        },
      ],
    });

    const manipulatedProducts = productTypes.map((productType) => {
      return {
        id: productType.id,
        name: productType.title,
        description: productType.description,
        imageUrl: productType.imageUrl,
        totalproductType: productType.farmerProducts.reduce(
          (total, fproduct) => {
            return total + fproduct.currentQuantity;
          },
          0
        ),
      };
    });
    res.json(manipulatedProducts);
  } catch (error) {
    res.status(404).json("Error " + error);
  }
};

const update = async(req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    var imageUrl = null;
    if (req.file) {
      imageUrl = req.file.filename;
    }
    if (product) {
      if (imageUrl) {
        deleteImage("images/" + product.imageUrl);
        product.imageUrl = req.file.filename;
      }
      product.name = req.body.name;
      product.save();
      res.json(product)
    }
  } catch (error) {
    res.json(error);
  }
};

const destroy = async (req, res) => {
  try {
    /*
     * checked if possible to delete
     * remove the product image from the file
     * destroy product
     */
    const fproduct = await FarmerProduct.findOne({
      where: { productId: req.params.id },
    });
    if (fproduct) {
      res.status(403).json("Not Possible to delete");
      return
    } else {
      const product = await Product.findByPk(req.params.id);

      deleteImage("images/" + product.imageUrl);
      await Product.destry(req.params.id);
      res.json("deleted successfully");
    }
  } catch (error) {
    res.json("Error while Deleting " + error);
  }
};

module.exports = {
  create,
  getAll,
  getProductType,
  update,
  destroy
};
