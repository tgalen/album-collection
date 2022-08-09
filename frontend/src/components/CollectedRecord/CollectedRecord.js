const CollectedRecord = ({ recordDetails }) => {
  return (
    <div>
      <img alt={recordDetails.name} src={recordDetails.images[2].url} />
      <h5>{recordDetails.name}</h5>
      <h5>{recordDetails.artists[0].name}</h5>
    </div>
  );
};

export default CollectedRecord;
