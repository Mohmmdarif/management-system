import * as Yup from "yup";

export const RegisterSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email format').required('Email is required'),
  username: Yup.string().min(3).max(50).required('Username is required'),
  password: Yup.string().min(6).max(100).required('Password is required'),
  name: Yup.string().max(100).required('Name is required'),
});

export const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email format").required("Email is required"),
  password: Yup.string().min(6).max(100).required("Password is required"),
});