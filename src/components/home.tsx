import "../homepage.css";
import StockLogo from "../assets/images/stock.jpg";
import BudgetLogo from "../assets/images/budget.png";
import CalculatorLogo from "../assets/images/calculator.jpg";
import LearnLogo from "../assets/images/learn.webp";

function HomePage() {
  return (
    <div className="homepage-container">
      <div className="welcome-message">
        <h1>Welcome to WealthWatch</h1>
        <p>
          Your one-stop destination for managing your wealth and staying
          financially informed.
        </p>
      </div>

      <div className="component-links">
        <a href="/learn" className="component-link">
          <img src={LearnLogo} alt="Learn" />
          <h2>Learn</h2>
        </a>
        <a href="/budget" className="component-link">
          <img src={BudgetLogo} alt="Budget" />
          <h2>Budget</h2>
        </a>
        <a href="/calculators" className="component-link">
          <img src={CalculatorLogo} alt="Calculators" />
          <h2>Calculators</h2>
        </a>
        <a href="/stock" className="component-link">
          <img src={StockLogo} alt="Stock" />
          <h2>Stock</h2>
        </a>
      </div>

      <div className="additional-section">
        <p>
          Explore our tools and resources to gain better financial awareness and
          control over your future.
        </p>
      </div>
    </div>
  );
}

export default HomePage;
