import { useState } from "react";
import { useAppSelector } from "../store/hooks";
import { getUserState } from "../store/user/userSlice";
import { User } from "../types/User";

function useNewUserId() {
  const [id, setId] = useState<number>(0);
  const { users } = useAppSelector(getUserState);

  users.forEach((user: User) => {
    if (user.id > id) setId(user.id);
  });

  return id + 1;
}

export default useNewUserId;
