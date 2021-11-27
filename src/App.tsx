import React from 'react';
import './App.css';
import SingleCard from './Components/SingleCard';

const cardImages = [
  { src: '/insects/black_ant.svg', alt: 'Black ant' },
  { src: '/insects/black_beetle.svg', alt: 'Black beetle' },
  { src: '/insects/black_grasshopper.svg', alt: 'Black Grasshopper' },
  { src: '/insects/black_ladybug.svg', alt: 'Black Ladybug' },
  { src: '/insects/black_mosquito.svg', alt: 'Black mosquito' },
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
    // eslint-disable-next-line no-unused-expressions
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  return (
    <div className="App md:flex items-center h-screen">
      {/* Board */}
      <main id="gameBoard" className="w-3/4 flex">
        {/* Grid */}
        <div className="grid grid-cols-8 gap-4 mx-auto">
          {cards.map((card: any) => (
            <SingleCard key={card.id} data={card} handleChoice={handleChoice} />
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
