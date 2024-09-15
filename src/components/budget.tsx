import React, { useState, useEffect, ReactNode } from "react";
import "../budget.css";

interface Funds {
  [key: string]: number;
}

interface Transaction {
  title: ReactNode;
  time: ReactNode;
  category: string;
  amount: number;
  date: string;
}

type TransactionKey = keyof Transaction;

const BudgetingPage = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const [allocatedFunds, setAllocatedFunds] = useState<Funds>({});
  const [remainingFunds, setRemainingFunds] = useState<Funds>({});
  const [spentFunds, setSpentFunds] = useState<Funds>({});
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [monthlyIncome, setMonthlyIncome] = useState(0);
  const [totalAllocated, setTotalAllocated] = useState(0);
  const [allocationFinalized, setAllocationFinalized] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [expenseTitle, setExpenseTitle] = useState("");
  const [expenseAmount, setExpenseAmount] = useState("");
  const [expenseCategory, setExpenseCategory] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [incomeEditable, setIncomeEditable] = useState(false); // Set to false initially
  const [showCategoryInput, setShowCategoryInput] = useState(false);
  const [currentSort, setCurrentSort] = useState({ key: "", order: "asc" });

  useEffect(() => {
    loadBudget();
    const interval = setInterval(autoSaveBudget, 60000); // Auto-save every minute
    return () => clearInterval(interval); // Cleanup on component unmount
  }, []);

  // Show category input
  const handleShowCategoryInput = () => {
    setShowCategoryInput(true);
  };

  // Add category
  const addCategory = () => {
    if (newCategory.trim() && !categories.includes(newCategory.trim())) {
      const trimmedCategory = newCategory.trim();
      setCategories([...categories, trimmedCategory]);
      setAllocatedFunds({ ...allocatedFunds, [trimmedCategory]: 0 });
      setRemainingFunds({ ...remainingFunds, [trimmedCategory]: 0 });
      setSpentFunds({ ...spentFunds, [trimmedCategory]: 0 });
      setNewCategory("");
    }
  };

  // Remove category
  const removeCategory = (category: string) => {
    setCategories(categories.filter((cat) => cat !== category));

    const newAllocatedFunds = { ...allocatedFunds };
    const newRemainingFunds = { ...remainingFunds };
    const newSpentFunds = { ...spentFunds };

    delete newAllocatedFunds[category];
    delete newRemainingFunds[category];
    delete newSpentFunds[category];

    setAllocatedFunds(newAllocatedFunds);
    setRemainingFunds(newRemainingFunds);
    setSpentFunds(newSpentFunds);

    setTransactions(
      transactions.filter((transaction) => transaction.category !== category)
    );
  };

  // Finalize allocation
  const finalizeAllocation = () => {
    let total = 0;
    const newAllocatedFunds = { ...allocatedFunds };
    const newRemainingFunds = { ...remainingFunds };

    categories.forEach((category) => {
      const element = document.getElementById(
        `allocation_${category}`
      ) as HTMLInputElement | null;

      if (element && element.value) {
        const value = parseFloat(element.value);
        if (!isNaN(value) && value > 0) {
          total += value;
          newAllocatedFunds[category] = value;
          newRemainingFunds[category] = value - (spentFunds[category] || 0);
        } else {
          alert(
            "Allocation value for each category must be a positive number."
          );
          return;
        }
      } else {
        alert(`Unable to find the allocation input for category: ${category}`);
        return;
      }
    });

    if (total > monthlyIncome) {
      alert("Total allocation exceeds monthly income!");
    } else if (total < monthlyIncome) {
      alert("Total allocated funds must equal the monthly income!");
    } else {
      setAllocatedFunds(newAllocatedFunds);
      setRemainingFunds(newRemainingFunds);
      setAllocationFinalized(true);
    }
  };

  // Update allocation
  const updateAllocation = (category: string, value: string) => {
    setAllocatedFunds({ ...allocatedFunds, [category]: parseFloat(value) });
  };

  // Add expense
  const addExpense = () => {
    const expenseAmountNum = parseFloat(expenseAmount);
    if (
      !isNaN(expenseAmountNum) &&
      expenseAmountNum <= remainingFunds[expenseCategory] &&
      expenseAmountNum > 0
    ) {
      const newTransaction = {
        title: expenseTitle,
        category: expenseCategory,
        amount: expenseAmountNum,
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString(),
      };

      setTransactions([...transactions, newTransaction]);
      const newRemainingFunds = { ...remainingFunds };
      newRemainingFunds[expenseCategory] -= expenseAmountNum;
      setRemainingFunds(newRemainingFunds);
      setSpentFunds({
        ...spentFunds,
        [expenseCategory]:
          (spentFunds[expenseCategory] || 0) + expenseAmountNum,
      });

      setExpenseTitle("");
      setExpenseAmount("");
      renderTransactionLog();
    } else {
      alert("Invalid expense amount or exceeds remaining funds.");
    }
  };

  // Save budget to localStorage
  const saveBudget = () => {
    const budgetData = {
      categories,
      allocatedFunds,
      remainingFunds,
      spentFunds,
      transactions,
      totalAllocated,
      allocationFinalized,
      monthlyIncome,
    };
    localStorage.setItem("budgetData", JSON.stringify(budgetData));
    alert("Data saved successfully!");
  };

  // Load budget from localStorage
  const loadBudget = () => {
    const budgetData = JSON.parse(localStorage.getItem("budgetData") || "{}");

    if (budgetData && Object.keys(budgetData).length > 0) {
      setCategories(budgetData.categories || []);
      setAllocatedFunds(budgetData.allocatedFunds || {});
      setRemainingFunds(budgetData.remainingFunds || {});
      setSpentFunds(budgetData.spentFunds || {});
      setTransactions(budgetData.transactions || []);
      setTotalAllocated(budgetData.totalAllocated || 0);
      setAllocationFinalized(budgetData.allocationFinalized || false);
      setMonthlyIncome(budgetData.monthlyIncome || 0);
    }
  };

  // Auto-save budget to localStorage every minute
  const autoSaveBudget = () => {
    const budgetData = {
      categories,
      allocatedFunds,
      remainingFunds,
      spentFunds,
      transactions,
      totalAllocated,
      allocationFinalized,
      monthlyIncome,
    };
    localStorage.setItem("budgetData", JSON.stringify(budgetData));
    console.log("Data auto-saved");
  };

  // Reset budget
  const resetBudget = () => {
    if (
      window.confirm(
        "Are you sure you want to reset your budget? This action cannot be undone."
      )
    ) {
      localStorage.removeItem("budgetData");
      setCategories([]);
      setAllocatedFunds({});
      setRemainingFunds({});
      setSpentFunds({});
      setTransactions([]);
      setTotalAllocated(0);
      setAllocationFinalized(false);
      setMonthlyIncome(0);
      setIncomeEditable(true); // Re-enable editing of monthly income
    }
  };

  // Reset allocation
  const resetAllocation = () => {
    if (
      window.confirm(
        "Are you sure you want to reset your allocation? This action will allow you to reallocate funds."
      )
    ) {
      setAllocationFinalized(false);
      setTotalAllocated(0);
      setRemainingFunds({ ...allocatedFunds });
    }
  };

  // Edit monthly income
  const editMonthlyIncome = () => {
    setIncomeEditable(true);
  };

  // Set monthly income
  const setMonthlyIncomeValue = () => {
    if (monthlyIncome > 0) {
      setIncomeEditable(false);
    } else {
      alert("Please enter a valid positive monthly income.");
    }
  };

  // Render category options
  const renderCategoryOptions = () => {
    return categories.map((category) => (
      <option key={category} value={category}>
        {category}
      </option>
    ));
  };

  // Render allocation section
  const renderAllocationSection = () => {
    return categories.map((category) => (
      <div key={category} className="category-row">
        <label htmlFor={`allocation_${category}`}>{category}:</label>
        <input
          type="number"
          id={`allocation_${category}`}
          placeholder="Allocate funds"
          value={allocatedFunds[category] || 0}
          onChange={(e) => updateAllocation(category, e.target.value)}
          disabled={allocationFinalized}
        />
        <div className="allocated" id={`allocated_${category}`}>
          Allocated: ${allocatedFunds[category]?.toFixed(2)}
        </div>
        <button
          className="remove-category"
          onClick={() => removeCategory(category)}
          disabled={allocationFinalized}
        >
          Remove
        </button>
      </div>
    ));
  };

  // Render remaining balance section
  const renderRemainingBalanceSection = () => {
    return categories.map((category) => (
      <div key={category} className="remaining-balance">
        <div>{category}</div>
        <div id={`remaining_${category}`}>
          Remaining: ${remainingFunds[category]?.toFixed(2)}
        </div>
      </div>
    ));
  };

  // Render transaction log
  const renderTransactionLog = (transactionsToRender = transactions) => {
    return transactionsToRender.map((transaction, index) => (
      <tr key={index}>
        <td>{transaction.date}</td>
        <td>{transaction.time}</td>
        <td>{transaction.title}</td>
        <td>{transaction.category}</td>
        <td>${transaction.amount.toFixed(2)}</td>
      </tr>
    ));
  };

  // Filter transaction log
  const filterTransactionLog = () => {
    const filteredTransactions = transactions.filter(
      (transaction) =>
        !filterCategory || transaction.category === filterCategory
    );
    return renderTransactionLog(filteredTransactions);
  };

  // Toggle sort order
  const toggleSort = (key: TransactionKey) => {
    const sortOrder =
      currentSort.key === key && currentSort.order === "asc" ? "desc" : "asc";
    setCurrentSort({ key, order: sortOrder });

    const sortedTransactions = [...transactions].sort((a, b) => {
      const aValue = a[key] ?? "";
      const bValue = b[key] ?? "";

      if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
      if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
      return 0;
    });

    setTransactions(sortedTransactions);
  };

  return (
    <div className="container">
      <div className="main-content">
        <h2>BUDGETING PAGE</h2>

        <div className="input-group">
          <label htmlFor="monthlyIncome">Monthly Income ($):</label>
          <input
            type="number"
            id="monthlyIncome"
            value={monthlyIncome}
            onChange={(e) => setMonthlyIncome(parseFloat(e.target.value))}
            placeholder="Enter your monthly income"
            disabled={!incomeEditable}
          />
          <button onClick={setMonthlyIncomeValue} disabled={!incomeEditable}>
            Set
          </button>
          <button onClick={editMonthlyIncome}>Edit</button>
        </div>

        <div className="income-display" id="incomeDisplay">
          Monthly Income: ${monthlyIncome.toFixed(2)}
        </div>

        <h2>BUDGET CATEGORIES</h2>

        {!showCategoryInput && (
          <button
            id="showCategoryInputButton"
            onClick={handleShowCategoryInput}
          >
            Show Category Input
          </button>
        )}

        {showCategoryInput && (
          <div className="category-input-container" id="categoryInputContainer">
            <input
              type="text"
              id="newCategory"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              placeholder="Enter category name"
              maxLength={20}
            />
            <button onClick={addCategory} id="addCategoryButton">
              Add
            </button>
          </div>
        )}

        <h2>ALLOCATE FUNDS</h2>
        <div id="allocationSection">{renderAllocationSection()}</div>

        <div className="button-group">
          <button
            onClick={finalizeAllocation}
            id="finalizeButton"
            disabled={allocationFinalized}
          >
            Finalize Allocation
          </button>
          <button onClick={saveBudget}>Save Data</button>
          <button onClick={resetBudget} className="red-button">
            Reset Entire Budget
          </button>
          <button
            onClick={resetAllocation}
            className="red-button"
            disabled={!allocationFinalized}
          >
            Reset Allocation
          </button>
        </div>

        {allocationFinalized && (
          <div className="add-expenses-section">
            <h2>Record Expenses</h2>
            <div className="expense-form">
              <input
                type="text"
                id="expenseTitle"
                value={expenseTitle}
                onChange={(e) => setExpenseTitle(e.target.value)}
                placeholder="Expense Title"
                maxLength={30}
              />
              <input
                type="number"
                id="expenseAmount"
                value={expenseAmount}
                onChange={(e) => setExpenseAmount(e.target.value)}
                placeholder="Amount"
              />
              <select
                id="expenseCategory"
                value={expenseCategory}
                onChange={(e) => setExpenseCategory(e.target.value)}
              >
                <option value="">Select Category</option>
                {renderCategoryOptions()}
              </select>
              <button onClick={addExpense}>Add Expense</button>
            </div>

            <div id="remainingBalanceSection">
              {renderRemainingBalanceSection()}
            </div>
          </div>
        )}
      </div>

      <div className="sidebar">
        <h2>TRANSACTION LOG</h2>
        <div>
          <label htmlFor="filterCategory">Filter by Category:</label>
          <select
            id="filterCategory"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            <option value="">All</option>
            {renderCategoryOptions()}
          </select>
        </div>

        <table className="transaction-table">
          <thead>
            <tr>
              <th onClick={() => toggleSort("date")}>Date</th>
              <th onClick={() => toggleSort("time")}>Time</th>
              <th onClick={() => toggleSort("title")}>Name</th>
              <th onClick={() => toggleSort("category")}>Category</th>
              <th onClick={() => toggleSort("amount")}>Amount ($)</th>
            </tr>
          </thead>
          <tbody id="transactionLog">{filterTransactionLog()}</tbody>
        </table>
      </div>
    </div>
  );
};

export default BudgetingPage;
