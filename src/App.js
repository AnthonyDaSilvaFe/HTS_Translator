import React from "react";
import Content from "./components/Content";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import "./styles.css";
import "./styles/bootstrap.min.css";
import locale_en from "./translations/locale_en.json";
import locale_fr from "./translations/locale_fr.json";
import {IntlProvider} from 'react-intl';

library.add(faHome);

export default class App extends React.Component {
  state = {
    i18nConfig: {
      locale: "en",
      messages: []
    }
  };

  componentDidMount() {
    this.onChangeLanguage(navigator.language.split(/[-_]/)[0]);
  }

  onChangeLanguage = (lang) => {
    this.setState({
      i18nConfig: {
        locale: lang,
        messages: this.getMessagesFromLang(lang)
      }
    });
  };

  getMessagesFromLang = (lang) => {
    switch (lang) {
      case "fr":
        return locale_fr;
      case "en":
        return locale_en;
      default:
        return locale_en;
    }
  };

  getCurrentLang = () => {
    return this.state.i18nConfig.locale;
  };

  render() {
    return (
      <IntlProvider
        key={this.state.i18nConfig.locale}
        locale={this.state.i18nConfig.locale}
        messages={this.getMessagesFromLang(this.state.i18nConfig.locale)}
      >
        <Content
          onChangeLanguage={this.onChangeLanguage}
          getCurrentLang={this.getCurrentLang}
        />
      </IntlProvider>
    );
  }
}
