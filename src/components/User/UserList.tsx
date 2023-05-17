import { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getUsers } from "../../store/user/api/getUsers";
import { getUserState } from "../../store/user/userSlice";
import { UserLoadStatus } from "../../types/User";
import UserItem from "./UserItem";

function UserList() {
  const dispatch = useAppDispatch();
  const { users, error, status } = useAppSelector(getUserState);

  useEffect(() => {
    if (status === UserLoadStatus.idle) dispatch(getUsers());
  }, []);

  if (status === UserLoadStatus.failed) return <div>{error}</div>;

  if (status === UserLoadStatus.loading) return <div>Loading data...</div>;

  return (
    <div>
      {users.map((user) => (
        <UserItem key={user.id} user={user} />
      ))}
    </div>
  );
}

export default UserList;
