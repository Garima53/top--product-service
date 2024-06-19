const generateProductId = (product) => {
    return `${product.company}-${product.id}`;
  };
  
  const sortProducts = (products, sort, order) => {
    return products.sort((a, b) => {
      if (order === 'asc') {
        return a[sort] > b[sort] ? 1 : -1;
      } else {
        return a[sort] < b[sort] ? 1 : -1;
      }
    });
  };
  
  const paginateProducts = (products, n, page) => {
    const start = (page - 1) * n;
    const end = start + n;
    return products.slice(start, end);
  };
  
  module.exports = { generateProductId, sortProducts, paginateProducts };
  