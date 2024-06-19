const axios = require('axios');

const getAuthToken = async () => {
  try {
    const response = await axios.post('http://20.244.56.144/test/auth', {
      companyName: "goMart",
      clientId: "37bb493c-73d3-47ea-8675-21f66ef9b735", 
      clientSecret: "XOyo1ORPasKWOdAN", 
      ownerName: "Rahul",
      ownerEmail: "rahul@abc.edu",
      rollNo: "1"
    });

    console.log('Authorization Token:', response.data);
  } catch (error) {
    console.error('Error obtaining authorization token:', error.response ? error.response.data : error.message);
  }
};

getAuthToken();