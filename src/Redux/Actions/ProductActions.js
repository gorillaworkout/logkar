import axios from "axios";
import store from "../Reducers/index";
// const store = createStore(rootReducer)

export const GetAllProduct = () => {
  return (dispatch) => {
    dispatch({ type: "LOADINGPRODUCT" });
    axios
      .get(`https://swapi.dev/api/people/`)
      .then((res) => {
        dispatch({ type: "GETALLPRODUCT", allProduct: res.data });
        dispatch({ type: "ALLPRODUCTLOAD" });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const addProductToCart = (cart, value) => {
  return (dispatch) => {
    if (cart.length) {
      let findIndex = cart.findIndex((val) => {
        return val.name === value.name;
      });
      if (findIndex !== -1) {
        cart[findIndex].qty++;
      } else {
        cart.push(value);
      }
    } else {
      cart.push(value);
    }
    dispatch({ type: "ADDPRODUCTTOCART", product: [...cart] });
  };
};

export const updateQty = (cart, value) => {
  return (dispatch) => {
    if (cart.length) {
      let findIndex = cart.findIndex((val) => {
        return val.name === value.name;
      });
      if (findIndex !== -1) {
        cart[findIndex].qty = value.qty;
      }
    }
    dispatch({ type: "UPDATEQTY", product: [...cart] });
  };
};
