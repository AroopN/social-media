import React from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import store from "./store"
import { Provider} from "react-redux"
const App = () => {
  return (
      <Router>
        <Provider store={store}>
          <Header/>
            <Switch>
                <Route path="/Login" exact component={LoginPage} />
                <Route path="/Register" exact component={RegisterPage} />
                <Route path="/" exact component={LandingPage} />
            </Switch>
            <Footer/>
        </Provider>
      </Router>
  );
}

export default App

