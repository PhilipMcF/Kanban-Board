import { JwtPayload, jwtDecode } from 'jwt-decode';

class AuthService {
  getProfile() {
    // return the decoded token
    const token = this.getToken(); 
    if (token) {
      try {
        const decoded: JwtPayload = jwtDecode(token);
        return decoded; 
      } 
      catch (error) {
        console.error('Error decoding token:', error);
        return null;
      }
    }
    return null;
  }

  loggedIn() {
    // return a value that indicates if the user is logged in
    const token = this.getToken();
    return token !== '' && !this.isTokenExpired(); 
  }
  
  isTokenExpired() {
    // return a value that indicates if the token is expired
    try {
      const decoded = this.getProfile();

      if (decoded && decoded.exp){  // SHOULD CHECK IF DECODED TOKEN IS NOT NULL AND EXP CLAIM EXISTS
        const expTime = decoded.exp * 1000; // convert to milliseconds
        if (Date.now() >= expTime){
          localStorage.removeItem('id_token'); // REMOVE TOKEN IF EXPIRED
          return true;
        }
        else {
          return false;
        }
      }
      return false;
    }
    catch (err){
      console.log('Error decoding token: ', err);
      localStorage.removeItem('id_token'); // REMOVE TOKEN IF ERROR
      return true;
    }
  }

  getToken(): string {
    // return the token
    const loggedUser = localStorage.getItem('id_token') || '';
    return loggedUser;
  }

  login(idToken: string) {
    // set the token to localStorage
    localStorage.setItem('id_token', idToken);
    // redirect to the home page
    window.location.assign('/');
  }

  logout() {
    // remove the token from localStorage
    localStorage.removeItem('id_token');
    // redirect to the login page
    window.location.assign('/');
  }
}

export default new AuthService();
