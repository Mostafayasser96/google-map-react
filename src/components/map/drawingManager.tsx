import 'bootstrap/dist/css/bootstrap.min.css';
import './map-styles.css';


const DrawingManager = (map: any, maps: any) => {
   const drawingManager = new google.maps.drawing.DrawingManager({
    drawingMode: google.maps.drawing.OverlayType.POLYGON,
    drawingControl: true,
    drawingControlOptions: {
      position: google.maps.ControlPosition.TOP_CENTER,
      drawingModes: [
        google.maps.drawing.OverlayType.POLYGON,
        google.maps.drawing.OverlayType.MARKER,
        google.maps.drawing.OverlayType.POLYLINE
      ]
    },
    map: map
   })
  // const onPolygonComplete = (polygon: google.maps.Polygon) => {
  //   console.log('the polygon has completed', polygon);

  //  }
  //  google.maps.event.addListener(drawingManager, 'polygoncomplete', (polygon) => {
  //   onPolygonComplete(polygon as google.maps.Polygon);
  //  }) 
   return drawingManager;
}
export default DrawingManager;