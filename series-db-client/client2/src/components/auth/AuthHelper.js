import decode from 'jwt-decode'

export default class AuthHelper {
  constructor(domain) {
    this.domain = domain || "http://192.168.99.100:3000"; // API server domain
  }
  login = (login, password) => {
    return this.fetch(`http://192.168.99.100:3000/login`, {
      method: "POST",
      body: JSON.stringify({
        login,
        password
      })
    }).then(res => {
      this.setToken(res.token);
      return Promise.resolve(res);
    });
  };

  loggedIn = () => {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  };

  isTokenExpired = token => {
    try {
      const decoded = decode(token);
      if (decoded.exp < Date.now() / 1000) {
        return true;
      } else return false;
    } catch (err) {
      console.log("expired check failed!");
      return false;
    }
  };

  setToken = idToken => {
    localStorage.setItem("id_token", idToken);
  };

  getToken = () => {
    return localStorage.getItem("id_token");
  };

  logout = () => {
    localStorage.removeItem("id_token");
  };

  getConfirm = () => {
    let answer = decode(this.getToken());
    console.log(answer);
    return answer;
  };

  fetch = (url, options) => {
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json"
    };
    // Setting Authorization header
    // Authorization: Bearer xxxxxxx.xxxxxxxx.xxxxxx
    if (this.loggedIn()) {
      headers["Authorization"] = "Bearer " + this.getToken();
    }

    return fetch(url, {
      headers,
      ...options
    })
      .then(this._checkStatus)
      .then(response => response.json());
  };

  _checkStatus = response => {
    if (response.status >= 200 && response.status < 300) {
      return response;
    } else {
      var error = new Error(response.statusText);
      error.response = response;
      throw error;
    }
  };
}
