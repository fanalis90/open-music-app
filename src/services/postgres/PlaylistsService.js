const { Pool } = require("pg");
const { nanoid } = require("nanoid");
const InvariantError = require("../../exceptions/InvariantError");
const NotFoundError = require("../../exceptions/NotFoundError");
const AuthorizationError = require("../../exceptions/AuthorizationError");
const { songsPlaylistDTM } = require("../../utils");

class PlaylistsService {
  constructor() {
    this._pool = new Pool();
  }

  async addPlaylist({ name, userId }) {
    await this.verifyNewPlaylist(name);
    const id = nanoid(16);

    const query = {
      text: "INSERT INTO playlists (id, name, user_id) VALUES ($1, $2, $3) RETURNING id",
      values: [id, name, userId],
    };

    const result = await this._pool.query(query);

    if (!result.rows[0].id) {
      throw new InvariantError("Playlist gagal ditambahkan");
    }

    return result.rows[0].id;
  }

  async getPlaylists(userId) {
    const query = {
      text: `SELECT playlists.id , playlists.name, users.username FROM playlists JOIN users ON playlists.user_id = users.id WHERE playlists.user_id = $1 OR users.id = $1 GROUP BY playlists.id, playlists.name, users.username`,
      values: [userId],
    };
    const result = await this._pool.query(query);
    return result.rows;
  }

  async deletePlaylistById(id) {
    const query = {
      text: "DELETE FROM playlists WHERE id = $1 RETURNING id",
      values: [id],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError("Data tidak ditemukan");
    }
  }

  async addSongToPlaylist({ playlistId, userId, songId }) {
    await this.verifyAddSongToPlaylist(songId);
    await this.verifyPlaylistOwner(playlistId.id, userId);

    const id = nanoid(16);
    const query = {
      text: "INSERT INTO songs_playlist VALUES ($1, $2, $3, $4) RETURNING id",
      values: [id, playlistId.id, userId, songId],
    };

    const result = await this._pool.query(query);

    if (!result.rows[0].id) {
      throw new InvariantError("Song gagal ditambahkan");
    }

    return result.rows[0].id;
  }

  async getSongsFromPlaylistById(playlistId) {
    const query = {
      text: "SELECT songs_playlist.playlist_id , playlists.name, users.username, songs.id, songs.title, songs.performer FROM playlists JOIN songs_playlist ON songs_playlist.playlist_id = playlists.id JOIN songs ON songs_playlist.song_id = songs.id JOIN users ON playlists.user_id = users.id WHERE playlists.id = $1 OR songs_playlist.playlist_id = $1 GROUP BY songs_playlist.playlist_id, playlists.name, songs.performer, songs.id, songs.title, users.username",
      values: [playlistId],
    };
    const result = await this._pool.query(query);
    return result.rows.reduce(songsPlaylistDTM, {});
  }

  async deleteSongFromPlaylistById(id, songId) {
    const query = {
      text: "DELETE FROM songs_playlist WHERE song_id = $1 AND playlist_id = $2 RETURNING id",
      values: [songId, id],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError("Data tidak ditemukan");
    }
  }

  async verifyNewSongInPlaylist(songId) {
    const query = {
      text: "SELECT songs FROM playlists WHERE NOT $1 = ANY (songs)",
      values: [songId],
    };

    const result = await this._pool.query(query);

    // const matchingItems = array.filter((item) => item === songId);

    if (result.rows.length > 0) {
      throw new InvariantError("Gagal menambahkan Song. nama sudah ada.");
    }
  }

  async verifyNewPlaylist(playlistName) {
    const query = {
      text: "SELECT name FROM playlists WHERE name = $1",
      values: [playlistName],
    };

    const result = await this._pool.query(query);

    if (result.rows.length > 0) {
      throw new InvariantError("Gagal menambahkan playlist. nama sudah ada.");
    }
  }

  async verifyPlaylistOwner(id, owner) {
    const query = {
      text: "SELECT * FROM playlists WHERE id = $1",
      values: [id],
    };
    const result = await this._pool.query(query);
    if (!result.rows.length) {
      throw new NotFoundError("Playlist tidak ditemukan");
    }

    const playlist = result.rows[0];

    if (playlist.user_id !== owner) {
      throw new AuthorizationError("Anda tidak berhak mengakses resource ini");
    }
  }

  async verifyAddSongToPlaylist(songId) {
    const query = {
      text: "SELECT * FROM songs WHERE id = $1",
      values: [songId],
    };
    const result = await this._pool.query(query);
    if (!result.rows.length) {
      throw new NotFoundError("song tidak ditemukan");
    }
  }
}
module.exports = PlaylistsService;
