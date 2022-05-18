const CollectedRecord = ({ recordDetails }) => {
  return (
    <div>
      <img alt={recordDetails.name} src={recordDetails.images[1].url} />
    </div>
  );
};

export default CollectedRecord;
