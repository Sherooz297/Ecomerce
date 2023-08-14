import {ADD_TO_CART,REMOVE_TO_CART, SAVE_SHIPPING_INFO} from "../constants/cartConstants"

export const cartReducer =(state={cartItems:[],shippingInfo:{}},action) =>{
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
             //adding the redecuer to remove the product from cart
             case REMOVE_TO_CART:
             return{
              ...state,
              cartItems:state.cartItems.filter((i) => i.product !== action.payload)
             }

             case SAVE_SHIPPING_INFO:
                return{
                    ...state,
                    shippingInfo:action.payload,
                    
                }


  
        default:
       return state
    }
}