import { useState } from "react";

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await fetch("https://dummyjson.com/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });
      if (!response.ok) {
        // Handle unsuccessful login (e.g., show an error message)
        console.error("Login failed");
        return;
      }
      const data = await response.json();

      // assuming the server returns a token upon successful login
      const authToken = data.token;
      // Save the token to localstorage
      localStorage.setItem("authToken", authToken);
      // call onLogin with actual token
      onLogin(authToken);
    } catch (error) {
      console.error("Error during login", error);
    }
  };

  return (
    <>
      <div className="login-container">
        <div className="login-wrapper">
          <h2 className="text-center mb-2">Login</h2>

          <div>
            <label htmlFor="username">Username:</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <button className="submit-btn" onClick={handleLogin}>
              Login
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
