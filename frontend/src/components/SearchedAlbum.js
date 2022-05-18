const albumCardStyle = {
  height: "400px",
  width: "310px",
  display: "inline-block",
  margin: "3%",
  boxSizing: "border-box",
};

const SearchedAlbum = ({ info }) => {
  const artistList = info.artists.map((artist) => {
    return artist;
  });

  const imageList = info.images.map((image) => {
    return image;
  });

  const postBodyModel = {
    album_type: info.album_type,
    artists: artistList,
    spotify_url: info.external_urls.spoitfy, // external_urls.spotify
    href: info.href,
    spotify_id: info.id,
    images: imageList,
    name: info.name,
    release_date: info.release_date,
    total_tracks: info.total_tracks,
    type: info.type,
    uri: info.uri,
  };

  const postOptions = {
    method: "POST",
    body: JSON.stringify(postBodyModel),
    headers: {
      "Content-Type": "application/json",
    },
  };

  const handleAddRecordToCollection = () => {
    fetch("http://localhost:5000/api/vinylcollection", postOptions)
      .then((response) => {
        console.log(response);
        console.log(postOptions.body);
        return response;
      })
      .catch((err) => console.log(err));
  };

  return (
    <div key={info.id} style={albumCardStyle}>
      <h3>{info.name}</h3>
      <h5>Artist: {info.artists[0].name}</h5>
      <button onClick={() => handleAddRecordToCollection()}>Add</button>
      <img alt={info.name} src={info.images[1].url} />
    </div>
  );
};

export default SearchedAlbum;

// title={album.name}
//                   artist={album.artists[0].name}
//                   cover={album.images[1].url}
//                   albumInfo={album}
