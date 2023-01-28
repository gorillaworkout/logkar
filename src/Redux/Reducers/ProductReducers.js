const INITIAL_STATE = {
  allProduct: [],
  isLoadingProduct: true,
  cart: [],
  idActive: "",
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "GETALLPRODUCT":
      return { ...state, allProduct: action.allProduct };
    case "LOADINGPRODUCT":
      return { ...state, isLoadingProduct: true };
    case "ALLPRODUCTLOAD":
      return { ...state, isLoadingProduct: false };
    case "ADDPRODUCTTOCART":
      // return { ...state, cart:[...state.cart,action.product]};
      return { ...state, cart: action.product };
    case "UPDATEQTY":
      return { ...state, cart: action.product };
    case "DELETECART":
      return { ...state, cart: [] };
    case "IDACTIVE":
      return {...state,idActive:action.id}
    default:
      return state;
  }
};
