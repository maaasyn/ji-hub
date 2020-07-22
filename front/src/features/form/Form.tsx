import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers";
import * as yup from "yup";
import IInputs from "../../app/models/IInputs";
import axios from "axios";

const schema = yup.object().shape({
  firstName: yup.string().required("Field First name is required"),
  lastName: yup.string().required("Field Last name is required"),
  email: yup
    .string()
    .email("Please type a valid email")
    .required("Field email is required"),
  date: yup
    .date()
    .required("Field date name is required")
    .typeError("Wrong input format. Expected a date."),
});

interface IProps {
  onFormSubmit?: (data: IInputs) => any;
}

const defaultSubmit = (data: IInputs) => {
  axios.post("http://localhost:3000/events", data);
  alert(JSON.stringify({ ...data, date: data.date.toISOString() }));
};

const Form: React.FC<IProps> = ({ onFormSubmit = defaultSubmit }) => {
  const { register, handleSubmit, errors } = useForm<IInputs>({
    resolver: yupResolver(schema),
    mode: "all",
  });

  return (
    <form
      className={"content"}
      style={{
        display: "flex",
        flexDirection: "column",
        alignContent: "center",
        maxWidth: "300px",
        margin: "auto",
        padding: "10px",
        backgroundColor: "#fff",
      }}
      onSubmit={handleSubmit(onFormSubmit)}>
      <label htmlFor={"firstName"}>First Name</label>
      <input
        placeholder="First name"
        id="firstName"
        name="firstName"
        ref={register}
      />
      {errors.firstName && <span>{errors.firstName.message}</span>}
      <label>Last Name</label>
      <input
        placeholder="Last name"
        id="lastName"
        name="lastName"
        ref={register}
      />
      {errors.lastName && <p>{errors.lastName.message}</p>}
      <label>Email</label>
      <input placeholder="Email" id="email" name="email" ref={register} />
      {errors.email && <p>{errors.email.message}</p>}
      <label htmlFor={"date"}>Date</label>
      <input id="date" name="date" type="date" ref={register} />
      {errors.date && <p>{errors.date.message}</p>}
      <button id="submit" type="submit">
        Submit
      </button>
    </form>
  );
};

export default Form;
