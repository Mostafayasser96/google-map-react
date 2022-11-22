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
   return drawingManager;
}
export default DrawingManager;