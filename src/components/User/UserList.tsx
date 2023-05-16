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

  return (
    <div>
      {users.map((user) => (
        <div key={user.id}>
          Id: {user.id} Name: {user.name}
        </div>
      ))}
    </div>
  );
}

export default UserList;
