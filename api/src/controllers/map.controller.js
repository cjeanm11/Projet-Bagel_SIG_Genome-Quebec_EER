const MapService = require('../services/map.service');

const mapService = new MapService()

module.exports = {
  getMarkers: async function (req, res) {
    try {
      const markers = await mapService.getMarkers();
      res.status(200).send({ status: 200, markers: markers });
    } catch (error) {
      console.log(error.message);
      res.status(400).send({ status: 400, message: error.message });
    }
  },
  addMarker: async function (req, res) {
    try {
      const savedMarker = await mapService.addMarker(req.body.markerToAdd);
      res.status(200).send({ status: 200, marker: savedMarker });
    } catch (error) {
      console.log(error.message);
      res.status(400).send({ status: 400, message: error.message });
    }
  },
  updateMarker: async function (req, res) {
    try {
      await mapService.updateMarker(req.body.updatedMarker);
      res.status(200).send({ status: 200});
    } catch (error) {
      console.log(error.message);
      res.status(400).send({ status: 400, message: error.message });
    }
  },
  addResults: async function (req, res) {
    try {
      await mapService.addResults(req.body.markerId, req.body.results);
      res.status(200).send({ status: 200});
    } catch (error) {
      console.log(error.message);
      res.status(400).send({ status: 400, message: error.message });
    }
  },
  deleteMarker: async function (req, res) {
    try {
      await mapService.deleteMarker(req.params.id);
      res.status(200).send({ status: 200 });
    } catch (error) {
      console.log(error.message);
      res.status(400).send({ status: 400, message: error.message });
    }
  }
}