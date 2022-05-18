const collectionStyle = { textAlign: "center" };

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
  transition: "0.1s",
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
    <div style={collectionStyle}>
      <h1>Collection</h1>
      {collection ? (
        collection.map((album) => {
          return (
            <div key={album._id}>
              <h3>{album.name}</h3>
            </div>
          );
        })
      ) : (
        <h1>Such empty. Add some records by searching</h1>
      )}
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
