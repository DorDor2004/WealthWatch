import logo from "../assets/images/potential-logo-1-removebg-preview.png";

function Header() {
  return (
    <>
      <div className="header-container">
        <a href="/" className="header-link">
          <img src={logo} alt="WealthWatch Logo" className="logo" />
          <h1>WealthWatch</h1>
        </a>
      </div>
      <div className="topnav">
        <a href="learn">Learn</a>
        <a href="budget">Budget</a>
        <a href="calculators">Calculators</a>
        <a href="stocks">Stocks</a>
      </div>
    </>
  );
}

export default Header;
