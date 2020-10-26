import React, { useState, useEffect } from "react";
import "../styles/cards.css";
import Card from "./Card";
import CardData from "../data/data.json";
import { FormattedMessage, useIntl } from "react-intl";
import Select from "react-select";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import { makeStyles } from "@material-ui/core/styles";

function Cards(props) {
  const intl = useIntl(); // intl extracted from useIntl hook

  const [toggleGroupValue, setToggleGroupValue] = useState("game");
  const [deck, setDeck] = useState([]);
  const [cardList, setCardList] = useState([]);
  const [search, setSearch] = useState("");
  const [typeOptions] = useState([
    { value: "hero", label: intl.formatMessage({ id: "app.card.type.hero" }) },
    {
      value: "challenge",
      label: intl.formatMessage({ id: "app.card.type.challenge" })
    },
    { value: "item", label: intl.formatMessage({ id: "app.card.type.item" }) },
    {
      value: "cursed-item",
      label: intl.formatMessage({ id: "app.card.type.cursed-item" })
    },
    {
      value: "modifier",
      label: intl.formatMessage({ id: "app.card.type.modifier" })
    },
    {
      value: "monster",
      label: intl.formatMessage({ id: "app.card.type.monster" })
    }
  ]);
  const [classOptions] = useState([
    { value: "bard", label: intl.formatMessage({ id: "app.card.class.bard" }) },
    {
      value: "fighter",
      label: intl.formatMessage({ id: "app.card.class.fighter" })
    },
    {
      value: "guardian",
      label: intl.formatMessage({ id: "app.card.class.guardian" })
    },
    {
      value: "ranger",
      label: intl.formatMessage({ id: "app.card.class.ranger" })
    },
    {
      value: "thief",
      label: intl.formatMessage({ id: "app.card.class.thief" })
    },
    {
      value: "wizard",
      label: intl.formatMessage({ id: "app.card.class.wizard" })
    },
    {
      value: "druid",
      label: intl.formatMessage({ id: "app.card.class.druid" })
    },
    {
      value: "sorcerer",
      label: intl.formatMessage({ id: "app.card.class.sorcerer" })
    },
    {
      value: "warrior",
      label: intl.formatMessage({ id: "app.card.class.warrior" })
    }
  ]);

  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedClasses, setSelectedClasses] = useState([]);

  const searchCards = () => {
    const data = CardData.items;
    if (data) {
      setCardList(
        data.filter((card) => {
          return (
            card.name.toLowerCase().includes(search.toLowerCase()) &&
            (selectedTypes.some(
              (selectedType) => card.type === selectedType.value
            ) ||
              selectedTypes.length === 0) &&
            (selectedClasses.some(
              (selectedClass) => card.class === selectedClass.value
            ) ||
              selectedClasses.length === 0)
          );
        })
      );
    }
  };

  useEffect(() => {
    searchCards();
  }, []);

  useEffect(() => {
    searchCards();
  }, [search, selectedTypes, selectedClasses]);

  const onSearchInputChange = (search) => {
    setSearch(search);
  };

  const onTypeChange = (event) => {
    setSelectedTypes(event || []);
  };

  const onClassChange = (event) => {
    setSelectedClasses(event || []);
  };

  const typePlaceholder = intl.formatMessage({
    id: "app.select.type.placeholder"
  });

  const classPlaceholder = intl.formatMessage({
    id: "app.select.class.placeholder"
  });

  const inputSearchPlaceholder = intl.formatMessage({
    id: "app.cards.label.search"
  });

  const isCardInDeck = (translationKey) => {
    return deck.some(
      (card) => !!card && card.translationKey === translationKey
    );
  };

  const addToDeck = (event, card) => {
    event.stopPropagation();
    if (!isCardInDeck(card.translationKey) && !!card) {
      setDeck([...deck, card]);
    }
  };

  const removeFromDeck = (event, card) => {
    event.stopPropagation();
    if (isCardInDeck(card.translationKey) && !!card) {
      setDeck(
        deck.filter(
          (deckItem) => deckItem.translationKey !== card.translationKey
        )
      );
    }
  };

  const toggleGroupChange = (event, value) => {
    setToggleGroupValue(value);
  };

  return (
    <div className="cardsContent">
      <div className="search">
        <div className="search-name">
          <input
            value={search}
            placeholder={inputSearchPlaceholder}
            className="inputSearch"
            type="text"
            width="100%"
            onChange={(e) => onSearchInputChange(e.target.value)}
          />
        </div>
        <div className="search-type">
          <Select
            placeholder={typePlaceholder}
            onChange={onTypeChange}
            isMulti={true}
            className="type-select"
            options={typeOptions}
          />
        </div>
        <div className="search-class">
          <Select
            placeholder={classPlaceholder}
            onChange={onClassChange}
            isMulti={true}
            className="type-select"
            options={classOptions}
          />
        </div>
        <div className="search-deck">
          <ToggleButtonGroup
            exclusive
            aria-label="text alignment"
            value={toggleGroupValue}
            onChange={toggleGroupChange}
          >
            <ToggleButton value="deck" aria-label="right aligned">
              <span>Deck</span>
            </ToggleButton>
          </ToggleButtonGroup>
        </div>
      </div>
      <div className="cards">
        {toggleGroupValue !== "deck" ? (
          cardList.length > 0 ? (
            cardList.map((item, index) => {
              return (
                <Card
                  key={index}
                  card={item}
                  addToDeckDisabled={isCardInDeck(item.translationKey)}
                  addToDeckClick={addToDeck}
                  removeFromDeckClick={removeFromDeck}
                />
              );
            })
          ) : (
            <span>
              <FormattedMessage
                id="app.cards.label.no.card.found"
                defaultMessage="No card found with current filter."
              />
            </span>
          )
        ) : deck.length > 0 ? (
          deck.map((item, index) => {
            return (
              <Card
                key={index}
                card={item}
                addToDeckDisabled={isCardInDeck(item.translationKey)}
                addToDeckClick={addToDeck}
                removeFromDeckClick={removeFromDeck}
              />
            );
          })
        ) : (
          <span>
            <FormattedMessage
              id="app.cards.label.no.card.in.deck"
              defaultMessage="No cards found in deck."
            />
          </span>
        )}
      </div>
    </div>
  );
}

export default Cards;
