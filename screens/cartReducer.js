// cartReducer.js
const initialState = {
  cart: [],
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      const existingItemIndex = state.cart.findIndex(
        (item) => item.id === action.payload.id
      );

      if (existingItemIndex !== -1) {
        const updatedCart = [...state.cart];
        updatedCart[existingItemIndex].quantity += 1;
        return {
          ...state,
          cart: updatedCart,
        };
      } else {
        return {
          ...state,
          cart: [...state.cart, { ...action.payload, quantity: 1 }],
        };
      }
    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload),
      };
    case "INCREASE_QUANTITY":
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === action.payload
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      };
    case "DECREASE_QUANTITY":
      return {
        ...state,
        cart: state.cart
          .map((item) =>
            item.id === action.payload
              ? { ...item, quantity: item.quantity - 1 }
              : item
          )
          .filter((item) => item.quantity > 0), // 0'dan büyük olanları tut
      };

    case "CLEAR_CART":
      return {
        ...state,
        cart: [],
      };

    default:
      return state;
  }
};

export default cartReducer;
