import React, { useState } from "react";
import { TextField, Button, Box,  Alert } from "@mui/material";
import { Title } from "../../commons/components/Title";
const Product = () => {
  const [productData, setProductData] = useState({
    name: "",
    quantity: "",
    price: "",
    status: ""
  });

  const [responseMessage, setResponseMessage] = useState("");

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setProductData((prevData) => ({
      ...prevData,
      [id]: value
    }));
  };

  const handleProductSubmit = (e) => {
    e.preventDefault();

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(productData)
    };

    fetch("http://localhost:8000/api/products/", requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al enviar la solicitud.");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Respuesta del servidor:", data);
        if (data.message) {
          setResponseMessage(data.message);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        setResponseMessage("Error al ingresar el producto.");
      });
  };

  return (
   
      <Box
        mt={4}
        p={4}
        boxShadow={2}
        bgcolor="background.paper"
        borderRadius={8}
      >
        <form onSubmit={handleProductSubmit} style={{ display: "flex", flexDirection: "column" }}>
        <Title title="ingreso de productos" />
          <Box display="flex" flexDirection="row" justifyContent="space-between" mb={2}>
            <TextField
              id="name"
              label="Nombre del Producto"
              variant="outlined"
              value={productData.name}
              onChange={handleInputChange}
     
              margin="normal"
            />
            <TextField
              id="quantity"
              label="Cantidad"
              variant="outlined"
              value={productData.quantity}
              onChange={handleInputChange}
        
              margin="normal"
            />
         
          
            <TextField
              id="price"
              label="Precio"
              variant="outlined"
              value={productData.price}
              onChange={handleInputChange}
             
              margin="normal"
            />
            <TextField
              id="status"
              label="Estado"
              variant="outlined"
              value={productData.status}
              onChange={handleInputChange}
           
              margin="normal"
            />
          </Box>
          <Button
            type="submit"
            variant="contained"
            color="primary"
      
          >
            Ingresar Producto
          </Button>
        </form>
        {responseMessage && (
          <Box mt={2}>
            <Alert
              severity={
                responseMessage === "Producto ingresado exitosamente"
                  ? "success"
                  : "error"
              }
            >
              {responseMessage}
            </Alert>
          </Box>
        )}
      </Box>
  
  );
};

export default Product;
