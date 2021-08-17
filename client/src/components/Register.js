import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, Link } from "react-router-dom";
//import userService from "../services/users";
import { successMessage, errorMessage } from "../reducers/notificationReducer";
import { registerUser } from "../reducers/userReducer";
import {
  TextField,
  Button,
  Typography,
  Container,
  makeStyles,
  CssBaseline,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  header: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
  },
  text: {
    marginRight: "90px",
  },
}));

const RegisterForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const dispatch = useDispatch();
  const classes = useStyles();
  const history = useHistory();

  const handleRegister = async (event) => {
    event.preventDefault();
    try {
      const user = {
        username,
        name,
        password,
      };

      console.log(user);
      dispatch(registerUser(user));
      setUsername("");
      setPassword("");
      dispatch(successMessage(`${user.name} had registered successfully`));
      history.push("/");
    } catch (error) {
      dispatch(errorMessage(error));
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <div className={classes.header}>
          <Button
            id="backButton"
            to="/"
            variant="contained"
            component={Link}
            className={classes.button}
          >
            Back
          </Button>
          <Typography component="h1" variant="h5">
            Register
          </Typography>
          <Typography
            component="h1"
            variant="h5"
            className={classes.text}
          ></Typography>
        </div>
        <form className={classes.form} onSubmit={handleRegister}>
          <TextField
            label="Username"
            type="username"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            autoComplete="username"
          />
          <TextField
            label="User's Name"
            type="name"
            value={name}
            name="Name"
            onChange={({ target }) => setName(target.value)}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            autoComplete="Name"
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
            variant="outlined"
            margin="normal"
            required
            fullWidth
          />
          <Button
            id="registerButton"
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            className={classes.submit}
          >
            Register
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default RegisterForm;
