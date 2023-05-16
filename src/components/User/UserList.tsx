import { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getUsers } from "../../store/user/api/getUsers";
import { getUserState } from "../../store/user/userSlice";

function UserList() {
  const dispatch = useAppDispatch();
  const { users, error, status } = useAppSelector(getUserState);

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  return <div>{status}</div>;
}

export default UserList;
