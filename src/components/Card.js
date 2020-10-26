import React, { useState } from "react";
import "../styles/card.css";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import { FormattedMessage } from "react-intl";

function Card(props) {
  const [showDescription, setShowDescription] = useState(false);

  const toggleShowDescription = () => {
    setShowDescription(!showDescription);
  };

  return (
    <div
      className={
        props.card.type === "monster" || props.card.type === "party-leader"
          ? "customCard-xl"
          : "customCard"
      }
      onClick={toggleShowDescription}
      onBlur={toggleShowDescription}
    >
      <img
        src={"../images/cards/" + props.card.image}
        alt={props.card.image + " not found"}
      />
      {showDescription ? (
        <div
          className={
            props.card.type === "monster" || props.card.type === "party-leader"
              ? "customCardDetail-xl"
              : "customCardDetail"
          }
        >
          <div className="cardName"></div>
          <div className="cardType">
            {props.addToDeckDisabled ? (
              <Button
                className="addDeck"
                variant="contained"
                color="secondary"
                onClick={(event) => {
                  props.removeFromDeckClick(event, props.card);
                }}
                startIcon={<RemoveIcon />}
              >
                Remove from deck
              </Button>
            ) : (
              <Button
                className="addDeck"
                variant="contained"
                color="primary"
                onClick={(event) => {
                  props.addToDeckClick(event, props.card);
                }}
                startIcon={<AddIcon />}
              >
                Add to deck
              </Button>
            )}
          </div>
          <div className="cardDescription">
            <span>
              <FormattedMessage
                id={props.card.description}
                defaultMessage={props.card.description}
                values={{
                  br: <br />
                }}
              />
            </span>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default Card;
