/* eslint-disable no-unused-vars */
interface propsInterface {
  data: {
    src: string;
    alt: string;
    id: number;
  };
  handleChoice: (data: any) => void;
}

export default function singleCard({ data, handleChoice }: propsInterface) {
  const { src, alt } = data;

  // clickHandler function
  const clickHandler = () => {
    handleChoice(data);
  };

  return (
    <div className="card">
      <div>
        <img src={src} alt={alt} className="frontOne" />
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
