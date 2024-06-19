const axios = require('axios');

const registerCompany = async () => {
  try {
    console.log('Sending registration request...');
    const response = await axios.post('http://20.244.56.144/test/register', {
      companyName: 'goMart',
      ownerName: 'Rahul',
      rollNo: '1',
      ownerEmail: 'rahul@abc.edu',
      accessCode:'FKDLjg'
    });
    console.log('Registration successful:', response.data);
} catch (error) {
    if (error.response) {
      console.error('Error status:', error.response.status);
      console.error('Error data:', error.response.data);
    } else if (error.request) {
      console.error('No response received:', error.request);
    } else {
      console.error('Error setting up request:', error.message);
    }
  }
};
