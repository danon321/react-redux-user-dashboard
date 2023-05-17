import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getUsers } from "../../store/user/api/getUsers";
import { getUserState } from "../../store/user/userSlice";

import { UserLoadStatus } from "../../types/User";

import UserTableRow from "./UserTableRow";

import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

function UserTable() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { users, error, status } = useAppSelector(getUserState);

  useEffect(() => {
    if (status === UserLoadStatus.idle) dispatch(getUsers());
  }, []);

  if (status === UserLoadStatus.failed) return <div>{error}</div>;

  if (status === UserLoadStatus.loading) return <div>Loading data...</div>;

  return (
    <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
      <TableContainer component={Paper} style={{ maxWidth: 1000 }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Typography sx={{ flex: "1 1 100%" }} variant="h6" id="tableTitle" component="div">
            Users
          </Typography>
          <Button
            onClick={() => navigate("/add-user")}
            variant="contained"
            style={{ whiteSpace: "nowrap" }}
          >
            Add user
          </Button>
        </div>
        <Table sx={{ maxWidth: 1000 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>City</TableCell>
              <TableCell>Edit</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <UserTableRow key={user.id} user={user} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default UserTable;
