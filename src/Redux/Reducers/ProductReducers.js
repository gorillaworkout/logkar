const INITIAL_STATE = {
  allProduct: [],
  isLoadingProduct: true,
  cart: [],
  idActive: "",
  isDataLengkap:false,
  activeStatus:"Home",
  isSuccess:false,
  listHeader:[
    "Home","Store","Shopping Cart"
  ]
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
    case "DATALENGKAP":
      return {...state,isDataLengkap:action.result}
    case "ACTIVESTATUS":
      return {...state,activeStatus:action.status}
    case "ISSUCCESS":
      return {...state,isSuccess:action.status}
    default:
      return state;
  }
};
