import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    title: { type: String, required: true }, // Product title (required for clarity)
    image: { type: String, required: true }, // Image URL (corrected case to match convention)
    price: { type: String, default: '' }, // Price as a string (can include currency symbol)
    link: { type: String, required: true }, // Link to the product
}, { timestamps: true }); // Automatically add createdAt and updatedAt timestamps

export const Product = mongoose.model('Product', productSchema);
