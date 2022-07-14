import { useEffect, useState } from "react";
import styled from "styled-components";
import { CardContext } from "./CardContext";
import Card from "./components/Card";
function App() {
  const initialCards = [
    {
      id: 1,
      key: 1,
      img: "https://logos-world.net/wp-content/uploads/2021/08/Flash-Symbol.png",
      isFlipped: false,
      isFound: false,
    },
    {
      id: 2,
      key: 1,
      img: "https://logos-world.net/wp-content/uploads/2021/08/Flash-Symbol.png",
      isFlipped: false,
      isFound: false,
    },
    {
      id: 3,
      key: 2,
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Peace_sign.svg/800px-Peace_sign.svg.png",
      isFlipped: false,
      isFound: false,
    },
    {
      id: 4,
      key: 2,
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Peace_sign.svg/800px-Peace_sign.svg.png",
      isFlipped: false,
      isFound: false,
    },
    {
      id: 5,
      key: 3,
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Anarchy-symbol.svg/1024px-Anarchy-symbol.svg.png",
      isFlipped: false,
      isFound: false,
    },
    {
      id: 6,
      key: 3,
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Anarchy-symbol.svg/1024px-Anarchy-symbol.svg.png",
      isFlipped: false,
      isFound: false,
    },
    { id: 7, key: 4, img: "https://www.extinctionsymbol.info/extinctionsymbol.svg", isFlipped: false, isFound: false },
    { id: 8, key: 4, img: "https://www.extinctionsymbol.info/extinctionsymbol.svg", isFlipped: false, isFound: false },
    { id: 9, key: 5, img: "https://www.pisymbol.net/pi.png", isFlipped: false, isFound: false },
    { id: 10, key: 5, img: "https://www.pisymbol.net/pi.png", isFlipped: false, isFound: false },
    {
      id: 11,
      key: 6,
      img: "https://iex-website.s3.amazonaws.com/images/articles/career-training-usa/2014/kwanzaa-symbol-umoja.png",
      isFlipped: false,
      isFound: false,
    },
    {
      id: 12,
      key: 6,
      img: "https://iex-website.s3.amazonaws.com/images/articles/career-training-usa/2014/kwanzaa-symbol-umoja.png",
      isFlipped: false,
      isFound: false,
    },
  ];
  const [cardData, setCardData] = useState(initialCards);
  useEffect(() => {
    var wrap = document.querySelector(".cardWrapper");
    for (var i = wrap.children.length; i >= 0; i--) {
      wrap.appendChild(wrap.children[(Math.random() * i) | 0]);
    }
  }, []);
  const [won, setWon] = useState(false);
  useEffect(() => {
    if (cardData.every((obj) => obj.isFound)) {
      setWon(true);
    }
  }, [cardData]);
  const [tries, setTries] = useState(0);
  const [cardPair, setCardPair] = useState([
    { id: 0, key: 0 },
    { id: 0, key: 0 },
  ]);
  function selectCard(card, event) {
    if (!card.isFound) {
      setTries(tries + 1);
    }
    console.log(tries);
    setCardPair((prev) => {
      return [...prev.slice(1), { id: card.id, key: card.key }];
    });
    console.log(cardPair);
  }
  useEffect(() => {
    console.log(cardPair);
    if (cardPair[0].key == cardPair[1].key && cardPair[0].id != cardPair[1].id) {
      let newCards = cardData.map((card) => {
        if (card.key == cardPair[0].key || card.key == cardPair[1].key) {
          return { ...card, isFound: true };
        } else {
          return { ...card };
        }
      });
      setCardData(newCards);
      setCardPair([
        { id: 0, key: 0 },
        { id: 0, key: 0 },
      ]);
    } else {
      console.log("Not matching");
      //close both cards and reset to 00
      let newCards = cardData.map((card) => {
        return { ...card, isFlipped: false };
      });
      if (cardPair[0].id != 0) {
        setTimeout(() => {
          setCardPair([
            { id: 0, key: 0 },
            { id: 0, key: 0 },
          ]);
          setCardData(newCards);
        }, 700);
      }
    }
  }, [cardPair]);
  const foundStyle = {
    opacity: "0",
    transition: "0.5s",
    backgroundColor: "green",
  };
  const defaultStyle = {
    opacity: "1",
    transition: "0.5s",
  };
  const cardElements = cardData.map((card) => {
    return (
      <div
        key={card.id}
        onClick={
          card.isFound
            ? () => {
                console.log("ALREADY FOUND");
                return false;
              }
            : (event) => {
                selectCard(card, event);
              }
        }
        style={card.isFound ? foundStyle : defaultStyle}
      >
        <Card id={card.id - 1} />
      </div>
    );
  });
  useEffect(() => {
    if (won === false) {
      var wrap = document.querySelector(".cardWrapper");
      console.log(Array.from(wrap.children));
      for (var i = wrap.children.length; i >= 0; i--) {
        wrap.appendChild(wrap.children[(Math.random() * i) | 0]);
      }
    }
  }, [won]);
  function restartGame() {
    setCardData(initialCards);
    setWon(false);
    setTries(0);
  }
  return (
    <AppDiv className="App">
      <h1>Memory Game</h1>
      <AppWrap>
        {won && (
          <div className="wonGame">
            <h1>You won!</h1>
            <p>It took you {Math.ceil(tries / 2)} tries to get here!</p>
            <button onClick={restartGame}>Play again</button>
          </div>
        )}

        <div className="cardWrapper">
          {}
          <CardContext.Provider value={{ cardData, setCardData }}>
            {won ? undefined : cardElements}
          </CardContext.Provider>
        </div>
      </AppWrap>
    </AppDiv>
  );
}

export default App;
const AppDiv = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  h1 {
    margin: 50px 0;
    color: #fff;
    font-size: 50px;
    text-align: center;
  }
`;
const AppWrap = styled.div`
  display: flex;
  height: 90vh;
  padding: 0 50px;
  justify-content: center;
  align-items: center;
  h1 {
    color: #fff;
    font-size: 5em;
    padding: 0;
    margin: 0;
  }
  .cardWrapper {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-rows: 0.5fr;
    gap: 20px;
    /* margin-top: -120px; */
    @media only screen and (max-width: 1000px) {
      grid-template-columns: 1fr 1fr 1fr;
    }
  }
  .wonGame {
    button {
      width: 100%;
      background-color: #fff;
      border: none;
      padding: 10px 20px;
      margin-top: 20px;
      color: gray;
      &:hover {
        background-color: lightblue;
        color: #fff;
      }
    }
    p {
      text-align: center;
    }
  }
`;
