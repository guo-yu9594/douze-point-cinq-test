import axios from "axios";

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET;
const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI;
const AUTHORIZE_URL = process.env.REACT_APP_AUTHORIZE_URL;
const TOKEN_URL = process.env.REACT_APP_TOKEN_URL;
const USER_INFO_URL = process.env.REACT_APP_USER_INFO_URL;

export default class AuthServices {
  static getOAuthURL() {
    const url = new URL(AUTHORIZE_URL);
    url.searchParams.append("client_id", CLIENT_ID);
    url.searchParams.append("redirect_uri", REDIRECT_URI);
    url.searchParams.append("response_type", "code");
    return decodeURIComponent(url);
  }

  static async getToken(code) {
    const data = {
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      grant_type: "authorization_code",
      code: code,
      redirect_uri: REDIRECT_URI,
      scope: "email",
    };

    try {
      const response = await axios.post(TOKEN_URL, data, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  static async getUserInfo(token) {
    try {
      const response = await axios.get(USER_INFO_URL, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
