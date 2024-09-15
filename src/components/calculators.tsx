import React, { useState } from "react";
import "../calculators.css";

const Calculators: React.FC = () => {
  const [investmentResult, setInvestmentResult] = useState<string>("");
  const [savingsGoalResult, setSavingsGoalResult] = useState<string>("");
  const [loanResult, setLoanResult] = useState<string>("");

  const calculateInvestment = () => {
    const initialInvestment = parseFloat(
      (document.getElementById("initialInvestment") as HTMLInputElement).value
    );
    const monthlyContribution = parseFloat(
      (document.getElementById("monthlyContribution") as HTMLInputElement).value
    );
    const years = parseInt(
      (document.getElementById("years") as HTMLInputElement).value
    );
    const rateOfReturn =
      parseFloat(
        (document.getElementById("rateOfReturn") as HTMLInputElement).value
      ) /
      100 /
      12;

    if (
      isNaN(initialInvestment) ||
      isNaN(monthlyContribution) ||
      isNaN(years) ||
      isNaN(rateOfReturn)
    ) {
      setInvestmentResult("Please enter valid numbers for all fields.");
      return;
    }

    const months = years * 12;
    let futureValue = initialInvestment * Math.pow(1 + rateOfReturn, months);
    for (let i = 1; i <= months; i++) {
      futureValue +=
        monthlyContribution * Math.pow(1 + rateOfReturn, months - i);
    }

    setInvestmentResult(
      `The future value of your investment is $${futureValue.toFixed(2)}.`
    );
  };

  const calculateSavingsGoal = () => {
    const goalAmount = parseFloat(
      (document.getElementById("goalAmount") as HTMLInputElement).value
    );
    const initialSavings = parseFloat(
      (document.getElementById("initialSavings") as HTMLInputElement).value
    );
    const goalYears = parseInt(
      (document.getElementById("goalYears") as HTMLInputElement).value
    );

    if (isNaN(goalAmount) || isNaN(initialSavings) || isNaN(goalYears)) {
      setSavingsGoalResult("Please enter valid numbers for all fields.");
      return;
    }

    const months = goalYears * 12;
    const requiredSavings = goalAmount - initialSavings;
    const monthlySavings = requiredSavings / months;

    setSavingsGoalResult(
      `You need to save $${monthlySavings.toFixed(
        2
      )} per month to reach your goal of $${goalAmount.toFixed(
        2
      )} in ${goalYears} years.`
    );
  };

  const calculateLoan = () => {
    const loanAmount = parseFloat(
      (document.getElementById("loanAmount") as HTMLInputElement).value
    );
    const downPayment = parseFloat(
      (document.getElementById("downPayment") as HTMLInputElement).value
    );
    const loanTerm = parseInt(
      (document.getElementById("loanTerm") as HTMLInputElement).value
    );
    const interestRate =
      parseFloat(
        (document.getElementById("interestRate") as HTMLInputElement).value
      ) /
      100 /
      12;

    if (
      isNaN(loanAmount) ||
      isNaN(downPayment) ||
      isNaN(loanTerm) ||
      isNaN(interestRate)
    ) {
      setLoanResult("Please enter valid numbers for all fields.");
      return;
    }

    const financedAmount = loanAmount - downPayment;
    const numberOfPayments = loanTerm * 12;
    const monthlyPayment =
      (financedAmount * interestRate) /
      (1 - Math.pow(1 + interestRate, -numberOfPayments));
    const totalPayment = monthlyPayment * numberOfPayments;
    const totalInterest = totalPayment - financedAmount;

    setLoanResult(`
      Monthly Payment: $${monthlyPayment.toFixed(2)}<br>
      Total Payment: $${totalPayment.toFixed(2)}<br>
      Total Interest: $${totalInterest.toFixed(2)}
    `);
  };

  return (
    <>
      <div className="container">
        <div className="calculator">
          <h2>Investment Calculator</h2>
          <label htmlFor="initialInvestment">Initial Investment ($):</label>
          <input
            type="number"
            id="initialInvestment"
            step="100"
            placeholder="Enter your initial investment"
          />

          <label htmlFor="monthlyContribution">Monthly Contribution ($):</label>
          <input
            type="number"
            id="monthlyContribution"
            step="100"
            placeholder="Enter your monthly contribution"
          />

          <label htmlFor="years">Number of Years:</label>
          <input
            type="number"
            id="years"
            placeholder="Enter the number of years"
          />

          <label htmlFor="rateOfReturn">Annual Rate of Return (%):</label>
          <input
            type="number"
            id="rateOfReturn"
            step="0.10"
            placeholder="Enter the annual rate of return"
          />

          <button onClick={calculateInvestment}>Calculate Investment</button>
          <div
            className="result"
            dangerouslySetInnerHTML={{ __html: investmentResult }}
          />
        </div>

        <div className="calculator">
          <h2>Savings Goal Calculator</h2>
          <label htmlFor="goalAmount">Savings Goal Amount ($):</label>
          <input
            type="number"
            id="goalAmount"
            step="100"
            placeholder="Enter your savings goal amount"
          />

          <label htmlFor="initialSavings">Initial Savings ($):</label>
          <input
            type="number"
            id="initialSavings"
            step="100"
            placeholder="Enter your initial savings"
          />

          <label htmlFor="goalYears">Number of Years to Save:</label>
          <input
            type="number"
            id="goalYears"
            placeholder="Enter the number of years"
          />

          <button onClick={calculateSavingsGoal}>Calculate Savings Goal</button>
          <div
            className="result"
            dangerouslySetInnerHTML={{ __html: savingsGoalResult }}
          />
        </div>

        <div className="calculator">
          <h2>Auto Loan Calculator</h2>
          <label htmlFor="loanAmount">Loan Amount ($):</label>
          <input
            type="number"
            id="loanAmount"
            step="100"
            placeholder="Enter your loan amount"
          />

          <label htmlFor="downPayment">Down Payment ($):</label>
          <input
            type="number"
            id="downPayment"
            step="100"
            placeholder="Enter your down payment"
          />

          <label htmlFor="loanTerm">Loan Term (years):</label>
          <input
            type="number"
            id="loanTerm"
            placeholder="Enter the loan term in years"
          />

          <label htmlFor="interestRate">Annual Interest Rate (%):</label>
          <input
            type="number"
            id="interestRate"
            step="0.10"
            placeholder="Enter the annual interest rate"
          />

          <button onClick={calculateLoan}>Calculate Loan</button>
          <div
            className="result"
            dangerouslySetInnerHTML={{ __html: loanResult }}
          />
        </div>
      </div>
    </>
  );
};

export default Calculators;
