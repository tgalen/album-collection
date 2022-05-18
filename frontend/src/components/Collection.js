import CollectedRecord from "./CollectedRecord";

const collectionContainerStyle = {
  display: "grid",
  gridAutoFlow: "column",
  gridAutoColumns: "17%",
  gap: "1%",
  overflowX: "auto",
  overscrollBehaviorInline: "contain",
  width: "100%",
};

const alphabetContainerStyle = {
  display: "flex",
  justifyContent: "space-around",
  borderRadius: "10px",
  width: "100%",
};

const letterContainerStyle = {
  background: "lightblue",
  width: "2.5%",
  borderRadius: "5px",
  display: "flex",
  justifyContent: "center",
};

const collectedRecordStyle = {
  padding: "1%",
};

const alphabet = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];

const Collection = ({ collection }) => {
  const handleMouseEnterLetter = (e) => {
    e.target.style.background = "yellow";
    e.target.style.cursor = "pointer";
  };

  const handleMouseLeaveLetter = (e) => {
    e.target.style.background = "lightblue";
  };

  return (
    <div>
      <h1>Collection</h1>
      <div style={collectionContainerStyle}>
        {collection ? (
          collection.map((album) => {
            return (
              <CollectedRecord
                style={collectedRecordStyle}
                key={album.spotify_id}
                recordDetails={album}
              />
            );
          })
        ) : (
          <h1>Such empty. Add some records by searching</h1>
        )}
      </div>
      <div style={alphabetContainerStyle}>
        {alphabet.map((letter) => {
          return (
            <div
              style={letterContainerStyle}
              onMouseEnter={handleMouseEnterLetter}
              onMouseLeave={handleMouseLeaveLetter}
              key={letter}
            >
              {letter}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Collection;
