class PlaylistsHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;
  }

  async postPlaylistHandler(request, h) {
    this._validator.validatePostPlaylistPayload(request.payload);
    const { name } = request.payload;
    const { id: credentialId } = request.auth.credentials;
    const playlistId = await this._service.addPlaylist({
      name,
      userId: credentialId,
    });

    const response = h.response({
      status: "success",
      message: "Playlist berhasil ditambahkan",
      data: {
        playlistId,
      },
    });
    response.code(201);
    return response;
  }

  async getPlaylistsHandler(request) {
    const { id: credentialId } = request.auth.credentials;
    const playlists = await this._service.getPlaylists(credentialId);

    return {
      status: "success",
      data: {
        playlists,
      },
    };
  }

  async deletePlaylistByIdHandler(request, h) {
    const { id } = request.params;
    const { id: credentialId } = request.auth.credentials;
    await this._service.verifyPlaylistOwner(id, credentialId);
    await this._service.deletePlaylistById(id);

    return h.response({
      status: "success",
      message: "Playlist berhasil dihapus",
    });
  }

  async postSongToPlaylistHandler(request, h) {
    this._validator.validatePostSongToPlaylistBySongIdPayload(request.payload);
    const id = request.params;
    const { songId } = request.payload;
    const { id: credentialId } = request.auth.credentials;
    const songPlaylistId = await this._service.addSongToPlaylist({
      playlistId: id,
      userId: credentialId,
      songId,
    });

    const response = h.response({
      status: "success",
      message: "Song berhasil ditambahkan",
      data: {
        songPlaylistId,
      },
    });
    response.code(201);
    return response;
  }

  async getSongsFromPlaylistByIdHandler(request) {
    const { id } = request.params;
    const { id: credentialId } = request.auth.credentials;

    await this._service.verifyPlaylistOwner(id, credentialId);
    const playlist = await this._service.getSongsFromPlaylistById(id);

    return {
      status: "success",
      data: {
        playlist,
      },
    };
  }

  async deleteSongFromPlaylistHandler(request, h) {
    await this._validator.validateDeleteSongFromPlaylistBySongIdPayload(
      request.payload
    );
    const { id } = request.params;
    const { id: credentialId } = request.auth.credentials;
    const { songId } = request.payload;

    await this._service.verifyPlaylistOwner(id, credentialId);
    await this._service.deleteSongFromPlaylistById(id, songId);

    return h.response({
      status: "success",
      message: "Song berhasil dihapus",
    });
  }
}

module.exports = PlaylistsHandler;
