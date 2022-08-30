const Marker = require("../models/Marker");
const UsersService = require('../services/users.service');

class MapService {
  constructor() { }
  async getMarkers() {
    const markers = await Marker.find().lean();
    const usersService = new UsersService();
    for (const marker of markers) {
      marker.user = await usersService.getUser(marker.userId);
    }
    return markers;
  }
  async getMarker(id) {
    return await Marker.findOne(id);
  }
  async addMarker(markerToSave) {
    return await Marker.create(markerToSave);
  }
  async updateMarker(updatedMarker) {
    await Marker.findOneAndUpdate({ _id: updatedMarker._id }, updatedMarker);
  }
  async addResults(markerId, results) {
    await Marker.findOneAndUpdate({ _id: markerId }, { resultats: results });
  }
  async deleteMarker(id) {
    await Marker.findByIdAndRemove(id);
  }
}

module.exports = MapService