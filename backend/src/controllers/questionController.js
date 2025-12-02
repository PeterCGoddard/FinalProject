import Question from "../models/Question.js";
export const createQuestion = async (req, res) =>
{
    try
    {
        const { category, title, body } = req.body;
        if (!category || !title || !body)
        {
            return res.status(400).json({ error: "All fields are required" });
        }
        const question = await Question.create({category,title,body,user: req.user.id});
        res.status(201).json(question);
    }
    catch (errors)
    {
        console.error(errors);
        res.status(500).json({ error: "Server error" });
    }
};
export const getQuestionsByCategory = async (req, res) =>
{
    try
    {
        const { categoryId } = req.params;
        const questions = await Question.find({ category: categoryId }).populate("user", "username").sort({ createdAt: -1 });
        res.json(questions);
    }
    catch (errors)
    {
        console.error(errors);
        res.status(500).json({ error: "Server error" });
    }
};
