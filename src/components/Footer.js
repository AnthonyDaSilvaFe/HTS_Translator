import React from "react";
import "../styles/footer.css";
import { FormattedMessage } from "react-intl";

export default class Header extends React.Component {
  render() {
    return (
      <div className="footer">
        <span>
          &copy;
          <FormattedMessage
            id="app.footer.all.rights.reserved"
            defaultMessage="All rights reserved"
          />
        </span>
      </div>
    );
  }
}
