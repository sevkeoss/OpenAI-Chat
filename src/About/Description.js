import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

function Description() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Typography sx={{ maxWidth: "75%", wordBreak: "break-word" }}>
        Downloadable mobile and web application software utilizing generative
        artificial intelligence, dedicated to promoting personal wellness by
        fostering a deeper understanding of one specific feeling - GRATITUDE -
        through generating randomized scenarios based on universal human
        experiences. Each unique vignette serves to highlight the underlying
        presence of gratitude, thus reinterpreting seemingly ordinary moments as
        opportunities for gratitude. Refreshable with each interaction, the
        application continuously provides new perspectives on the multifaceted
        nature of gratitude
      </Typography>
    </Box>
  );
}

export default Description;
