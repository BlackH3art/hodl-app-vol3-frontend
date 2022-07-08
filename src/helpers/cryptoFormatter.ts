export const cryptoFormatter = (quantity: number) => {

  if(quantity >= 1000000) {
    return quantity.toFixed(2);
  } else if(quantity >= 100) {
    return quantity.toFixed(4);
  } else if(quantity === 0) {
    return quantity;
  } else {
    return quantity.toFixed(6);
  }
}