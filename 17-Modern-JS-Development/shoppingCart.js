// Exporting module
console.log('Exporting module');

// Blocking code demo (top-level await)
// console.log('Start fetching users');
// await fetch('https://jsonplaceholder.typicode.com/users');
// console.log('Finished fetching users');

// These are local to this module
const shippingCost = 10;
export const cart = [];

// There are two types of exports - Named and default
// Named exports are the simplest way of exporting something because
// all we have to do is put export in front of anything we want to
// export

// Named export
// Keep in mind that exports always need to happen in top level code
export const addToCart = function (product, quantity) {
  cart.push({ product, quantity });
  console.log(`${quantity} ${product} added to cart`);
};

// Can also export multiple things when using named exports
const totalPrice = 237;
const totalQuantity = 23;

export { totalPrice, totalQuantity as tq };

// Usually we only use default exports when we only want to export
// one thing per module. No name given, name is given during import
export default function (product, quantity) {
  cart.push({ product, quantity });
  console.log(`${quantity} ${product} added to cart`);
}
