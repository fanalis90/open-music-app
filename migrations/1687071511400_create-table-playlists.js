/* eslint-disable camelcase */

exports.up = (pgm) => {
  pgm.createTable("playlists", {
    id: {
      type: "VARCHAR(50)",
      primaryKey: true,
    },
    name: {
      type: "TEXT",
      unique: true,
      notNull: true,
    },
    user_id: {
      type: "TEXT",
    },
  });

  // Add the foreign key constraint
  pgm.addConstraint("playlists", "fk_playlists.userId_users.id", {
    foreignKeys: {
      columns: "user_id",
      references: "users(id)",
      onDelete: "CASCADE",
    },
  });
};

exports.down = (pgm) => {
  pgm.dropConstraint("playlists", "fk_playlists.userId_users.id");

  pgm.dropTable("playlists");
};
