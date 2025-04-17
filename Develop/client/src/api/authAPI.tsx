import { UserLogin } from "../interfaces/UserLogin";

const login = async (userInfo: UserLogin) => {
  // TODO: make a POST request to the login route
  try {
    const response = await fetch('http://localhost:3000/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userInfo),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Error: ${errorData.message}` );
    }
    const data = await response.json();

    if (data.token) {
      localStorage.setItem('token', data.token);
    }
    return data;
    } catch (error) {
      console.error('Error during login:', error);
      throw error;  
  }
}



export { login };
