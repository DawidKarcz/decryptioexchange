// Importing needed liabries
import axios from "axios";

const API_URL = "http://localhost:8080/auth/";

class AuthorizeUser {
  login(username, password) {
    return axios
      .post(API_URL + "login", {
        username,
        password,
      })
      .then((response) => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(name, username, email, password) {
    return axios.post(API_URL + "register", {
      name,
      username,
      email,
      password,
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }
}

export default new AuthorizeUser();
