/* eslint-disable camelcase */

exports.up = (pgm) => {
  pgm.createTable("songs_playlist", {
    id: {
      type: "VARCHAR(50)",
      primaryKey: true,
    },
    playlist_id: {
      type: "TEXT",
      notNull: true,
    },
    user_id: {
      type: "TEXT",
      notNull: true,
    },
    song_id: {
      type: "TEXT",
      notNull: true,
    },
  });

  // Add the foreign key constraint
  pgm.addConstraint("songs_playlist", "fk_songs_playlist.songId_songs.id", {
    foreignKeys: {
      columns: "song_id",
      references: "songs(id)",
      onDelete: "CASCADE",
    },
  });

  // Add the foreign key constraint
  pgm.addConstraint(
    "songs_playlist",
    "fk_songs_playlist.playlistId_playlists.id",
    {
      foreignKeys: {
        columns: "playlist_id",
        references: "playlists(id)",
        onDelete: "CASCADE",
      },
    }
  );

  // Add the foreign key constraint
  pgm.addConstraint("songs_playlist", "fk_songs_playlist.userId_users.id", {
    foreignKeys: {
      columns: "user_id",
      references: "users(id)",
      onDelete: "CASCADE",
    },
  });
};

exports.down = (pgm) => {
  pgm.dropConstraint("songs_playlist", "fk_songs_playlist.songId_songs.id");

  pgm.dropConstraint(
    "songs_playlist",
    "fk_songs_playlist.playlistId_playlists.id"
  );

  pgm.dropConstraint("songs_playlist", "fk_songs_playlist.userId_users.id");

  pgm.dropTable("songs_playlist");
};
