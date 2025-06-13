import axios from "axios";
import { useNavigate } from "react-router-dom";
import { PiShoppingCartDuotone } from "react-icons/pi";

function Login() {
  const navigate = useNavigate();
  if (localStorage.getItem("token")) {
    return navigate("/");
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    let user = {
      username: e.target[0].value,
      password: e.target[1].value,
    };
    let res = await axios.post(
      "https://nt-shopping-list.onrender.com/api/auth",
      user
    );
    localStorage.setItem("token", res.data.token);
    console.log(res);
    if (res.status == 200) {
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-7xl bg-white rounded-lg shadow-lg flex overflow-hidden">
        <div className="w-1/2 bg-gray-900 text-white flex flex-col items-center justify-center p-10">
          <div className="text-blue-500 text-6xl mb-4">
          <PiShoppingCartDuotone />

          </div>
          <p className="text-lg mb-2">Welcome back to</p>
          <h1 className="text-4xl font-bold">Shopping List</h1>
        </div>

        <div className="w-1/2 p-10">
          <h2 className="text-3xl font-semibold text-center text-blue-600 mb-6">
            Sign In
          </h2>
          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-1">Username</label>
              <input
                type="text"
                placeholder="username"
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-400"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Password</label>
              <input
                type="password"
                placeholder="*******"
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-400"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-full hover:bg-blue-700 transition"
            >
              Sign In
            </button>
          </form>
          <p className="mt-4 text-center text-sm text-gray-600">
            No account yet?{" "}
            <span className="text-blue-600 underline cursor-pointer">
              Create One.
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
