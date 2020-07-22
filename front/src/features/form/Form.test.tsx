import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Form from "./Form";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";
import axiosMock from "../../__mocks__/axios";
import axios from "axios";

jest.mock("axios");
window.alert = jest.fn();

test("Renders component with all of its' static fields", async () => {
  const { getByText } = await render(<Form />);
  expect(getByText("First Name")).toBeInTheDocument();
  expect(getByText("Last Name")).toBeInTheDocument();
  expect(getByText("Email")).toBeInTheDocument();
  expect(getByText("Date")).toBeInTheDocument();
});

test("Submitting empty form", async () => {
  const mockOnSubmit = jest.fn();
  const { getByText, getByRole } = render(<Form onFormSubmit={mockOnSubmit} />);
  await act(async () => {
    await userEvent.click(getByRole("button"));
  });
  expect(getByText("Wrong input format. Expected a date.")).toBeInTheDocument();
  expect(getByText("Field First name is required")).toBeInTheDocument();
  expect(getByText("Field Last name is required")).toBeInTheDocument();
  expect(getByText("Field email is required")).toBeInTheDocument();
  expect(mockOnSubmit).not.toHaveBeenCalled();
});

test("Submitting an invalid but not empty email", async () => {
  const mockOnSubmit = jest.fn();
  const { getByText, getByRole } = render(<Form onFormSubmit={mockOnSubmit} />);

  await act(async () => {
    await userEvent.type(
      screen.getByPlaceholderText(/email/i),
      "notAnAccualEmail"
    );
    await userEvent.click(getByRole("button"));
  });
  expect(getByText("Please type a valid email")).toBeInTheDocument();
  expect(mockOnSubmit).not.toHaveBeenCalled();
});

test("Happy path submit", async () => {
  axiosMock.post.mockImplementationOnce(() =>
    Promise.resolve({ data: "it works" })
  );
  const { getByRole } = render(<Form />);

  jest.doMock("axios", () => {
    return jest.fn();
  });

  await act(async () => {
    await userEvent.type(screen.getByPlaceholderText(/first name/i), "Adam");
    await userEvent.type(screen.getByPlaceholderText(/last name/i), "Smith");
    await userEvent.type(
      screen.getByPlaceholderText(/email/i),
      "adam@smith.com"
    );
    await userEvent.type(screen.getByLabelText(/date/i), "2020-10-30");
    await userEvent.click(getByRole("button"));
  });

  expect(axios.post).toHaveBeenCalled();
});
