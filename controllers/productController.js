import Product from "../models/Product.js";

// ➕ Add Product
const addProduct = async (req, res) => {
  try {
    const { name, description, price, stock, category, supplier } = req.body;

    const newProduct = new Product({
      name,
      description,
      price,
      stock,
      category,
      supplier,
      userId: req.user.id, // 👈 attach logged-in user
      isDeleted: false,
    });

    await newProduct.save();
    return res.status(201).json({
      success: true,
      message: "Product added successfully",
      product: newProduct,
    });
  } catch (error) {
    console.error("Error adding product:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// 📦 Get Products (only for logged-in user)
const getProducts = async (req, res) => {
  try {
    const products = await Product.find({
      userId: req.user.id,
      isDeleted: false,
    });
    return res.status(200).json({ success: true, products });
  } catch (error) {
    console.error("Error fetching products:", error);
    return res
      .status(500)
      .json({ success: false, message: "Server error in getting products" });
  }
};

// ✏️ Update Product (only if owned by user)
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, stock, category, supplier } = req.body;

    const updatedProduct = await Product.findOneAndUpdate(
      { _id: id, userId: req.user.id }, // 👈 enforce ownership
      { name, description, price, stock, category, supplier },
      { new: true }
    );

    if (!updatedProduct) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found or unauthorized" });
    }
    return res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    console.error("Error updating product", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// 🗑️ Delete Product (soft delete, only if owned by user)
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const existingProduct = await Product.findOne({
      _id: id,
      userId: req.user.id,
    });
    if (!existingProduct) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found or unauthorized" });
    }

    if (existingProduct.isDeleted) {
      return res
        .status(400)
        .json({ success: false, message: "Product already deleted" });
    }

    await Product.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
    return res
      .status(200)
      .json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export { addProduct, getProducts, updateProduct, deleteProduct };
