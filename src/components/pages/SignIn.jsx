import { useContext, useState } from "react";
import { AuthContext } from "../Auth/AuthProvider";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";


function SignIn() {
  const { login, googleUser } = useContext(AuthContext);
  const [success, setSuccess] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [notification, setNotification] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();

  const from = location.state?.from?.pathname || "/tasks";

  const handleSignIn = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    login(email, password)
      .then((result) => {
        const user = result.user;
        setSuccess(true);
        setNotification({ type: "success", message: "Sign up successful!" });
        console.log(user);
        navigate(from, { replace: true });
      })
      .catch((error) => {
        setNotification({ type: "error", message: "Login Failed! Try again" });
        console.log(error);
      });
  };

  const signInWithGoogle = () => {
    googleUser()
      .then((result) => {
        const user = result.user;
        setSuccess(true);
        console.log(user);
        setNotification({ type: "success", message: "Sign up successful!" });
        navigate(from, { replace: true });
      })
      .catch((error) => {
        setNotification({ type: "error", message: "Error! Try again" });
        console.log(error);
      });
    console.log(success);
  };
  const clearNotification = () => {
    setNotification(null);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-80">
        <h2 className="text-2xl font-bold mb-6 text-center">Signin</h2>
        <form onSubmit={handleSignIn}>
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
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            Signin
          </button>
        </form>
        <div className="text-center">
          <p className="text-sm text-gray-600">
            New user?{" "}
            <Link to="/register" className="font-medium text-[#2b5838] ">
              Sign up
            </Link>
          </p>
          <button
            className="w-full flex items-center justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium bg-[#a3cede] mb-4"
            onClick={signInWithGoogle}
          >
            <FcGoogle className=" text-2xl mx-[10px]" />
            Continue With Google
          </button>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
