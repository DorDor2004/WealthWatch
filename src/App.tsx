import Header from "./components/header";
import Calculators from "./components/calculators";
import Budgeting from "./components/budgeting";
import Learn from "./components/learn";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Savings from "./components/savings";
import Credit from "./components/credit";
import Investing from "./components/investing";
import StockWidget from "./components/stocks";
import HomePage from "./components/home";
import BudgetingPage from "./components/budget";

function App() {
  return (
    <Router>
      <div>
        <Header />
      </div>
      <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/calculators" element={<Calculators />} />
          <Route path="/learn" element={<Learn />} />
          <Route path="/budgeting" element={<Budgeting />} />
          <Route path="/savings" element={<Savings />} />
          <Route path="/credit" element={<Credit />} />
          <Route path="/investing" element={<Investing />} />
          <Route path="/stocks" element={<StockWidget />} />
          <Route path="/budget" element={<BudgetingPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
