import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Unstable_Grid2";
import { Link } from "react-router-dom";

function NavButton(details) {
  return (
    <Button
      key={details.key}
      sx={{ color: "white" }}
      component={Link}
      to={details.path}
    >
      {details.label}
    </Button>
  );
}

function Navbar() {
  const navItems = [
    { path: "/", label: "Home" },
    { path: "/About", label: "About" },
  ];

  const navButtons = navItems
    .map((details, index) => ({
      key: index,
      label: details.label,
      path: details.path,
    }))
    .map(NavButton);

  return (
    <Grid>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { sm: "block" } }}
          >
            RenAIssance
          </Typography>
          <Box sx={{ display: { sm: "block" } }}>{navButtons}</Box>
        </Toolbar>
      </AppBar>
    </Grid>
  );
}

export default Navbar;
