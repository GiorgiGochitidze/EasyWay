import { useToken } from "../../Hooks/TokenContext";
import Card from "./Card";
import "./CSS/UserProfile.css";

const UserProfile = () => {
  const { decoded } = useToken();

  return (
    <div className="profile-container">
      <div className="profile-upperPart">
        <p>გამარჯობა: {decoded?.userName}</p>
        <p>პროფილი</p>
      </div>

      <div className="profile-card-part">
        <Card />
      </div>
    </div>
  );
};

export default UserProfile;
