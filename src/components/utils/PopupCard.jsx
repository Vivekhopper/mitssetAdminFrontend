const PopupCard = ({ details, setPopup }) => {
  const clickHandler = () => {
    setPopup(false);
  };
  return (
    <div className="popupMain" >
        <div className="backDrop" onClick={clickHandler}></div>
      <div className="popupSecondary">
        <button onClick={clickHandler}>&times;</button>
        <div className="detailsSection">
          Name :{details.name}
          <br />
          Gender :{details.gender}
          <br />
          Rank :{details.Rank}
          <br />
        </div>
      </div>
    </div>
  );
};

export default PopupCard;
