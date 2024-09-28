import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isAdmin"); // Remove admin status from local storage
    navigate("/loginforadminacess"); // Redirect to login page
  };

  return (
    <button onClick={handleLogout} className="submit-button-login">Logout</button>
  );
};

export default Logout;
