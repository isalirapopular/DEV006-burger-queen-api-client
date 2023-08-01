import axios from 'axios';

export async function login(email, password) {
  const { data } = await axios.post('http://localhost:8080/login', {
    email,
    password,
  });
  console.log(data, "Aqui se imprime la data login")
  return data;
}

export async function products(token) {
  const response = await axios.get('http://localhost:8080/products', {
    headers: {
      authorization: 'bearer ' + token,
    },
  });
  return response.data;
}





