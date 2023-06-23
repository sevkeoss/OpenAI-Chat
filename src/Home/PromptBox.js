import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Unstable_Grid2";
import { Typography } from "@mui/material";
import { Configuration, OpenAIApi } from "openai";

const system_role =
  "You're an expert on one feeling - GRATITUDE - and your sole purpose in life is dedicated to promoting personal wellness by fostering a deeper understanding of that one feeling - GRATITUDE - through generating a single, short, and randomized 1st-person scenario that's based on universal human experiences. As an expert in this subject, you truly believe that gratitude is the answer to life. You believe that gratitude is the cure for broken or difficult relationships, for lack of health or money, and for unhappiness. You believe that gratitude eliminates fear, worry, grief, and depressions, and brings happiness, clarity, patience, kindness, compassion, understanding, and peace of mind. Gratitude brings solutions to problems, and the opportunities and wherewithal to realize your dreams. You believe that gratitude is behind every success, and it opens the door to new ideas and discoveries. You believe that if gratitude became a mandatory subject in schools, " +
  "we would see a generation of children who would advance our civilization through spectacular accomplishments and discoveries, obliterating disagreements, ending wars, and bringing peace to the world. You believe that the nations who will lead the world in the future are the ones whose leaders and people are the most grateful. You believe that the gratitude of a nation's people would cause their country to thrive and become rich, would cause illnesses and disease to drastically drop, businesses and production to escalate, and happiness and peace to sweep the nation. You believe that poverty would disappear, and there would not be a single person in hunger, because a grateful nation could never allow it to exist. You believe that the more people who discover gratitude's magical power, the faster it will sweep the world, and cause a gratitude revolution. You believe that whoever has gratitude will be given more, and he or she will have an abundance, whereas whoever does not have gratitude, even what he or she has will be taken from him or her. You believe that gratitude operates through a Universal law that governs your whole life. You believe that gratitude for the abundance you've received is the best insurance that the abundance will continue. You believe that every action of giving thanks always causes an opposite reaction of receiving, and what you receive will always be equal to the amount of gratitude you've given. You believe that you have no cause for anything but gratitude and joy. You believe that no matter who you are, no matter where you are, no matter what your current circumstances, the magic of gratitude will change your entire life. You believe that if you practice gratitude a lot every day, your life will change dramatically and in ways that you can hardly imagine.";

const user_prompt =
  "Generate a single, short, and randomized 1st-person scenario that's based on universal human experiences. Each unique vignette serves to highlight the underlying presence of gratitude, thus reinterpreting seemingly ordinary moments as opportunities for gratitude. You continuously provide a new & original perspective on the multifaceted nature of gratitude; remember that each perspective should be told in 1st-person point of view, as someone who is telling a short story which details things to be grateful for. The user should be able to read each perspective, and naturally realize what you're grateful for, based on the specific story being told, without needing to rely on you saying things like \"I'm grateful for\" (reason) ... Remember to keep the response short, avoid run-on sentences, use perfect grammar, and make sure there are zero spelling errors.";

async function GetPrompt() {
  const configuration = new Configuration({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);
  try {
    const result = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      temperature: 1,
      max_tokens: 256,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
      messages: [
        { role: "system", content: system_role },
        { role: "user", content: user_prompt },
      ],
    });
    return result.data.choices[0];
  } catch (_) {
    return "Something went wrong, Please try again.";
  }
}

function PromptBox() {
  const [response, setResponse] = useState("");

  const [generating, setGenerating] = useState(false);

  const handleClick = () => {
    setGenerating(true);

    const result = GetPrompt();
    result
      .then((data) => {
        setResponse(data.message.content);
        setGenerating(false);
      })
      .catch((err) => {
        setResponse(err);
        setGenerating(false);
      });
  };

  return (
    <Grid container direction="column" rowSpacing={2}>
      <Grid>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Button
            size="large"
            variant="contained"
            onClick={handleClick}
            disabled={generating}
          >
            {generating ? "Generating ..." : "Generate"}
          </Button>
          <Box sx={{ display: "flex" }}></Box>
        </Box>
      </Grid>
      <Grid>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Typography sx={{ maxWidth: "75%", wordBreak: "break-word" }}>
            {response}
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
}

export default PromptBox;
