import React from "react";
import Description from "./Description";
import Grid from "@mui/material/Unstable_Grid2";
import Navbar from "../Navbar";

function About() {
  return (
    <React.Fragment>
      <Grid container direction="column" rowSpacing={3}>
        <Navbar />
        <Description />
      </Grid>
    </React.Fragment>
  );
}

export default About;
