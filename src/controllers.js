const axios = require('axios');
const { generateProductId, sortProducts, paginateProducts } = require('./utils');
require('dotenv').config();

const ECOMMERCE_API_URL = process.env.ECOMMERCE_API_URL;
const AUTH_TOKEN = 'your_authorization_token_here'; // Replace with actual token

const getTopProducts = async (req, res) => {
  const { categoryname } = req.params;
  const { n = 10, page = 1, sort, order = 'asc' } = req.query;

  try {
    const responses = await Promise.all([
      axios.get(`${ECOMMERCE_API_URL}/company1/categories/${categoryname}`, {
        headers: { Authorization: `Bearer ${AUTH_TOKEN}` }
      }),
      axios.get(`${ECOMMERCE_API_URL}/company2/categories/${categoryname}`, {
        headers: { Authorization: `Bearer ${AUTH_TOKEN}` }
      }),
      axios.get(`${ECOMMERCE_API_URL}/company3/categories/${categoryname}`, {
        headers: { Authorization: `Bearer ${AUTH_TOKEN}` }
      }),
      axios.get(`${ECOMMERCE_API_URL}/company4/categories/${categoryname}`, {
        headers: { Authorization: `Bearer ${AUTH_TOKEN}` }
      }),
      axios.get(`${ECOMMERCE_API_URL}/company5/categories/${categoryname}`, {
        headers: { Authorization: `Bearer ${AUTH_TOKEN}` }
      })
    ]);

    let products = responses.flatMap(response => response.data.products);

    products = products.map(product => ({
      ...product,
      id: generateProductId(product)
    }));

    if (sort) {
      products = sortProducts(products, sort, order);
    }

    const paginatedProducts = paginateProducts(products, n, page);

    res.json(paginatedProducts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};

const getProductDetails = async (req, res) => {
  const { categoryname, productid } = req.params;

  try {
    const responses = await Promise.all([
      axios.get(`${ECOMMERCE_API_URL}/company1/categories/${categoryname}/products/${productid}`, {
        headers: { Authorization: `Bearer ${AUTH_TOKEN}` }
      }),
      axios.get(`${ECOMMERCE_API_URL}/company2/categories/${categoryname}/products/${productid}`, {
        headers: { Authorization: `Bearer ${AUTH_TOKEN}` }
      }),
      axios.get(`${ECOMMERCE_API_URL}/company3/categories/${categoryname}/products/${productid}`, {
        headers: { Authorization: `Bearer ${AUTH_TOKEN}` }
      }),
      axios.get(`${ECOMMERCE_API_URL}/company4/categories/${categoryname}/products/${productid}`, {
        headers: { Authorization: `Bearer ${AUTH_TOKEN}` }
      }),
      axios.get(`${ECOMMERCE_API_URL}/company5/categories/${categoryname}/products/${productid}`, {
        headers: { Authorization: `Bearer ${AUTH_TOKEN}` }
      })
    ]);

    const productDetails = responses.find(response => response.data.product)?.data.product;

    if (productDetails) {
      res.json(productDetails);
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch product details' });
  }
};

module.exports = { getTopProducts, getProductDetails };
