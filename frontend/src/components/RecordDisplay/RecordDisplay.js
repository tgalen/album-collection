import "./RecordDisplay.css";

const RecordDisplay = ({ record }) => {
  return (
    <div
      className="record-display-container"
      style={{
        backgroundImage: `url("${record.images.large}`,
      }}
    ></div>
  );
};

export default RecordDisplay;
