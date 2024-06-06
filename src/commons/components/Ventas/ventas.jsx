import React, { useState } from "react";
import { Title } from "../Title"; 
//import "../../styles/styles.css"; 
import { TextField, Button, Box, Container, Alert, IconButton } from "@mui/material";
import Autocomplete from "@mui/lab/Autocomplete";
import { DataGrid } from '@mui/x-data-grid';
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import axios from 'axios';

const VentaProductos = ({ token }) => { // Recibe el token como prop
  const [productos, setProductos] = useState([]);
  const [venta, setVenta] = useState({
    product_id: '',
    name: '',
    quantity: 1,
    subtotal: 0
  });
  const [items, setItems] = useState([]);
  const [mensaje, setMensaje] = useState('');
  const [autocompleteValue, setAutocompleteValue] = useState('');

  const handleAutocompleteChange = (event, newValue) => {
    if (newValue) {
      setVenta((prevData) => ({
        ...prevData,
        product_id: newValue.id,
        name: newValue.name,
        subtotal: newValue.price * venta.quantity
      }));
      setAutocompleteValue(newValue.name);
    }
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setVenta((prevData) => ({
      ...prevData,
      [id]: value,
      subtotal: id === 'quantity' ? prevData.product_id ? productos.find(p => p.id === prevData.product_id).price * value : 0 : prevData.subtotal
    }));
  };

  const handleAddItem = () => {
    // Validación para evitar productos duplicados
    if (items.some(item => item.product_id === venta.product_id || item.name === venta.name)) {
      setMensaje('No se puede agregar el mismo producto dos veces.');
      return;
    }
    
    setItems([...items, venta]);
    setVenta({
      product_id: '',
      name: '',
      quantity: 1,
      subtotal: 0
    });
    setAutocompleteValue('');
  };

  const handleDeleteItem = (id) => {
    const newItems = items.filter((item) => item.id !== id);
    setItems(newItems);
  };

  const handleEditItem = (id) => {
    const item = items.find((item) => item.id === id);
    setVenta(item);
    handleDeleteItem(id);
  };

  const handleAutocompleteInputChange = async (event, value) => {
    setAutocompleteValue(value);
    if (value) {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/products/search/search_products`, {
          params: { query: value },
          headers: { 'Authorization': `Bearer ${token}` } // Añadir el token aquí
        });
        setProductos(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    } else {
      setProductos([]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/sales', { products: items }, {
        headers: { 'Authorization': `Bearer ${token}` } // Añadir el token aquí
      });
      setMensaje('Venta creada con éxito');
      console.log(response.data);
    } catch (error) {
      setMensaje('Error al crear la venta');
      console.error(error);
    }
  };

  const columns = [
    { field: 'name', headerName: 'Producto', width: 150 },
    { field: 'price', headerName: 'Precio', width: 150 },
    { field: 'quantity', headerName: 'Cantidad', width: 150 },
    { field: 'subtotal', headerName: 'Subtotal', width: 150 },
    {
      field: 'actions',
      headerName: 'Acciones',
      width: 150,
      renderCell: (params) => (
        <>
          <IconButton onClick={() => handleEditItem(params.row.id)}>
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => handleDeleteItem(params.row.id)}>
            <DeleteIcon />
          </IconButton>
        </>
      )
    }
  ];

  const rows = items.map((item, index) => ({ id: index, ...item }));

  return (
    <>
      <Container
        maxWidth="md"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <Box className="myContainer">
          <form onSubmit={handleSubmit} style={{ width: "100%" }}>
            <Title title="Crear Venta" />
            <Box mb={2}>
              <Autocomplete
                id="name"
                options={productos}
                getOptionLabel={(option) => option.name}
                value={venta.name ? { name: venta.name } : null}
                onChange={handleAutocompleteChange}
                onInputChange={handleAutocompleteInputChange}
                inputValue={autocompleteValue}
                renderInput={(params) => <TextField {...params} label="Buscar Producto" variant="outlined" fullWidth />}
              />
            </Box>
            <Box mb={2}>
              <TextField
                id="quantity"
                label="Cantidad"
                type="number"
                variant="outlined"
                value={venta.quantity}
                onChange={handleInputChange}
                fullWidth
              />
            </Box>
            <Box mb={2}>
              <Button type="button" variant="contained" color="primary" fullWidth onClick={handleAddItem}>
                Agregar Producto
              </Button>
            </Box>
            <Box style={{ height: 400, width: '100%' }}>
              <DataGrid rows={rows} columns={columns} pageSize={5} />
            </Box>
            <Box mt={2}>
              <Button type="submit" variant="contained" color="primary" fullWidth>
                Crear Venta
              </Button>
            </Box>
          </form>
          {mensaje && (
            <Box mt={2}>
              <Alert severity={mensaje === "Venta creada con éxito" ? "success" : "error"}>
                {mensaje}
              </Alert>
            </Box>
          )}
        </Box>
      </Container>
    </>
  );
};

export default VentaProductos;
