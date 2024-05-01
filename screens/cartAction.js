export const addToCart = (item) => {
  return {
    type: 'ADD_TO_CART',
    payload: item
  };
};

export const removeFromCart = (id) => {
  return {
    type: 'REMOVE_FROM_CART',
    payload: id
  };
};
