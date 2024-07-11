import "../App.css";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import AuthServices from "../services/AuthServices";

function Callback() {
  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");
  const [token, setToken] = useState(null);
  const [message, setMessage] = useState("Callbacked");
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const getToken = async () => {
      try {
        const data = await AuthServices.getToken(code);
        setToken(data.access_token);
      } catch (err) {
        setMessage("Could not get the token");
      }
    };

    if (code) getToken();
    else setMessage("Code not found");
  }, []);

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const data = await AuthServices.getUserInfo(token);

        console.log(data);
        setUserData(data);
      } catch (err) {
        setMessage("Could not get the user info");
      }
    };

    if (token) getUserInfo();
  }, [token]);

  return (
    <div className="App">
      <header className="App-header">
        {userData ? userData.email : message}
      </header>
    </div>
  );
}

export default Callback;
