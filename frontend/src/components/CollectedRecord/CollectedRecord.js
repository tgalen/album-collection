const CollectedRecord = ({ recordDetails }) => {
  const deletOptions = {
    method: "DELETE",
  };
  const handleDeleteRecordFromCollection = () => {
    fetch(
      `http://localhost:5000/api/vinylcollection/${recordDetails._id}`,
      deletOptions
    )
      .then((response) => {
        console.log(response);
      })
      .catch((err) => console.log(err));
  };
  console.log(recordDetails);
  return (
    <div>
      <img alt={recordDetails.name} src={recordDetails.images[2].url} />
      <h5>{recordDetails.name}</h5>
      <h5>{recordDetails.artists[0].name}</h5>
      <button onClick={() => handleDeleteRecordFromCollection()}>Delete</button>
    </div>
  );
};

export default CollectedRecord;
