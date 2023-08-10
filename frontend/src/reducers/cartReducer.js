import {ADD_TO_CART} from "../constants/cartConstants"

export const cartReducer =(state={cartItems:[]},action) =>{
    switch (action.type) {
        case ADD_TO_CART:
           const item = action.payload;             //here we are getting the product from action

           //here we are checking the poduct is already exist or not in the cartItems array

           const isItemExist = state.cartItems.find(
            (i) => i.product === item.product
           );
           if (isItemExist) {

            //here uf the produtc already exixt in the cart item array we are replacing the product
                return{
                    ...state,
                    cartItems:state.cartItems.map((i)=>
                    i.product === isItemExist.product ? item : i
                    )
                }
            
           } else {

            //here we are adding the iitem in the cartitem array if the product is already not exist in the cart item array
                return{
                    ...state,
                    cartItems:[...state.cartItems,item]
                }
           }
        default:
       return state
    }
}