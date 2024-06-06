import React, { useState } from "react";
import { Title } from "../../commons/components/Title";
import "../../styles/styles.css";
import { useNavigate } from "react-router-dom";
import { saveToken } from "../../conf/Token";
import { TextField, Button, Box, Container } from "@mui/material";

const LoginForm = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleLoginInputChange = (e) => {
    const { id, value } = e.target;
    setLoginData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const navigate = useNavigate();

  const handleLoginSubmit = (e) => {
    e.preventDefault();
  
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    };
  
    fetch("http://localhost:8000/api/login", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        console.log("Token JWT recibido:", data.access_token);
        saveToken(data.access_token);
  
        navigate("/ge_documental");
      })
      .catch((error) => {
        console.error("Error al enviar la solicitud:", error);
      });
  };

  return (
    <>
      <div
        className="logo-container"
        style={{
          position: "absolute",
          top: 50,
          left: "20%",
          width: "60%",
          height: "100%",
          zIndex: -1,
          opacity: 0.4,
          filter: "blur(5px)",
          backgroundImage: `url(${process.env.PUBLIC_URL}/logo192.png)`,
          backgroundSize: "contain",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      ></div>
      <Container
        maxWidth="sm"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <Box className="myContainer">
          <form onSubmit={handleLoginSubmit} style={{ width: "100%" }}>
            <Title title="INICIO DE SESIÓN" />
            <Box mb={2}>
              <TextField
                id="email"
                label="Correo Electrónico"
                variant="outlined"
                value={loginData.email}
                onChange={handleLoginInputChange}
                fullWidth
                margin="normal"
              />
            </Box>
            <Box mb={2}>
              <TextField
                id="password"
                label="Contraseña"
                type="password"
                variant="outlined"
                value={loginData.password}
                onChange={handleLoginInputChange}
                fullWidth
                margin="normal"
              />
            </Box>
            <Box>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Iniciar Sesión
              </Button>
            </Box>
          </form>
        </Box>
      </Container>
    </>
  );
};

export default LoginForm;
