import { Container, Grid } from "@mui/material";
import { height } from "@mui/system";
import { Typography } from "@mui/material";
import Clock from "./Clock"


const Home = () => {
  return(
    <Grid className="home" container>
      <Grid item xs={1} md={2} lg={3}></Grid>
      <Grid item xs={10} md={8} lg={6} sx={{position:"relative"}}>
        <Clock/>
      </Grid>
      <Grid item xs={1} md={2} lg={3}></Grid>
    </Grid>
  );
};

export default Home;
