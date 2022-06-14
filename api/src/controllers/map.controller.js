const MapService = require('../services/map.service');

const mapService = new MapService()

module.exports = {
    getMap: function(req, res) {
        res.json(mapService.getMap())
    },
    getMarkers: function(req, res) {
        res.json(mapService.getMarkers())
    },
    postMarkers: function(req, res) {
        res.json(mapService.postMarker(req))
    },
    putMarkers: function(req, res) {
        res.json(mapService.putMarkers(req))
    }
}
