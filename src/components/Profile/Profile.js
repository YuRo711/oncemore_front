import { useContext } from "react";
import "./Profile.css";
import { UserContext } from "../../contexts/UserContext";
import { useSearchParams } from "react-router-dom";

export default function Profile(props) {
  const searchParams = useSearchParams();
  const id = searchParams[0].get("id");
  const isMe = useContext(UserContext).user.id == id;

  return (
    <main className="profile">
      
    </main>
  );
}