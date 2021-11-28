import React, { useEffect } from 'react';
import './App.css';
import SingleCard from './Components/SingleCard';

const cardImages: { src: string; matched: boolean }[] = [];

for (let i = 1; i < 33; i += 1) {
  cardImages.push({
    src: `/cards/Artboards_Diversity_Avatars_by_Netguru-${i}.svg`,
    matched: false,
  });
}

interface cardsInterface {
  id: number;
  src: string;
  alt: string;
}

function App() {
  const [cards, setCards] = React.useState<cardsInterface | any>([]);
  const [turns, setTurns] = React.useState('Player One');
  const [choiceOne, setChoiceOne] = React.useState<cardsInterface>();
  const [choiceTwo, setChoiceTwo] = React.useState<cardsInterface>();
  const [disabled, setDisabled] = React.useState(false);

  // suffle card
  const suffleCards = () => {
    const suffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setChoiceOne(undefined);
    setChoiceTwo(undefined);
    setCards(suffledCards);
    setTurns('Player One');
  };

  // choiceHandler
  const handleChoice = (card: cardsInterface) => {
    if (choiceOne) {
      setChoiceTwo(card);
    } else {
      setChoiceOne(card);
    }
  };

  // reset choices then increase turns
  const resetChoices = () => {
    setChoiceOne(undefined);
    setChoiceTwo(undefined);

    // Change Player
    if (turns === 'Player One') {
      setTurns('Player Two');
    } else {
      setTurns('Player One');
    }

    setDisabled(false);
  };

  // comparing cards
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src) {
        setCards((prevCards: cardsInterface[]) =>
          prevCards.map((card: cardsInterface) => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            }
            return card;
          }),
        );

        resetChoices();
      } else {
        setTimeout(() => {
          resetChoices();
        }, 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  // start new game when the page loaded
  useEffect(() => {
    suffleCards();
  }, []);

  // render
  return (
    <div className="App h-screen flex md:flex-row-reverse flex-col h-screen">
      {/* Header */}
      <header className="sm:w-4/12 flex flex-col justify-center p-6 md:p-0">
        <h4 className="text-3xl xl:text-5xl text-gray-900 mb-4">
          Memory Games
        </h4>
        <p className="mb-4">
          Turns:
          {'  '}
          <span className="text-gray-900">{turns}</span>
        </p>
        <div>
          <button
            onClick={suffleCards}
            type="button"
            className="py-2 px-3 my-2 rounded-sm bg-blue-200"
          >
            New Game
          </button>
        </div>
      </header>
      {/* Board */}
      <main
        id="gameBoard"
        className="sm:w-8/12 flex items-center pl-2 sm:pl-0 pr-6 md:p-6 xl:p-0"
      >
        {/* Grid */}
        <div className="grid grid-cols-8 gap-4 mx-auto">
          {cards.map((card: any) => (
            <SingleCard
              key={card.id}
              data={card}
              handleChoice={handleChoice}
              flipped={card === choiceOne || card === choiceTwo || card.matched}
              disabled={disabled}
            />
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;
