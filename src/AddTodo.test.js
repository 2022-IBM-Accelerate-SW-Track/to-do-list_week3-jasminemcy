import { render, screen, fireEvent} from '@testing-library/react';
import { unmountComponentAtNode } from 'react-dom';
import App from './App';

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});




 test('test that App component doesn\'t render dupicate Task', () => {
  render(<App />);
    const inputTask = screen.getByRole("textbox", {name: /Add New Item/i});
    const inputDate = screen.getByRole("textbox", {name: /Due Date/i});
    const element = screen.getByRole('button', {name: /Add/i});

    fireEvent.change(inputTask, { target: { value: "Don't Duplicate"}});
    fireEvent.change(inputDate, {target: {value: "08/09/2022"}});
    fireEvent.click(element);

    fireEvent.change(inputTask, { target: { value: "Don't Duplicate"}});
    fireEvent.change(inputDate, {target: {value: "08/09/2022"}});
    fireEvent.click(element);

  const check = screen.getByText(/Don't Duplicate/i);
  expect(check).toBeInTheDocument();
  });

 test('test that App component doesn\'t add a task without task name', () => {
  render(<App />);
  const inputTask = screen.getByRole("textbox", {name: /Add New Item/i});
  const inputDate = screen.getByRole("textbox", {name: /Due Date/i});
  const element = screen.getByRole('button', {name: /Add/i});
  fireEvent.change(inputDate, {target: {value: "08/19/2022"}});
  fireEvent.click(element);
  
  const check = screen.getByText(/You have no todo's left/i);
  const checkDate = screen.getByText(new RegExp(new Date(dueDate).toLocaleString(), "i"));
  expect(check).not.toBeInTheDocument();
  expect(checkDate).not.toBeInTheDocument();
 });

 test('test that App component doesn\'t add a task without due date', () => {
  render(<App />);
  const inputTask = screen.getByRole("textbox", {name: /Add New Item/i});
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const element = screen.getByRole("button", {name: /Add/i});
  fireEvent.change(inputTask, {target: { value: "Dateless"}});
  fireEvent.click(element);

  const check = screen.getByText(/Dateless/i);
  expect(check).not.toBeInTheDocument();
 });



 test('test that App component can be deleted thru checkbox', () => {
  render(<App />);
 });


 test('test that App component renders different colors for past due events', () => {
  render(<App />);
 });
