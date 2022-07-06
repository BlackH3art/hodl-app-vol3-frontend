const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD'
});

export const usdFormatter = (price: number) => {

  if(price) {
    return formatter.format(price);
  } else {
    return '-'
  }
}