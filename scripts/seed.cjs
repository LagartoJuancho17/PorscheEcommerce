const mongoose = require("mongoose");

const MONGODB_URI =
  "mongodb+srv://totoarr17_db_user:v8VWqdLUiSKkHto4@ecommerce.kn7szeo.mongodb.net/?appName=Ecommerce";

const productSchema = new mongoose.Schema(
  {
    name: String,
    description: String,
    price: Number,
    stock: Number,
    image: String,
    images: [String],
    customizationOptions: [mongoose.Schema.Types.Mixed],
    variants: [mongoose.Schema.Types.Mixed],
    categories: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }],
  },
  { timestamps: true }
);

const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);

const products = [
  {
    name: "911 Carrera",
    description:
      "El icono por excelencia. Mas de 60 anos de historia en un auto que redefine lo que significa conducir. Motor boxer de 3.0L biturbo, 385 CV.",
    price: 145000,
    stock: 5,
    image: "products/911.webp",
    images: [
      "products/911.webp",
      "products/911/911base1.jpg",
      "products/911/911base2.jpg",
      "products/911/911base3.jpg",
      "products/911/911base4.jpg",
      "products/911/911base5.jpg",
      "products/911/911base6.jpg",
      "products/911/911base7.jpg",
    ],
    customizationOptions: [
      {
        name: "Color exterior",
        type: "image",
        options: [
          { label: "Blanco", image: "products/911/colorBlanco.jpg", variantKey: "Blanco", price: 0 },
          { label: "Negro", image: "products/911/colorNegro.jpg", variantKey: "Negro", price: 2000 },
        ],
      },
      {
        name: "Rines",
        type: "image",
        options: [
          { label: "Rin 1", image: "products/911/rin1.jpg", variantKey: "Rin1", price: 0 },
          { label: "Rin 2", image: "products/911/rin2.jpg", variantKey: "Rin2", price: 3500 },
        ],
      },
      {
        name: "Alerón",
        type: "image",
        options: [
          { label: "Sin alerón", image: "products/911/911base1.jpg", variantKey: "base", price: 0 },
          { label: "Con alerón", image: "products/911/aleron.jpg", variantKey: "Aleron", price: 5800 },
        ],
      },
    ],
    variants: [
      {
        colorKey: "Blanco", rinKey: "Rin1", aleronKey: "base",
        images: [
          "products/911/BlancoBaseRin1/frenteBlancoBaseRinBaseInteriorBase.webp.webp",
          "products/911/BlancoBaseRin1/frentecostadoBlancoBaseRinBaseInteriorBase.webp",
          "products/911/BlancoBaseRin1/costadoBlancoBaseRinBaseInteriorBase.webp",
          "products/911/BlancoBaseRin1/atrascostadoBlancoBaseRinBaseInteriorBase.webp",
          "products/911/BlancoBaseRin1/atrasBlancoBaseRinBaseInteriorBase.webp.webp",
          "products/911/BlancoBaseRin1/ruedaBlancoBaseRinBaseInteriorBase.webp",
          "products/911/BlancoBaseRin1/interior1Base.jpg",
          "products/911/BlancoBaseRin1/interior2Base.webp",
        ],
      },
      {
        colorKey: "Blanco", rinKey: "Rin2", aleronKey: "base",
        images: [
          "products/911/BlancoBaseRin2/frenteBlancoBaseRin2InteriorBase.webp.webp",
          "products/911/BlancoBaseRin2/frentecostadoBlancoBaseRin2InteriorBase.jpg",
          "products/911/BlancoBaseRin2/costadoBlancoBaseRin2InteriorBase.jpg",
          "products/911/BlancoBaseRin2/atrascostadoBlancoBaseRin2InteriorBase.jpg",
          "products/911/BlancoBaseRin2/atrasBlancoBaseRin2InteriorBase.webp.webp",
          "products/911/BlancoBaseRin2/ruedaBlancoBaseRin2InteriorBase.jpg",
          "products/911/BlancoBaseRin2/interior1Base.jpg",
          "products/911/BlancoBaseRin2/interior2Base.webp",
        ],
      },
      {
        colorKey: "Blanco", rinKey: "Rin1", aleronKey: "Aleron",
        images: [
          "products/911/BlancoBaseRinBaseAleron/frenteBlancoBaseRinBaseInteriorBaseAleron.webp.webp",
          "products/911/BlancoBaseRinBaseAleron/frentecostadoBlancoBaseRinBaseInteriorBaseAleron.jpg",
          "products/911/BlancoBaseRinBaseAleron/costadoBlancoBaseRinBaseInteriorBaseAleron.jpg",
          "products/911/BlancoBaseRinBaseAleron/atrascostadoBlancoBaseRinBaseInteriorBaseAleron.jpg",
          "products/911/BlancoBaseRinBaseAleron/atrasBlancoBaseRinBaseInteriorBaseAleron.jpg",
          "products/911/BlancoBaseRinBaseAleron/ruedaBlancoBaseRinBaseInteriorBaseAleron.jpg",
          "products/911/BlancoBaseRinBaseAleron/interior1Base.jpg",
          "products/911/BlancoBaseRinBaseAleron/interior2Base.webp",
        ],
      },
      {
        colorKey: "Blanco", rinKey: "Rin2", aleronKey: "Aleron",
        images: [
          "products/911/BlancoBaseRin2Aleron/frenteBlancoBaseRin2InteriorBaseAleron.webp.webp",
          "products/911/BlancoBaseRin2Aleron/frentecostadoBlancoBaseRin2InteriorBaseAleron.jpg",
          "products/911/BlancoBaseRin2Aleron/costadoBlancoBaseRin2InteriorBaseAleron.jpg",
          "products/911/BlancoBaseRin2Aleron/atrascostadoBlancoBaseRin2InteriorBaseAleron.jpg",
          "products/911/BlancoBaseRin2Aleron/atrasBlancoBaseRin2InteriorBaseAleron.jpg",
          "products/911/BlancoBaseRin2Aleron/ruedaBlancoBaseRin2InteriorBaseAleron.jpg",
          "products/911/BlancoBaseRin2Aleron/interior1Base.jpg",
          "products/911/BlancoBaseRin2Aleron/interior2Base.webp",
        ],
      },
      {
        colorKey: "Negro", rinKey: "Rin1", aleronKey: "base",
        images: [
          "products/911/NegroBase/frenteNegroBaseRinBaseInteriorBase.jpg",
          "products/911/NegroBase/frentecostadoNegroBaseRinBaseInteriorBase.jpg",
          "products/911/NegroBase/costadoNegroBaseRinBaseInteriorBase.jpg",
          "products/911/NegroBase/atrascostadoNegroBaseRinBaseInteriorBase.jpg",
          "products/911/NegroBase/atrasNegroBaseRinBaseInteriorBase.webp.webp.jpg",
          "products/911/NegroBase/ruedaNegroBaseRinBaseInteriorBase.jpg",
        ],
      },
    ],
    categories: [],
  },
  {
    name: "718 Boxster",
    description:
      "Dinamismo puro en formato roadster. Motor central, equilibrio perfecto y una experiencia de conduccion sin igual.",
    price: 92000,
    stock: 8,
    image: "products/718.webp",
    categories: [],
  },
  {
    name: "Taycan",
    description:
      "El futuro de la conduccion deportiva. 100% electrico, 0 a 100 km/h en 2.8 segundos. El deportivo electrico mas avanzado del mundo.",
    price: 189000,
    stock: 3,
    image: "products/taycan.webp",
    categories: [],
  },
  {
    name: "Panamera",
    description:
      "Gran turismo de cuatro puertas. La perfecta fusion entre lujo, confort y performance deportiva para el dia a dia.",
    price: 135000,
    stock: 6,
    image: "products/panamera.webp",
    categories: [],
  },
];

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Conectado. Base de datos:", mongoose.connection.name);

    const existing = await Product.countDocuments();
    if (existing > 0) {
      console.log(`Eliminando ${existing} productos existentes...`);
      await Product.deleteMany({});
    }

    const result = await Product.insertMany(products);
    console.log(`\n✓ ${result.length} productos insertados:`);
    result.forEach((p) => console.log(`  - ${p.name} | ${p.image} | _id: ${p._id}`));
  } catch (err) {
    console.error("Error:", err.message);
  } finally {
    await mongoose.disconnect();
    console.log("\nConexion cerrada.");
  }
}

seed();
