import Answer from "../models/Answer.js";

export const createAnswer = async (req, res) =>
{
    try
    {
        const { question, body } = req.body;
        if (!question || !body)
        {
            return res.status(400).json({ error: "All fields required" });
        }
        const answer = await Answer.create({question,body,user: req.user.id});
        res.status(201).json(answer);
    }
    catch (errors)
    {
        console.error(errors);
        res.status(500).json({ error: "Server error" });
    }
};
export const getAnswers = async (req, res) =>
{
  try
  {
    const { questionId } = req.params;
    const answers = await Answer.find({ question: questionId }).populate("user", "username").sort({ createdAt: -1 });
    res.json(answers);
  }
  catch (errors)
  {
    console.error(errors);
    res.status(500).json({ error: "Server error" });
  }
};
