import { PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAIL, 
    PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_DETAILS_FAIL, PRODUCT_SAVE_REQUEST, PRODUCT_SAVE_SUCCESS, PRODUCT_SAVE_FAIL, PRODUCT_DELETE_REQUEST, PRODUCT_DELETE_SUCCESS, PRODUCT_DELETE_FAIL,
     } from "../Constants/ProductConstant"
import Axios from "axios";

const ListProduct = () => async(dispatch) => {
    try{

        dispatch( {type: PRODUCT_LIST_REQUEST} );
        // const { data } = await Axios.get("/shopping"); http://localhost:5000
        const { data } = await Axios.get("http://localhost:5000/products");
        dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data })
    }catch(error){
        
        dispatch({ type: PRODUCT_LIST_FAIL, payload: error.message })
    }
}

const detailsProduct = (productId) => async (dispatch) => {
    try {
        dispatch({type: PRODUCT_DETAILS_REQUEST, payload: productId});
        // const { data } = await Axios.get("/product/" + productId);
        const { data } = await Axios.get("http://localhost:5000/products/" + productId);
        dispatch({type: PRODUCT_DETAILS_SUCCESS, payload: data });
    } catch (error){
        dispatch({ type: PRODUCT_DETAILS_FAIL, payload: error.message });
    }    
}

const saveProduct = (product) => async(dispatch, getState) => {
    try{
        dispatch({ type: PRODUCT_SAVE_REQUEST, payload: product });
        const { userLogin: {userInfo} } = getState();
        if(!product._id){
            const { data } = await Axios.post("http://localhost:5000/products/add", product, {
                headers: {
                    'Authorization': 'Bearer ' + userInfo.token
                }
            });
            dispatch({ type: PRODUCT_SAVE_SUCCESS, payload: data });
        }else{
            const { data } = await Axios.put("http://localhost:5000/products/add/" + product._id, product, {
                headers: {
                    'Authorization': 'Bearer ' + userInfo.token
                }
            });
            dispatch({ type: PRODUCT_SAVE_SUCCESS, payload: data });
        }

    }catch(error){
        dispatch({ type: PRODUCT_SAVE_FAIL, payload: error.message});
    }
}

const deleteProduct = (productId) => async (dispatch, getState) => {
    try {
        const { userLogin: {userInfo} } = getState();
        dispatch({type: PRODUCT_DELETE_REQUEST, payload: productId});
        const { data } = await Axios.delete("http://localhost:5000/products/" + productId, {
            headers: {
                Authorization: 'Bearer ' + userInfo.token
            }    
        });
        dispatch({type: PRODUCT_DELETE_SUCCESS, payload: data, success: true });
    } catch (error){
        dispatch({ type: PRODUCT_DELETE_FAIL, payload: error.message });
    }    
}

export { ListProduct, detailsProduct, saveProduct, deleteProduct }