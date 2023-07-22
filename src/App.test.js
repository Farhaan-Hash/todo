// import {render, screen} from "@testing-library/react";
// import App from "./App";

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

import {render, screen, fireEvent} from "@testing-library/react";
import App from "./App";

// Helper function to set items in localStorage for testing
const setLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

// Helper function to clear items in localStorage for testing
const clearLocalStorage = () => {
  localStorage.clear();
};

describe("App", () => {
  // Clear localStorage before each test
  beforeEach(() => {
    clearLocalStorage();
  });

  test('renders the "ToDo App" header', () => {
    render(<App />);
    const headerElement = screen.getByText(/ToDo App/i);
    expect(headerElement).toBeInTheDocument();
  });

  test("renders the input field", () => {
    render(<App />);
    const inputElement = screen.getByRole("textbox");
    expect(inputElement).toBeInTheDocument();
  });

  test("displays an error when submitting an empty input", () => {
    render(<App />);
    const submitButton = screen.getByText(/Submit/i);

    fireEvent.click(submitButton);

    const errorMessage = screen.getByText(/field Cannot be empty/i);
    expect(errorMessage).toBeInTheDocument();
  });

  test("adds a new item when submitting a non-empty input", () => {
    render(<App />);
    const inputElement = screen.getByRole("textbox");
    const submitButton = screen.getByText(/Submit/i);

    fireEvent.change(inputElement, {target: {value: "New Todo Item"}});
    fireEvent.click(submitButton);

    const todoItem = screen.getByText(/New Todo Item/i);
    expect(todoItem).toBeInTheDocument();
  });

  test('deletes an item when clicking the "Delete" button', () => {
    // Set initial items in localStorage
    setLocalStorage("list", ["Item 1", "Item 2", "Item 3"]);
    render(<App />);

    const deleteButtons = screen.getAllByText(/Delete/i);
    fireEvent.click(deleteButtons[1]); // Delete the second item

    const remainingItems = screen.queryAllByText(/Item/i);
    expect(remainingItems.length).toBe(2);
  });

  test('deletes all items when clicking the "Delete All" button', () => {
    // Set initial items in localStorage
    setLocalStorage("list", ["Item 1", "Item 2", "Item 3"]);
    render(<App />);

    const deleteAllButton = screen.getByText(/Delete All/i);
    fireEvent.click(deleteAllButton);

    const todoItems = screen.queryAllByText(/Item/i);
    expect(todoItems.length).toBe(0);
  });

  test('enables editing mode when clicking the "Edit Todo" button', () => {
    // Set initial items in localStorage
    setLocalStorage("list", ["Item 1", "Item 2", "Item 3"]);
    render(<App />);

    const editButtons = screen.getAllByText(/Edit Todo/i);
    fireEvent.click(editButtons[1]); // Enable editing mode for the second item

    const editInput = screen.getByRole("textbox");
    expect(editInput).toBeInTheDocument();
  });

  test('submits edit and updates the item when clicking the "Submit Edit" button', () => {
    // Set initial items in localStorage
    setLocalStorage("list", ["Item 1", "Item 2", "Item 3"]);
    render(<App />);

    const editButtons = screen.getAllByText(/Edit Todo/i);
    fireEvent.click(editButtons[1]); // Enable editing mode for the second item

    const editInput = screen.getByRole("textbox");
    fireEvent.change(editInput, {target: {value: "Updated Item"}});

    const submitEditButton = screen.getByText(/Submit Edit/i);
    fireEvent.click(submitEditButton);

    const updatedItem = screen.getByText(/Updated Item/i);
    expect(updatedItem).toBeInTheDocument();
  });
});
