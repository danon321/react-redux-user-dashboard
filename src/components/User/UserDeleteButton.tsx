import { useState } from "react";

import { Box, Button, ButtonGroup, Modal } from "@mui/material";
import { useAppDispatch } from "../../store/hooks";
import { deleteUser } from "../../store/user/userSlice";

interface UserDeleteButtonProps {
  userId: number;
  userName: string;
}

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

function UserDeleteButton(props: UserDeleteButtonProps) {
  const { userId, userName } = props;
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const deleteUserHandler = () => {
    dispatch(deleteUser(userId));
  };

  return (
    <>
      <Button onClick={handleOpen} variant="contained" color="error">
        Delete
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 400 }}>
          <h2 id="parent-modal-title">Delete user</h2>
          <p id="parent-modal-description">Czy aby na pewno chcesz usunąć użytwkonika {userName}</p>

          <ButtonGroup disableElevation variant="contained" aria-label="Disabled elevation buttons">
            <Button variant="contained" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="contained" color="error" onClick={deleteUserHandler}>
              Delete
            </Button>
          </ButtonGroup>
        </Box>
      </Modal>
    </>
  );
}

export default UserDeleteButton;
