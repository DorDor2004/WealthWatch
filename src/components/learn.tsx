import { Link } from "react-router-dom";
import CreditLogo from "../assets/images/graphic-three-credit-cards-with-confetti.webp";
import InvestingLogo from "../assets/images/inv.jpg";
import SavingsLogo from "../assets/images/piggy.jpg";
import BudgetingLogo from "../assets/images/budgeting.png";
import "../learn.css";

function Learn() {
  return (
    <>
      <h2>What would you like to learn about today?</h2>

      <div className="learn-logo">
        <Link to="/credit">
          <img src={CreditLogo} alt="Credit image" />
          <h3>Credit</h3>
        </Link>
        <Link to="/investing">
          <img src={InvestingLogo} alt="Investing" />
          <h3>Investing</h3>
        </Link>
        <Link to="/savings">
          <img src={SavingsLogo} alt="Savings" />
          <h3>Savings</h3>
        </Link>
        <Link to="/budgeting">
          <img src={BudgetingLogo} alt="Budgeting" />
          <h3>Budgeting</h3>
        </Link>
      </div>
    </>
  );
}

export default Learn;
