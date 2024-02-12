import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Navigate } from "react-router-dom";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Link,
} from "@mui/material";
import { useFirebaseAuth } from "../contexts/AuthContext";

export default function SignUp() {
  const { handleSubmit, register } = useForm<{
    email: string;
    password: string;
    password2: string;
  }>();
  const { signUpUserWithEmailAndPassword, user } = useFirebaseAuth();
  const navigate = useNavigate();

  if (user) return <Navigate to="/" />;

  const handleSignUp = async (data: {
    email: string;
    password: string;
    password2: string;
  }) => {
    const { email, password, password2 } = data;
    try {
      if (password !== password2) return alert("Passwords do not match");
      await signUpUserWithEmailAndPassword(email, password);
      navigate("/");
    } catch (error) {
      // Handle errors here, such as displaying an error message to the user
      console.error("Login failed:", error);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(handleSignUp)}
          noValidate
          sx={{ mt: 1 }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            type="email"
            label="Email Address"
            autoComplete="email"
            autoFocus
            {...register("email")}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            {...register("password")}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Repeat Password"
            type="password"
            id="password"
            autoComplete="current-password"
            {...register("password2")}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid container>
            <Grid item>
              <Link href="/login" variant="body2">
                {"Already have an account? Sign In"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
