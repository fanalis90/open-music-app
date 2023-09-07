const routes = (handler) => [
  {
    method: "POST",
    path: "/playlists",
    handler: (request, h) => handler.postPlaylistHandler(request, h),
    options: {
      auth: "openmusicapp_jwt",
    },
  },
  {
    method: "GET",
    path: "/playlists",
    handler: (request) => handler.getPlaylistsHandler(request),
    options: {
      auth: "openmusicapp_jwt",
    },
  },
  {
    method: "DELETE",
    path: "/playlists/{id}",
    handler: (request, h) => handler.deletePlaylistByIdHandler(request, h),
    options: {
      auth: "openmusicapp_jwt",
    },
  },
  {
    method: "POST",
    path: "/playlists/{id}/songs",
    handler: (request, h) => handler.postSongToPlaylistHandler(request, h),
    options: {
      auth: "openmusicapp_jwt",
    },
  },
  {
    method: "GET",
    path: "/playlists/{id}/songs",
    handler: (request) => handler.getSongsFromPlaylistByIdHandler(request),
    options: {
      auth: "openmusicapp_jwt",
    },
  },
  {
    method: "DELETE",
    path: "/playlists/{id}/songs",
    handler: (request, h) => handler.deleteSongFromPlaylistHandler(request, h),
    options: {
      auth: "openmusicapp_jwt",
    },
  },
];
module.exports = routes;
