const Marker = require("../models/Marker");

class MapService {
  constructor() { }

  // getMap() {
  //   return {}
  // }

  async getMarkers() {
    return await Marker.find();
  }

  async addMarker(markerToSave) {
    return await Marker.create(markerToSave);
  }

  async updateMarker(markerToUpdate) {
    return await Marker.findOneAndReplace({ _id: markerToUpdate._id }, markerToUpdate)
  }

  async deleteMarker(id) {
    await Marker.findByIdAndRemove(id);
  }
}

module.exports = MapService