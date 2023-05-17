import { useNavigate } from "react-router-dom";
import { Button, ButtonGroup, Input } from "@mui/material";

import * as Yup from "yup";
import { useFormik } from "formik";
import { User } from "../types/User";
import useNewUserId from "../hooks/useNewUserId";
import { useAppDispatch } from "../store/hooks";
import { addUser } from "../store/user/userSlice";

const newUser: User = {
  address: {
    street: "",
    suite: "",
    city: "",
    zipcode: "",
    geo: {
      lat: "",
      lng: "",
    },
  },
  company: {
    bs: "",
    catchPhrase: "",
    name: "",
  },
  email: "",
  id: 0,
  name: "",
  phone: "",
  username: "",
  website: "",
};

function AddUserPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const newUserId = useNewUserId();

  const validationSchema = Yup.object({
    name: Yup.string().required("Pole Imię jest wymagane"),
    email: Yup.string().email("Niepoprawny adres email").required("Pole Email jest wymagane"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
    },
    validationSchema,
    onSubmit: ({ name, email }) => {
      dispatch(addUser({ ...newUser, id: newUserId, name, email }));
      navigate("/");
    },
  });

  return (
    <div>
      <h1>Form</h1>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <label htmlFor="name">Imię:</label>
          <Input type="text" id="name" {...formik.getFieldProps("name")} />
          {formik.touched.name && formik.errors.name ? <div>{formik.errors.name}</div> : null}
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <Input type="email" id="email" {...formik.getFieldProps("email")} />
          {formik.touched.email && formik.errors.email ? <div>{formik.errors.email}</div> : null}
        </div>
        <ButtonGroup variant="contained">
          <Button onClick={() => navigate("/")} color="error">
            Cancel
          </Button>
          <Button type="submit" color="success">
            Add user
          </Button>
        </ButtonGroup>
      </form>
    </div>
  );
}

export default AddUserPage;
