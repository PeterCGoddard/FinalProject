import mongoose from "mongoose";
import dotenv from "dotenv";
import Category from "./models/Category.js";

dotenv.config();

async function seedCategories()
{
  try
  {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");
    const categories =
    [
      { name: "JavaScript" },
      { name: "Python" },
      { name: "Databases" },
      { name: "Web Development" },
      { name: "Data Structures" }
    ];
    for (let cat of categories)
    {
      const result = await Category.findOne({ name: cat.name });
      if (!result)
      {
        await Category.create(cat);
        console.log(`Inserted: ${cat.name}`);
      }
      else
      {
        // pass
      }
    }
    console.log("Seeding completed.");
    process.exit(0);
  }
  catch (errors)
  {
    console.error("Seeding failed:", errors);
    process.exit(1);
  }
}

seedCategories();
