import axios from 'axios';

export async function login(email, password) {
  const { data } = await axios.post('http://localhost:8080/login', {
    email,
    password,
  });
  console.log(data, "AQUÍ ESTÁ LA DATA")
  return data;
}

export async function products (token) {
  const productsData = await axios.get('http://localhost:8080/products', {
    Headers:{
      authorization: 'bearer ' + token
      
    }
})
return productsData.data;
}


