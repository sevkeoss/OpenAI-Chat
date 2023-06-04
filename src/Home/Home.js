import React from "react";
import Navbar from "../Navbar";
import PromptBox from "./PromptBox";
import Grid from "@mui/material/Unstable_Grid2";

function Home() {
  return (
    <React.Fragment>
      <Grid container direction="column" rowSpacing={3}>
        <Navbar />
        <PromptBox />
      </Grid>
    </React.Fragment>
  );
}

export default Home;
