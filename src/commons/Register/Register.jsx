import React, { useState } from "react";
import { Title } from "../../commons/components/Title"; 
import "../../styles/styles.css"; 
import { TextField, Button, Box, Container } from "@mui/material";

const RegisterForm = () => {
  const [registerData, setRegisterData] = useState({
    nom_usuario: "",
    nombre_completo: "",
    contraseña: "",
    cedula: "",
    estatus: "",
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setRegisterData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();

    // Construir los datos del formulario
    const formData = new FormData();
    formData.append("name", registerData.nombre_completo);
    formData.append("user_name", registerData.nom_usuario);
    formData.append("document", registerData.cedula);
    formData.append("status", registerData.estatus);
    formData.append("email", "sneiderfa@gmail.com"); // ¿De dónde se obtiene este valor?
    formData.append("password", registerData.contraseña);
    formData.append("password_confirmation", registerData.contraseña);

    // Configurar la solicitud POST
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: registerData.nombre_completo,
        user_name: registerData.nom_usuario,
        document: registerData.cedula,
        status: registerData.estatus,
        email: 'sneiderfa_aux@gmail.com',
        password: registerData.contraseña,
        password_confirmation: registerData.contraseña
      })
    };

    // Enviar la solicitud
    fetch("http://127.0.0.1:8000/api/register", requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al enviar la solicitud.");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Respuesta del servidor:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <>
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
          <form onSubmit={handleRegisterSubmit} style={{ width: "100%" }}>
            <Title title="REGISTRO" />
            <Box mb={2}>
              <TextField
                id="nom_usuario"
                label="Nombre de Usuario"
                variant="outlined"
                value={registerData.nom_usuario}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
              />
            </Box>
            <Box mb={2}>
              <TextField
                id="nombre_completo"
                label="Nombre Completo"
                variant="outlined"
                value={registerData.nombre_completo}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
              />
            </Box>
            <Box mb={2}>
              <TextField
                id="contraseña"
                label="Contraseña"
                type="password"
                variant="outlined"
                value={registerData.contraseña}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
              />
            </Box>
            <Box mb={2}>
              <TextField
                id="cedula"
                label="Cédula"
                variant="outlined"
                value={registerData.cedula}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
              />
            </Box>
            <Box mb={2}>
              <TextField
                id="estatus"
                label="Estatus"
                variant="outlined"
                value={registerData.estatus}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
              />
            </Box>
            <Box>
              <Button type="submit" variant="contained" color="primary" fullWidth>
                Registrarse
              </Button>
            </Box>
          </form>
        </Box>
      </Container>
    </>
  );
};

export default RegisterForm;
