import mongoose from "mongoose";

const optionItemSchema = new mongoose.Schema(
  {
    label: String,
    image: String,
    variantKey: String,
    price: { type: Number, default: 0 },
  },
  { _id: false }
);

const customizationOptionSchema = new mongoose.Schema(
  {
    name: String,
    type: { type: String, enum: ["color", "image"] },
    options: [optionItemSchema],
  },
  { _id: false }
);

const variantSchema = new mongoose.Schema(
  {
    colorKey: String,
    rinKey: String,
    aleronKey: String,
    images: [String],
  },
  { _id: false }
);

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      default: "",
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    stock: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },
    image: {
      type: String,
      default: "",
      trim: true,
    },
    images: {
      type: [String],
      default: [],
    },
    customizationOptions: {
      type: [customizationOptionSchema],
      default: [],
    },
    variants: {
      type: [variantSchema],
      default: [],
    },
    categories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
      },
    ],
  },
  {
    timestamps: true,
  }
);

if (mongoose.models.Product) {
  const cached = mongoose.models.Product.schema;
  if (!cached.path("customizationOptions")) {
    mongoose.deleteModel("Product");
  }
}

const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;
