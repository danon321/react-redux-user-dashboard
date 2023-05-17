import { TableCell, TableRow, Input } from "@mui/material";
import { User } from "../../types/User";
import { useRef, useState } from "react";
import UserDeleteButton from "./UserDeleteButton";
import UserEditButton from "./UserEditButton";

interface UserTableRowProps {
  user: User;
}

interface editedFields {
  name: string;
  username: string;
  email: string;
  address: {
    city: string;
  };
}

function UserTableRow(props: UserTableRowProps) {
  const [editMode, setEditMode] = useState<boolean>(false);
  const { user } = props;

  const nameRef = useRef<HTMLInputElement>(null);
  const usernameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const cityRef = useRef<HTMLInputElement>(null);

  const onSaveEditHandler = () => {
    const newName = nameRef.current!.value || user.name;
    const newUsername = usernameRef.current?.value || user.username;
    const newEmail = emailRef.current?.value || user.email;
    const newCity = cityRef.current?.value || user.address.city;

    const updatedUserObject: editedFields = {
      name: newName,
      username: newUsername,
      email: newEmail,
      address: { ...user.address, city: newCity },
    };

    return { ...user, ...updatedUserObject } as User;
  };

  return (
    <TableRow key={user.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
      <TableCell>{user.id}</TableCell>
      <TableCell>
        {!editMode ? (
          user.name
        ) : (
          <Input inputRef={nameRef} name="name" type="text" defaultValue={user.name} />
        )}
      </TableCell>
      <TableCell>
        {!editMode ? (
          user.username
        ) : (
          <Input inputRef={usernameRef} name="username" type="text" defaultValue={user.username} />
        )}
      </TableCell>
      <TableCell>
        {!editMode ? (
          user.email
        ) : (
          <Input inputRef={emailRef} name="email" type="text" defaultValue={user.email} />
        )}
      </TableCell>
      <TableCell>
        {!editMode ? (
          user.address.city
        ) : (
          <Input inputRef={cityRef} name="city" type="text" defaultValue={user.address.city} />
        )}
      </TableCell>
      <TableCell>
        <UserEditButton editMode={editMode} setEditMode={setEditMode} onSave={onSaveEditHandler} />
      </TableCell>
      <TableCell>
        <UserDeleteButton userId={user.id} userName={user.name} />
      </TableCell>
    </TableRow>
  );
}

export default UserTableRow;
