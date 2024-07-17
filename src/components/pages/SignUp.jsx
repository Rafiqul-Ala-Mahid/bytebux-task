import { useContext, useState } from "react";
import { AuthContext } from "../Auth/AuthProvider";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

function SignUp() {
  const { createUser, googleUser } = useContext(AuthContext);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [notification, setNotification] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  const from = location.state?.from?.pathname || "/tasks";

  const handleSignUp = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    if (password !== confirmPassword) {
      setNotification({ type: "error", message: "Passwords do not match" });
      return;
    }
    if (password.length < 6) {
      setNotification({
        type: "error",
        message: "Passwords must be at least 6 characters",
      });
      return;
    }
    console.log(email, fullName, password);
    setFullName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    createUser(email, password)
      .then((result) => {
        const user = result.user;
        setNotification({ type: "success", message: "Sign up successful!" });
        console.log(user);
        navigate(from, { replace: true });
      })
      .catch((err) => {
        setNotification({ type: "error", message: "Error! Try again" });
        console.error(err);
      });
  };
  const handleWithGoogle = () => {
    googleUser()
      .then((result) => {
        console.log(result.user);
        setNotification({ type: "success", message: "Sign up successful!" });
        navigate(from, { replace: true });
      })
      .catch((error) => {
        setNotification({ type: "error", message: "Error! Try again" });
        console.log(error);
      });
  };
  const clearNotification = () => {
    setNotification(null);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-80">
        <h2 className="text-2xl font-bold mb-6 text-center">Signup</h2>
        <form onSubmit={handleSignUp}>
          {notification && (
            <div
              className={`py-2 px-4 ${
                notification.type === "success" ? "bg-green-500" : "bg-red-500"
              } text-white mt-4`}
            >
              {notification.message}
              <button className="float-right" onClick={clearNotification}>
                X
              </button>
            </div>
          )}
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              className="w-full px-3 py-2 border rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              className="w-full px-3 py-2 border rounded"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Confirm Password</label>
            <input
              type="password"
              className="w-full px-3 py-2 border rounded"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            Signup
          </button>
        </form>
        <div className="text-center lg:text-left">
          <p className="text-sm text-gray-600">
            Already have an account?
            <Link to="/login" className="font-medium text-[#2b4858]">
              Log in
            </Link>
          </p>
        </div>
        <button
          className="w-full flex items-center justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium bg-[#a3cede] mb-4"
          onClick={handleWithGoogle}
        >
          <FcGoogle className=" text-2xl mx-[10px]" />
          Continue With Google
        </button>
      </div>
    </div>
  );
}

export default SignUp;
