/* eslint-disable no-unused-vars */
interface propsInterface {
  data: {
    src: string;
    alt: string;
    id: number;
  };
  handleChoice: (data: any) => void;
  flipped: boolean;
  disabled: boolean;
}

export default function singleCard({
  data,
  handleChoice,
  flipped,
  disabled,
}: propsInterface) {
  // card's data
  const { src, alt } = data;

  // clickHandler function
  const clickHandler = () => {
    if (!disabled) {
      handleChoice(data);
    }
  };

  return (
    <div className="card">
      <div className={flipped ? 'flipped' : ''}>
        <img width="50px" src={src} alt="frontOne" className="frontOne" />
        <button style={{ width: 50 }} type="button" onClick={clickHandler}>
          <img src="/cardCover.svg" alt="backOne" className="backOne" />
        </button>
      </div>
    </div>
  );
}
