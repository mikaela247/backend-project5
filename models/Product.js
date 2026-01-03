import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  isDeleted: { type: Boolean, default: false },
  category: { type: String, required: true },
  supplier: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const Product = mongoose.model("Product", productSchema);
export default Product;
