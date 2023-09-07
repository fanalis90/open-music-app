class SongsHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;
  }

  async postSongHandler(request, h) {
    this._validator.validateSongPayload(request.payload);
    const payload = request.payload;

    const songId = await this._service.addSong(payload);

    const response = h.response({
      status: "success",
      message: "Song berhasil ditambahkan",
      data: {
        songId,
      },
    });
    response.code(201);
    return response;
  }

  async getSongsHandler() {
    const songs = await this._service.getSongs();
    return {
      status: "success",
      data: {
        songs,
      },
    };
  }

  async getSongByIdHandler(request, h) {
    const { id } = request.params;
    const song = await this._service.getSongById(id);
    return h.response({
      status: "success",
      data: {
        song,
      },
    });
  }

  async putSongByIdHandler(request, h) {
    this._validator.validateSongPayload(request.payload);
    const { title, year, genre, performer, duration, albumId } =
      request.payload;
    const { id } = request.params;

    await this._service.editSongById(id, {
      title,
      year,
      genre,
      performer,
      duration,
      albumId,
    });

    return h.response({
      status: "success",
      message: "Song berhasil diperbarui",
    });
  }

  async deleteSongByIdHandler(request, h) {
    // try {
    const { id } = request.params;
    await this._service.deleteSongById(id);

    return h.response({
      status: "success",
      message: "Song berhasil dihapus",
    });
  }
}

module.exports = SongsHandler;
