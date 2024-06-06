import React, { useState, useEffect } from "react";
import { TextField, Button, Box, Container, Alert } from "@mui/material";
import axios from "axios"; // Importa axios
import { DataGrid } from "@mui/x-data-grid"; // Importa DataGrid de Material-UI
import { Title } from "../components/Title";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { useNavigate } from "react-router-dom";

const Product = () => {
  const [productData, setProductData] = useState({
    name: "",
    quantity: "",
    price: "",
    status: "",
  });
  const [responseMessage, setResponseMessage] = useState("");
  const [salesData, setSalesData] = useState([]);
  const token = localStorage.getItem("token"); // Obtener token de localStorage

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setProductData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/products/",
        productData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("Respuesta del servidor:", response.data);
      setResponseMessage("Producto ingresado exitosamente");
    } catch (error) {
      console.error("Error:", error);
      setResponseMessage("Error al ingresar el producto.");
    }
  };

  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/products/",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setSalesData(response.data);
      } catch (error) {
        console.error("Error al obtener las ventas:", error);
      }
    };

    fetchSalesData();
  }, [token]);

  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "name", headerName: "Nombre", width: 200 },
    { field: "quantity", headerName: "Cantidad", width: 150 },
    { field: "price", headerName: "Precio", width: 150 },
    { field: "status", headerName: "Estado", width: 150 },
    { field: "created_at", headerName: "Creado en", width: 200 },
  ];
  const handleNavigate = () => {
    navigate("/ventas"); // Navega a la ruta /dashboard
  };
  return (
    <Container maxWidth="lg">
      <Box
        mt={8}
        p={4}
        boxShadow={2}
        bgcolor="background.paper"
        borderRadius={8}
        style={{ textAlign: "center" }}
      >
        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column" }}
        >
          <Title title="CREACIÓN DE VENTAS" />
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            mb={2}
          >
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
              InputProps={{
                startAdornment: <AttachMoneyIcon />,
              }}
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
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            mb={2}
          >
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ width: "200px", height: "40px", alignContent: "center" }}
            >
              Ingresar Producto
            </Button>

            <Button
              variant="contained"
              color="primary"
              onClick={handleNavigate} // Asigna la función de navegación al hacer clic
              sx={{ width: "200px", height: "40px", alignContent: "center" }}
            >
              Ir a Ventas
            </Button>
          </Box>
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
        <Title title="LISTA DE PRODUCTOS" />
        <Box mt={4} style={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={salesData}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5, 10, 20]}
            checkboxSelection
            disableSelectionOnClick
          />
        </Box>
      </Box>
    </Container>
  );
};

export default Product;
