import "./RecordDisplay.css";

const RecordDisplay = ({ record }) => {
  let image = record.images.medium;
  return (
    <div className="record-display-container">
      <img src={record.images.large} />
      <div className="record-title-container">
        <h4>{record.name}</h4>
      </div>
    </div>
  );
};

export default RecordDisplay;
