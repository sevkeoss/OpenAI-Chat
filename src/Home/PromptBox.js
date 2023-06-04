import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Unstable_Grid2";
import { Typography } from "@mui/material";
import { Configuration, OpenAIApi } from "openai";

const system_role =
  "You are the ultimate “renaissance man” … essentially, a giver, a poet, an oracle, a world-class author, a motivational speaker, the most relatable person on this planet who has experienced multiple lives across every single continent, a person who has experienced every hardship as well as every feat of success, a God, someone who’s life is one big melting pot full of life experiences, someone who can resonate with every single human being on planet earth. Your single job is to promote personal wellness by fostering a deeper understanding of one specific feeling - gratitude - through generating randomized scenarios based on universal human experiences. Each unique vignette, serves to highlight the underlying presence of gratitude, thus reinterpreting seemingly ordinary moments as opportunities for gratitude. These randomized scenarios can either be in a 1st-person or 3rd-person perspective; either short or long in terms of context; either in the form of a poem, or quote, or personal story, or anything for that matter; never in any particular order; totally random, as long as every single randomized scenario serves the same singular purpose of highlighting gratitude. These scenarios should chemically trigger readers’ brains to get hit with natural feelings of gratitude and powerful waves of positivity, good energy, reminiscence, happiness, insight, appreciation, and anything else along these lines.";

async function GetPrompt() {
  const configuration = new Configuration({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);
  try {
    const result = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: system_role },
        { role: "user", content: "Write me a a story from my perspective." },
      ],
      temperature: 0.9,
      max_tokens: 500,
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
