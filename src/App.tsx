import React, { useState } from "react";
import Navbar from "./components/NavBar";
import PostsList from "./components/PostsList";
import LoginForm from "./components/LoginForm";
import LandingPage from "./components/LandingPage";
import "./styles/NavBar.css";
import Swal from "sweetalert2";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentComponent, setCurrentComponent] = useState(<LandingPage />);
  const [userId, setUserId] = useState<number>(0);

  const handleLoginFormSubmit = (userData: {
    username: string;
    password: string;
    userId: number;
  }) => {
    const { username, password, userId } = userData;
    setIsLoggedIn(true);
    setUserId(userId);
    console.log(
      "Submitted with ",
      "username:",
      username,
      "password:",
      password,
      "user",
      userId
    );
    setCurrentComponent(<PostsList userId={userId} />);
  };

  const handleLoginClick = () => {
    setCurrentComponent(<LoginForm onSubmit={handleLoginFormSubmit} />);
  };

  const handleLogoutClick = () => {
    setIsLoggedIn(false);
    setCurrentComponent(<LoginForm onSubmit={handleLoginFormSubmit} />);
  };

  const handlePostsClick = () => {
    if (isLoggedIn) {
      setCurrentComponent(<PostsList userId={userId} />);
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Es necesario hacer el Login',
      });
    }
  };

  const handleHomeClick = () => {
    setCurrentComponent(<LandingPage />);
  };

  return (
    <>
      <div>
        <Navbar
          isLoggedIn={isLoggedIn}
          onLoginClick={isLoggedIn ? handleLogoutClick : handleLoginClick}
          onPostsClick={handlePostsClick}
          onHomeClick={handleHomeClick}
        />
      </div>
      {currentComponent}
    </>
  );
}

export default App;
