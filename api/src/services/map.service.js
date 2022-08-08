class MapService {
  constructor() { }

  // getMap = (req, res) => {
  //   return {}
  // }

  getMarkers = (req, res) => {
    try {
      const markers = await Marker.find();
      res.status(200).send({ success: true, data: markers });
    } catch (error) {
      console.log(error.message);
      res.status(500).send({ success: false, msg: error.message });
    }
  }

  addMarker = (req, res) => {
    try {
      const markerToSave = req.body.marker;
      const savedMarker = await Marker.create(markerToSave);
      res.status(200).send(savedMarker);
    }
    catch (error) {
      console.log(error.message);
      res.status(500).send({ success: false, msg: error.message });
    }
  }

  updateMarker = (req, res) => {
    try {
      const savedMarker = await Marker.findOneAndReplace({ _id: req.params.id }, req.body.marker)
      res.status(200).send(savedMarker);
    }
    catch (error) {
      console.log(error.message);
      res.status(500).send({ success: false, msg: error.message });
    }
  }

  deleteMarker = (req, res) => {
    try {
      await User.findByIdAndRemove(req.params.id);
      res.status(200).send({ success: true });
    } catch (error) {
      console.log(error.message);
      res.status(500).send({ success: false, msg: error.message });
    }
  }
}

module.exports = MapService