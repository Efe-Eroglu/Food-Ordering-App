export const addToCart = (item) => {
  return {
    type: "ADD_TO_CART",
    payload: item,
  };
};

export const removeFromCart = (id) => {
  return {
    type: "REMOVE_FROM_CART",
    payload: id,
  };
};

export const increaseQuantity = (itemId) => {
  return {
    type: "INCREASE_QUANTITY",
    payload: itemId,
  };
};

export const decreaseQuantity = (id) => {
  return {
    type: "DECREASE_QUANTITY",
    payload: id,
  };
};

export const clearCart = () => {
  return {
    type: "CLEAR_CART",
  };
};
