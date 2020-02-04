import React from 'react';
import logo from './logo.svg';
import './App.css';
import AnimationComponent from './libs/AnimationContainer';

const useState = React.useState;

const cardData = [
  {
    title: "First Card",
    text: "Here is the first card to deisplay"
  },
  {
    title: "Second Card",
    text: "Now we have gone to the second card"
  },
  {
    title: "Last Card",
    text: "Now can we animate it?"
  }
]

function CardDisplay(props) {
  return <div className={"card"}>
    <span className={"title"}>{props.title}</span>
    <p>{props.text}</p>
  </div>;
}

function MainDisplay(props) {
  const [cardPos, setCardPos] = useState(0);

  var currentCard = <CardDisplay title={props.cards[cardPos].title} text={props.cards[cardPos].text} key={cardPos} />;

  var nextButton = <button onClick={
    (event) => {
      var nextPos = cardPos + 1;
      if (nextPos >= props.cards.length) {
        nextPos = 0;
      }
      setCardPos(nextPos);
    }
  }>
    {"Next"}
  </button>;

  return <div>
    <AnimationComponent>{currentCard}</AnimationComponent>
    {nextButton}
  </div>;
}

function App() {
  return (
    <MainDisplay cards={cardData}></MainDisplay>
  );
}

export default App;
