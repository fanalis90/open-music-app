/* eslint-disable camelcase */

exports.up = (pgm) => {
  pgm.addConstraint("songs", "fk_songs.albumId_album.id", {
    foreignKeys: {
      columns: "album_id",
      references: "albums(id)",
      onDelete: "CASCADE",
    },
  });
};

exports.down = (pgm) => {
  pgm.dropConstraint("songs", "fk_songs.albumId_album.id");
};
