const songDTM = ({
  id,
  title,
  year,
  genre,
  performer,
  duration,
  album_id,
  created_at,
  updated_at,
}) => ({
  id,
  title,
  year,
  genre,
  performer,
  duration,
  albumId: album_id,
  createdAt: created_at,
  updatedAt: updated_at,
});

const albumDTM = ({ id, name, year, created_at, updated_at }) => ({
  id,
  name,
  year,
  createdAt: created_at,
  updatedAt: updated_at,
});

const songsPlaylistDTM = (accumulator, currentObject) => {
  if (!accumulator.id) {
    accumulator.id = currentObject.playlist_id;
    accumulator.name = currentObject.name;
    accumulator.username = currentObject.username;
    accumulator.songs = [];
  }
  accumulator.songs.push({
    id: currentObject.id,
    title: currentObject.title,
    performer: currentObject.performer,
  });

  return accumulator;
};

// const playlistDTM = ({id, name , username})
module.exports = { songDTM, albumDTM, songsPlaylistDTM };
