import React, { useState } from 'react';
import axios from 'axios';
import Autosuggest from 'react-autosuggest';

const VentaProductos = () => {
  const [productos, setProductos] = useState([{ product_id: '', name: '', quantity: 1 }]);
  const [mensaje, setMensaje] = useState('');

  const handleNameChange = (index, name) => {
    const values = [...productos];
    values[index].name = name;
    setProductos(values);
  };

  const handleQuantityChange = (index, event) => {
    const values = [...productos];
    values[index].quantity = event.target.value;
    setProductos(values);
  };

  const handleAdd = () => {
    setProductos([...productos, { product_id: '', name: '', quantity: 1 }]);
  };

  const handleRemove = (index) => {
    const values = [...productos];
    values.splice(index, 1);
    setProductos(values);
  };

  const handleProductSelect = (index, product) => {
    const values = [...productos];
    values[index].product_id = product.id;
    values[index].name = product.name;
    setProductos(values);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/sales', { products: productos });
      setMensaje('Venta creada con éxito');
      console.log(response.data);
    } catch (error) {
      setMensaje('Error al crear la venta');
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Crear Venta</h1>
      <form onSubmit={handleSubmit}>
        {productos.map((producto, index) => (
          <div key={index}>
            <label>
              Producto:
              <ProductAutosuggest
                index={index}
                value={producto.name}
                onChange={handleNameChange}
                onSelect={handleProductSelect}
              />
            </label>
            <label>
              Cantidad:
              <input
                type="number"
                value={producto.quantity}
                onChange={event => handleQuantityChange(index, event)}
              />
            </label>
            <button type="button" onClick={() => handleRemove(index)}>Eliminar</button>
          </div>
        ))}
        <button type="button" onClick={handleAdd}>Agregar Producto</button>
        <button type="submit">Crear Venta</button>
      </form>
      {mensaje && <p>{mensaje}</p>}
    </div>
  );
};

const ProductAutosuggest = ({ index, value, onChange, onSelect }) => {
  const [suggestions, setSuggestions] = useState([]);

  const fetchSuggestions = async ({ value }) => {
    try {
      const response = await axios.get('http://localhost:8000/api/products/search', { params: { query: value } });
      setSuggestions(response.data);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    }
  };

  const onSuggestionsFetchRequested = ({ value }) => {
    fetchSuggestions({ value });
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const getSuggestionValue = suggestion => suggestion.name;

  const renderSuggestion = suggestion => (
    <div>
      {suggestion.name}
    </div>
  );

  const onSuggestionSelected = (event, { suggestion }) => {
    onSelect(index, suggestion);
  };

  const inputProps = {
    placeholder: 'Buscar producto',
    value,
    onChange: (event, { newValue }) => onChange(index, newValue)
  };

  return (
    <Autosuggest
      suggestions={suggestions}
      onSuggestionsFetchRequested={onSuggestionsFetchRequested}
      onSuggestionsClearRequested={onSuggestionsClearRequested}
      getSuggestionValue={getSuggestionValue}
      renderSuggestion={renderSuggestion}
      onSuggestionSelected={onSuggestionSelected}
      inputProps={inputProps}
    />
  );
};

export default VentaProductos;
