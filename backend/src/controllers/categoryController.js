import Category from "../models/Category.js";

export const createCategory = async (req, res) =>
{
    try
    {
        const { name } = req.body;
        if (!name)
        {
            return res.status(400).json({ error: "Category name required" });
        }
        const result = await Category.findOne({ name });
        if (result)
        {
            return res.status(400).json({ error: "Category already exists" });
        }
        const category = await Category.create({ name });
        res.status(201).json(category);
    }
    catch (errors)
    {
        console.error(errors);
        res.status(500).json({ error: "Server error" });
    }
};

export const getCategories = async (req, res) =>
{
    try
    {
        const categories = await Category.find().sort({ name: 1 });
        res.json(categories);
    }
    catch (errors)
    {
        console.error(errors);
        res.status(500).json({ error: "Server error" });
    }
};
