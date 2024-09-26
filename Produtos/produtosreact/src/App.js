import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import React, { useState, useEffect } from "react";
import ProductList from "./components/ProductList";
import {ModalInclude, ModalEdit, ModalDelete} from "./components/ProductForm";
import ProductDetail from "./components/ProductDetail";
import {ShoppingCart, ShoppingCartButton} from "./components/ShoppingCart";

function App() {
  const baseUrl = "https://localhost:7077/api/products";
  const [data, setData] = useState([]);
  const [updateData, setUpdateData] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState({
    id: "",
    name: "",
    price: "",
    description: "",
  });
  const [searchValue, setSearchValue] = useState("");
  const [cart, setCart] = useState([]);


  useEffect(() => {
    if (updateData) {
      askGet();
      setUpdateData(false);
    }
  }, [updateData]);

  //http 
  const askGet = async () => {
    await axios
      .get(baseUrl)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const askGetByName = async (e) => {
    setSearchValue(e.target.value);

    if(searchValue.trim() === ""){
      setUpdateData(true);
    }
    await axios.get(baseUrl + "/ProductByName?name=" + searchValue).then((response) => {
      setData(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
  }
  const askPost = async () => {
    delete selectedProduct.id;
    selectedProduct.price = parseFloat(selectedProduct.price);
    await axios
      .post(baseUrl, selectedProduct)

      .then((response) => {
        setData(data.concat(response.data));
        setUpdateData(true);
        openModalInclude();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const askPut = async () => {
    selectedProduct.price = parseFloat(selectedProduct.price);
    await axios
      .put(baseUrl + "/" + selectedProduct.id, selectedProduct)
      .then((response) => {
        var answer = response.data;
        var auxiliarData = data;

        auxiliarData.forEach((product) => {
          if (product.id === selectedProduct.id) {
            product.name = answer.name;
            product.price = answer.price;
            product.description = answer.description;
          }
        });
        setUpdateData(true);
        openModalEdit();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const askDelete = async () => {
    await axios
      .delete(baseUrl + "/" + selectedProduct.id)
      .then((response) => {
        setData(data.filter((product) => product.id === response.data));
        setUpdateData(true);
        openModalDelete();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedProduct({
      ...selectedProduct,
      [name]: value,
    });
    console.log(selectedProduct);
  };

  //modais
  const [modalInclude, setModalInclude] = useState(false);
  const openModalInclude = () => {
    setModalInclude(!modalInclude);
  };
  const [modalEdit, setModalEdit] = useState(false);
  const openModalEdit = () => {
    setModalEdit(!modalEdit);
  };
  const [modalDelete, setModalDelete] = useState(false);
  const openModalDelete = () => {
    setModalDelete(!modalDelete);
  };
  const selectProduct = (product, option) => {
    setSelectedProduct(product);
    if (option === "Editar") {
      openModalEdit();
    } else {
      openModalDelete();
    }
  };
  const [modalCart, setModalCart] = useState(false);
  const openModalCart = () => {
    setModalCart(!modalCart);
  }

  //cart
  const addToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
  };
  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((product) => product.id !== id))
  }
  const getTotalPrice = () => {
    return cart.reduce((total, product) => total + parseFloat(product.price), 0).toFixed(2);
  };
  const getTotalProducts = () => {
    return cart.length;
  };

  return (
    <div className="App">
      <ProductDetail searchValue={searchValue} askGetByName={askGetByName} openModalInclude={openModalInclude}/>
      <ProductList selectProduct={selectProduct} data={data} addToCart={addToCart} />
      <ModalInclude handleChange={handleChange} modalnclude={modalInclude} askPost={askPost} openModalInclude={openModalInclude}/> 
      <ModalEdit handleChange={handleChange} selectedProduct={selectedProduct} modalEdit={modalEdit} openModalEdit={openModalEdit} askPut={askPut}/> 
      <ModalDelete selectedProduct={selectedProduct} askDelete={askDelete} modalDelete={modalDelete} openModalDelete={openModalDelete}/> 
      <ShoppingCartButton getTotalProducts={getTotalProducts} openModalCart={openModalCart}/>
      <ShoppingCart modalCart={modalCart} openModalCart={openModalCart} cart={cart} removeFromCart={removeFromCart} getTotalPrice={getTotalPrice}/>
    </div>
  );
}

export default App;
