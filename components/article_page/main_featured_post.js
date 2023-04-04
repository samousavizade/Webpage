import * as React from "react";
import PropTypes from "prop-types";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";

function MainFeaturedPost({ article, elevationValue }) {
  return (
    <Paper
      sx={{
        // position: "relative",
        backgroundColor: "grey.800",
        // width:500,
        height: 250,
        elevation: { elevationValue },
        // backgroundSize: "contain",
        // backgroundRepeat: "no-repeat",
        // backgroundPosition: "center",
        // backgroundImage: `url(${article.image_link})`,
      }}
    >
      <Grid height={1} container>
        <Grid item bgcolor="green" xs={4} sm={4} md={4} lg={4}>
          <Avatar
            key={"avatar"}
            variant="square"
            sx={{ minHeight: 1, minWidth: 1 }}
            alt="Example Alt"
            src={article.imageLink}
          />
        </Grid>

        <Grid item xs={8} sm={8} md={8} lg={8} padding={4}>
          <Typography
            component="h1"
            variant="h3"
            color="text.light"
            gutterBottom
          >
            {article.title}
          </Typography>
          <Typography variant="h5" color="text.main" paragraph>
            {article.subTitle}
          </Typography>
          {/* <Link variant="subtitle1" href="#">
              {article.author}
            </Link> */}
        </Grid>
      </Grid>
    </Paper>
  );
}

export default MainFeaturedPost;
