import { User } from "../../types/User";
import UserDeleteButton from "./UserDeleteButton";

interface UserItemProps {
  user: User;
}

function UserItem(props: UserItemProps) {
  const { user } = props;
  return (
    <div>
      ID: {user.id} Name: {user.name}
      <UserDeleteButton userId={user.id} userName={user.name} />
    </div>
  );
}

export default UserItem;
