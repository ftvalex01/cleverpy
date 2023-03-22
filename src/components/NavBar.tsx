import "../styles/NavBar.css";

interface NavbarProps {
  isLoggedIn: boolean;
  onLoginClick: () => void;
  onPostsClick: () => void;
  onHomeClick: () => void;
}

function Navbar(props: NavbarProps) {
  const { isLoggedIn, onLoginClick, onPostsClick, onHomeClick } = props;

  return (
    <nav className="navbar">
      <div>
        <button onClick={onHomeClick}>Home</button>
      </div>
      <div>
            <button onClick={onPostsClick}>Posts</button>
          </div>
      {isLoggedIn && (
        <>
          

          <div>
            <button onClick={onLoginClick}>Logout</button>
          </div>
        </>
      )}
      {!isLoggedIn && (
        <>
          <div>
            <button onClick={onLoginClick}>Login</button>
          </div>
        </>
      )}
    </nav>
  );
}

export default Navbar;
