import Map from "ol/Map";
import View from "ol/View";
import OSM from "ol/source/OSM.js";
import TileLayer from "ol/layer/Tile";
import { Logo, TileSuperMapRest } from "@supermap/iclient-ol";

var url = 'http://172.16.254.50:8090/iserver/services/map-psgw/rest/maps/psdb_Network';

export default class SuperMap {
  constructor() {
    const map = new Map({
      target: "map",
    //   layers: [
    //     new TileLayer({
    //       source: new OSM()
    //     })
    //   ],
      view: new View({
        center: [120.21, 30.18],
        zoom: 13,
        projection: "EPSG:4326",
      }),
    });
    var layer = new TileLayer({
      source: new TileSuperMapRest({
        url: url,
      }),
      projection: "EPSG:4326",
    });
    map.addLayer(layer);
  }
}
