const {
  PostPlaylistPayloadSchema,
  PostSongToPlaylistBySongIdPayloadSchema,
  DeleteSongFromPlaylistBySongIdPayloadSchema,
} = require("./schema");
const InvariantError = require("../../exceptions/InvariantError");

const PlaylistsValidator = {
  validatePostPlaylistPayload: (payload) => {
    const validationResult = PostPlaylistPayloadSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
  validatePostSongToPlaylistBySongIdPayload: (payload) => {
    const validationResult =
      PostSongToPlaylistBySongIdPayloadSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
  validateDeleteSongFromPlaylistBySongIdPayload: (payload) => {
    const validationResult =
      DeleteSongFromPlaylistBySongIdPayloadSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = PlaylistsValidator;
