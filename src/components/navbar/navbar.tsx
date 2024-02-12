import Logo from "../../assets/logo.png";
import style from "./navbar.module.css";

function NavBar() {
  return (
    <div className={style.navbar}>
      <img src={Logo} height={50} />
      <h1>Plant Nanny</h1>
    </div>
  );
}

export default NavBar;
