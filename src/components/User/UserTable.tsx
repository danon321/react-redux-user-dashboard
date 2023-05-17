import { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getUsers } from "../../store/user/api/getUsers";
import { getUserState } from "../../store/user/userSlice";
import { UserLoadStatus } from "../../types/User";

import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import UserDeleteButton from "./UserDeleteButton";

function UserTable() {
  const dispatch = useAppDispatch();
  const { users, error, status } = useAppSelector(getUserState);

  useEffect(() => {
    if (status === UserLoadStatus.idle) dispatch(getUsers());
  }, []);

  if (status === UserLoadStatus.failed) return <div>{error}</div>;

  if (status === UserLoadStatus.loading) return <div>Loading data...</div>;

  return (
    <TableContainer component={Paper}>
      <Table sx={{ maxWidth: 750 }} aria-label="simple table">
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
            <TableRow key={user.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
              <TableCell>{user.id}</TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.username}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.address.city}</TableCell>
              <TableCell>Edit</TableCell>
              <TableCell>
                <UserDeleteButton userId={user.id} userName={user.name} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default UserTable;
