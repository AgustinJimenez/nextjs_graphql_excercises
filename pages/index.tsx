import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import React from "react";
import TextField from "@mui/material/TextField";
import PeopleTable from "../components/PeopleTable";

const Home = () => {
  const [searchValue, setSearchValue] = React.useState("");

  return (
    <Grid xs={12} direction="row">
      <Container>
        <TextField
          id="outlined-basic"
          label="Outlined"
          variant="outlined"
          value={searchValue}
          onChange={(event) => setSearchValue(event.target.value)}
        />
      </Container>
      <Container>
        <PeopleTable searchValue={searchValue} />
      </Container>
    </Grid>
  );
};

export async function getStaticProps() {
  return {
    props: {},
  };
}

export default Home;
