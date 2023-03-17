import { createContext, useReducer } from "react";

const initialState = [
  {
    id: 1,
    description: "Rent 1",
    amount: 59.99,
    date: new Date("2021-12-19"),
  },
  {
    id: 2,
    description: "Rent 2",
    amount: 5.99,
    date: new Date("2021-12-30"),
  },
  {
    id: 3,
    description: "Rent 3",
    amount: 9.99,
    date: new Date("2022-06-19"),
  },
  {
    id: 4,
    description: "Rent 4",
    amount: 59.99,
    date: new Date("2021-12-19"),
  },
  {
    id: 5,
    description: "Rent 5",
    amount: 5.99,
    date: new Date("2021-12-30"),
  },
  {
    id: 6,
    description: "Rent 6",
    amount: 9.99,
    date: new Date("2022-06-19"),
  },
  {
    id: 7,
    description: "Rent 7",
    amount: 59.99,
    date: new Date("2021-12-19"),
  },
  {
    id: 8,
    description: "Rent 8",
    amount: 5.99,
    date: new Date("2021-12-30"),
  },
  {
    id: 9,
    description: "Rent 9",
    amount: 9.99,
    date: new Date("2022-06-19"),
  },
  {
    id: 10,
    description: "Rent 10",
    amount: 59.99,
    date: new Date("2021-12-19"),
  },
  {
    id: 11,
    description: "Rent 11",
    amount: 5.99,
    date: new Date("2021-12-30"),
  },
  {
    id: 12,
    description: "Rent 12",
    amount: 9.99,
    date: new Date("2022-06-19"),
  },
];

export const ExpensesContext = createContext({
  expenses: [],
  addExpense: ({ description, amount, date }) => {},
  deleteExpense: (id) => {},
  updateExpense: (id, { description, amount, date }) => {},
});

function expenseReducer(state, action) {
  switch (action.type) {
    case "ADD":
      const id = new Date().toString() + Math.random().toString();
      console.log(action.payload, id);

      return [{ ...action.payload, id: id }, ...state];
    case "UPDATE":
      const updatableExpenseIndex = state.findIndex(
        (expense) => expense.id === action.payload.id
      );
      const updatedExpense = state[updatableExpenseIndex];
      const updatedItem = { ...updatedExpense, ...action.payload.data };
      const updatedExpenses = [...state];
      updatedExpenses[updatableExpenseIndex] = updatedItem;
      return updatedExpenses;
    case "DELETE":
      return state.filter((expense) => expense.id !== action.payload);
    default:
      return state;
  }
}

function ExpensesContextProvider({ children }) {
  const [expensesState, dispatch] = useReducer(expenseReducer, initialState);

  function addExpense(expenseData) {
    dispatch({ type: "ADD", payload: { ...expenseData } });
  }

  function deleteExpense(id) {
    dispatch({ type: "DELETE", payload: id });
  }

  function updateExpense(id, expenseData) {
    dispatch({ type: "UPDATE", payload: { id: id, data: expenseData } });
  }

  const value = {
    expenses: expensesState,
    addExpense: addExpense,
    updateExpense: updateExpense,
    deleteExpense: deleteExpense,
  };

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
}

export default ExpensesContextProvider;
