import { Button, ButtonGroup } from "@mui/material";
import { useAppDispatch } from "../../store/hooks";
import { updateUser } from "../../store/user/userSlice";
import { User } from "../../types/User";

interface UserEditButtonProps {
  editMode: boolean;
  setEditMode: (value: boolean | ((prevVar: boolean) => boolean)) => void;
  onSave: () => User;
}

function UserEditButton(props: UserEditButtonProps) {
  const { editMode, setEditMode, onSave } = props;
  const dispatch = useAppDispatch();

  const toggleEditModeHandler = () => {
    setEditMode((prevState: boolean) => !prevState);
  };

  const saveChangesHandler = () => {
    dispatch(updateUser(onSave()));
    toggleEditModeHandler();
  };

  if (editMode)
    return (
      <ButtonGroup disableElevation variant="contained">
        <Button onClick={toggleEditModeHandler}>Close</Button>
        <Button color="success" onClick={saveChangesHandler}>
          Save
        </Button>
      </ButtonGroup>
    );

  return (
    <Button variant="outlined" onClick={toggleEditModeHandler}>
      Edit
    </Button>
  );
}

export default UserEditButton;
