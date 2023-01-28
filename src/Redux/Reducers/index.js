import {combineReducers} from 'redux'
import ProductReducers from './ProductReducers'

// import ParcelReducers from './ParcelReducers'

export default combineReducers({
    Product : ProductReducers,
});