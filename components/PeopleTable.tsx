import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import {
  useTogglePeopleStatusById,
  useGetAllPeople,
} from "../pages/api/peopleQueries";
import ClientOnly from "./ClientOnly";
import ConfirmDialog from "./ConfirmDialog";
import { CircularProgress } from "@mui/material";

const PeopleTable = ({ searchValue }: any) => {
  const confirmDialogRef: any = React.useRef();
  const { data: { people = [] } = {} } = useGetAllPeople({
    search_value: searchValue,
  });
  const onDeleteBtnClick = (
    id: number,
    first_name: string,
    last_name: string,
    active: boolean
  ) => {
    confirmDialogRef?.current?.setData({
      id,
      first_name,
      last_name,
      active,
    });
    confirmDialogRef?.current?.open();
  };
  const [togglePeopleStatusById, { data, loading: deleteIsLoading, error }] =
    useTogglePeopleStatusById({ search_value: searchValue });

  const onConfirmDeletePeople = () => {
    confirmDialogRef?.current?.close();
    togglePeopleStatusById({
      variables: { id: confirmDialogRef?.current?.data?.id },
    });
    confirmDialogRef?.current?.setData(null);
  };

  return (
    <ClientOnly>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              {[
                "ID",
                "Last Name",
                "First Name",
                "Email",
                "Country",
                "VIP",
                "Last Modified",
                "Active",
                "Actions",
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
                active,
                modified,
              }: any) => (
                <TableRow
                  key={id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {id}
                  </TableCell>
                  <TableCell align="right">{last_name}</TableCell>
                  <TableCell align="right">{first_name}</TableCell>
                  <TableCell align="right">{email}</TableCell>
                  <TableCell align="right">{country}</TableCell>
                  <TableCell align="right">{vip ? "YES" : "NO"}</TableCell>
                  <TableCell align="right">{modified}</TableCell>
                  <TableCell align="right">{active ? "YES" : "NO"}</TableCell>
                  <TableCell align="right">
                    <ButtonGroup
                      variant="outlined"
                      aria-label="outlined button group"
                    >
                      <Button
                        onClick={() =>
                          onDeleteBtnClick(id, first_name, last_name, active)
                        }
                        color={active ? "error" : "info"}
                      >
                        {active ? "Disable" : "Enable"}
                      </Button>
                      <Button>Edit</Button>
                    </ButtonGroup>
                  </TableCell>
                </TableRow>
              )
            )}
          </TableBody>
        </Table>
        <ConfirmDialog ref={confirmDialogRef}>
          {(data: any) => (
            <>
              Are you sure you want to {data?.active ? "disable" : "enable"}{" "}
              {`${data?.last_name} ${data?.first_name}`}?
              <Grid
                xs={12}
                container
                direction="row"
                justifyContent="flex-end"
                spacing={8}
                sx={{ marginTop: 0 }}
              >
                {(() => {
                  if (deleteIsLoading) return <CircularProgress />;

                  return (
                    <>
                      <Grid item lg={3} xs={12}>
                        <Button
                          color="error"
                          variant="outlined"
                          onClick={onConfirmDeletePeople}
                        >
                          YES
                        </Button>
                      </Grid>
                      <Grid item lg={3} xs={12}>
                        <Button
                          variant="outlined"
                          onClick={confirmDialogRef?.current?.close}
                        >
                          NO
                        </Button>
                      </Grid>
                    </>
                  );
                })()}
              </Grid>
            </>
          )}
        </ConfirmDialog>
      </TableContainer>
    </ClientOnly>
  );
};
export default PeopleTable;
