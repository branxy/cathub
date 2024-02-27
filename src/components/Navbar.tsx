import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();

  function isActive(path: string) {
    return location.pathname === path;
  }
  return (
    <nav className="menu">
      <Link to={"/"} className={isActive("/") ? "active" : ""}>
        Все котики
      </Link>
      <Link
        to={"/favorites"}
        className={isActive("/favorites") ? "active" : ""}
      >
        Любимые котики
      </Link>
    </nav>
  );
}

export default Navbar;
