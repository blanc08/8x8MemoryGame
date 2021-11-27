/* eslint-disable no-unused-vars */
interface propsInterface {
  data: {
    src: string;
    alt: string;
    id: number;
  };
  handleChoice: (data: any) => void;
  flipped: boolean;
}

export default function singleCard({
  data,
  handleChoice,
  flipped,
}: propsInterface) {
  // card's data
  const { src, alt } = data;

  // clickHandler function
  const clickHandler = () => {
    handleChoice(data);
  };

  return (
    <div className="card">
      <div className={flipped ? 'flipped' : ''}>
        <img src={src} alt="frontOne" className="frontOne" />
        <button type="button" onClick={clickHandler}>
          <img
            width="90%"
            src="/cardCover.png"
            alt="backOne"
            className="backOne"
          />
        </button>
      </div>
    </div>
  );
}
