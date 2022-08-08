const MapService = require('../services/map.service');

const mapService = new MapService()

module.exports = {
  // getMap: function (req, res) {
  //   res.json(mapService.getMap())
  // },
  getMarkers: function (req, res) {
    res.json(mapService.getMarkers(req, res))
  },
  addMarker: function (req, res) {
    res.json(mapService.addMarker(req, res))
  },
  updateMarker: function (req, res) {
    res.json(mapService.updateMarker(req, res))
  },
  deleteMarker: function (req, res) {
    res.json(mapService.deleteMarker(req, res))
  }
}