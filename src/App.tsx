import React, { useEffect } from 'react';
import './App.css';
import SingleCard from './Components/SingleCard';

const cardImages = [
  { src: '/insects/black_ant.svg', matched: false },
  { src: '/insects/black_beetle.svg', matched: false },
  { src: '/insects/black_grasshopper.svg', matched: false },
  { src: '/insects/black_ladybug.svg', matched: false },
  { src: '/insects/black_mosquito.svg', matched: false },
];

interface cardsInterface {
  id: number;
  src: string;
  alt: string;
}

function App() {
  const [cards, setCards] = React.useState<cardsInterface | any>([]);
  const [turns, setTurns] = React.useState(0);
  const [choiceOne, setChoiceOne] = React.useState<cardsInterface>();
  const [choiceTwo, setChoiceTwo] = React.useState<cardsInterface>();

  // suffle card
  const suffleCards = () => {
    const suffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setCards(suffledCards);
    setTurns(0);
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
    setTurns((prevTurns) => prevTurns + 1);
  };

  // comparing cards
  useEffect(() => {
    console.log(choiceOne, choiceTwo);

    if (choiceOne && choiceTwo) {
      if (choiceOne.src === choiceTwo.src) {
        setCards((prevCards: cardsInterface[]) =>
          prevCards.map((card: cardsInterface) => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            }
            return card;
          })
        );
        console.log(cards);

        setTimeout(() => {
          resetChoices();
        }, 1000);
      } else {
        setTimeout(() => {
          resetChoices();
        }, 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  // render
  return (
    <div className="App md:flex items-center h-screen">
      {/* Board */}
      <main id="gameBoard" className="w-3/4 flex">
        {/* Grid */}
        <div className="grid grid-cols-8 gap-4 mx-auto">
          {cards.map((card: any) => (
            <SingleCard
              key={card.id}
              data={card}
              handleChoice={handleChoice}
              flipped={card === choiceOne || card === choiceTwo || card.matched}
            />
          ))}
        </div>
      </main>
      <header className="w-1/4">
        <h4 className="text-5xl text-gray-900">Memory Games</h4>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui libero
          sunt ipsa, exercitationem obcaecati nam aspernatur laborum cum
          expedita. Praesentium!
        </p>
        <button
          onClick={suffleCards}
          type="button"
          className="py-2 px-3 my-2 rounded-sm bg-blue-200"
        >
          New Game
        </button>
      </header>
    </div>
  );
}

export default App;
