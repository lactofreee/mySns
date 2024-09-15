import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/firebase.ts";

const useLogOut = () => {
  const navigate = useNavigate();
  const onLogOut = async () => {
    const confirmLogOut = confirm("Are you sure you want to log out?");
    if (confirmLogOut) {
      await auth.signOut();
      navigate("/login");
    }
  };
  return { onLogOut };
};

export default useLogOut;
