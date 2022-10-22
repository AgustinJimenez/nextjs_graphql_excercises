import Container from "@mui/material/Container";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import React from "react";
import TextField from "@mui/material/TextField";
import { getAllPeopleApi } from "./api/peopleQueries";

const Home = ({ people = [] }: any) => {
  const [firstName, setFirstName] = React.useState("");

  return (
    <Container>
      <TextField
        id="outlined-basic"
        label="Outlined"
        variant="outlined"
        value={firstName}
        onChange={(event) => setFirstName(event.target.value)}
      />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {[
                "Last Name",
                "First Name",
                "Email",
                "Country",
                "VIP",
                "Last Modified",
              ].map((label, key) => (
                <TableCell align={key === 0 ? undefined : "right"} key={label}>
                  <b>{label}</b>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {people?.map?.(
              ({
                first_name,
                last_name,
                email,
                country,
                id,
                vip,
                modified,
              }) => (
                <TableRow
                  key={id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {last_name}
                  </TableCell>
                  <TableCell align="right">{first_name}</TableCell>
                  <TableCell align="right">{email}</TableCell>
                  <TableCell align="right">{country}</TableCell>
                  <TableCell align="right">{vip ? "YES" : "NO"}</TableCell>
                  <TableCell align="right">{modified}</TableCell>
                </TableRow>
              )
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export async function getStaticProps() {
  const {
    data: { people = [] },
  } = await getAllPeopleApi({
    search_value: "mar",
  });
  return {
    props: {
      people,
    },
  };
}

export default Home;
