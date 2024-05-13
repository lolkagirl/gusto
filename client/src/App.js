import { useContext, useEffect, useState } from "react";
import "./App.css";
import AppRouter from "./components/AppRouter";
import Header from "./components/Header";
import WebFont from "webfontloader";
import { Context } from ".";
import { check } from "./http/userAPI";
import { Spinner } from "react-bootstrap";
import { observer } from "mobx-react-lite";
import { Footer } from "./components/Footer";

const App = observer(() => {
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Montserrat", "MonteCarlo"],
      },
    });
  }, []);

  const { user } = useContext(Context);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      check()
        .then((data) => {
          user.setUser(true);
          user.setIsAuth(true);
        })
        .finally(() => setLoading(false));
    }, 1000);
  }, []);

  if (loading) {
    <Spinner animation="border" variant="warning" />;
  }

  return (
    <div>
      {/* <BrowserRouter> */}
      <Header />
      <AppRouter />
      <Footer/>
      {/* </BrowserRouter> */}
    </div>
  );
});

export default App;
