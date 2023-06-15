import express, { Application, Request, Response } from "express";
import { Configuration, OpenAIApi } from "openai";
import * as dotenv from "dotenv";
import cors from "cors";

const PORT = 3000; // default port to listen

dotenv.config();

const openai = new OpenAIApi(
  new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  })
);

const app: Application = express();
app.use(express.json());
app.use(cors());

// define a route handler for the default home page
app.get("/", async (req: Request, res: Response) => {
  res.status(200).send("Hello AI Tools!");
});

app.post("/chat", async (req: Request, res: Response) => {
  try {
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "user", content: "Hello!" },
        { role: "assistant", content: "Hello, how can I assist you today?" },
        { role: "user", content: req.body.prompt.content },
      ],
    });
    res.status(200).send(response.data.choices[0].message);
  } catch (error) {
    res.status(500).send({ error });
  }
});

// start the Express server
app.listen(PORT, () => {
  console.log(`server started at http://localhost:${PORT}`);
});
