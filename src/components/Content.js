import React from "react";
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  BrowserHistory
} from "react-router-dom";
import Cards from "./Cards";
import Rules from "./Rules";
import Header from "./Header";
import Footer from "./Footer";
import "../styles/content.css";
import "../styles/navbar.css";
import "../styles/bootstrap.min.css";
import { FormattedMessage } from "react-intl";

export default class Content extends React.Component {
  state = {
    langValue: this.props.getCurrentLang()
  };

  handleChange = (event) => {
    const newValue = event.target.value;
    this.setState({ langValue: newValue }, () =>
      this.props.onChangeLanguage(newValue)
    );
  };

  //Indicate if the link is active
  checkActive = (match, location) => {
    //some additional logic to verify you are in the home URI
    if (!location) return false;
    const { pathname } = location;
    return pathname === "/";
  };

  render() {
    return (
      <div className="content d-flex">
        <Router BrowserHistory={BrowserHistory}>
          <div className="h-100 d-flex flex-column minHeight-100vh">
            <div className="navigationBar align-content-start">
              <NavLink
                to="/"
                className="text-dark"
                activeClassName="active"
                isActive={this.checkActive}
              >
                <span>
                  <FormattedMessage
                    id="app.content.link.cards"
                    defaultMessage="Cards"
                  />
                </span>
              </NavLink>
              <NavLink
                to="/rules"
                className="text-dark"
                activeClassName="active"
              >
                <span>
                  <FormattedMessage
                    id="app.content.link.rules"
                    defaultMessage="Rules"
                  />
                </span>
              </NavLink>

              <select value={this.state.langValue} onChange={this.handleChange}>
                <option value="fr">Français</option>
                <option value="en">English</option>
              </select>
            </div>

            <Header />

            <Route
              exact
              path="/"
              component={() => <Cards deck={this.state.deck} />}
            />
            <Route path="/rules" component={Rules} />

            <Footer />
          </div>
        </Router>
      </div>
    );
  }
}
