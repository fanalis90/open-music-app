const Joi = require("joi");

const PostPlaylistPayloadSchema = Joi.object({
  name: Joi.string().required(),
});

const PostSongToPlaylistBySongIdPayloadSchema = Joi.object({
  songId: Joi.string().required(),
});

const DeleteSongFromPlaylistBySongIdPayloadSchema = Joi.object({
  songId: Joi.string().required(),
});

module.exports = {
  PostSongToPlaylistBySongIdPayloadSchema,
  PostPlaylistPayloadSchema,
  DeleteSongFromPlaylistBySongIdPayloadSchema,
};
