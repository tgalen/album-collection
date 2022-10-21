import ArtistCard from "../ArtistCard/ArtistCard";
import NoRecordsToDisplay from "../NoRecordsToDisplay.js/NoRecordsToDisplay";
import "./ArtistList.css";

const ArtistList = ({ records }) => {
  if (!records) {
    return <NoRecordsToDisplay />;
  }
  return (
    <div>
      {records.map((record) => {
        return (
          <ArtistCard
            artist={record.artist}
            records={records}
            key={record.artist}
          />
        );
      })}
      ;
    </div>
  );
};

export default ArtistList;
