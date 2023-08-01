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
  try {
    const response = await axios.get('http://localhost:8080/products', {
      headers: {
        authorization: 'bearer ' + token,
      },
    });
    return response.data;
  } catch (error) {
    throw error; // Rechazar la promesa con el error para que se maneje en el componente Home
  }
}





