// the api key is : AIzaSyC_OWWY5Wo5BiW_xCcpA-mXVFsfMX2K9Hg
import React from 'react';
import GoogleMapReact from 'google-map-react';
import DrawingManager from './drawingManager';

const Map = () => {
  const defaultProps = {
    center: {
      lat: 30.033333,
      lng: 31.233334
    },
    zoom: 11
  }
  console.log(process.env);

  return (
   <div className='map'>
    <GoogleMapReact 
      bootstrapURLKeys={{ key: '' }}
      defaultCenter={defaultProps.center}
      defaultZoom={defaultProps.zoom}
      yesIWantToUseGoogleMapApiInternals
      onGoogleApiLoaded={({map, maps}) => DrawingManager(map, maps)}  
    >
    </GoogleMapReact>
   </div>
  )
}
export default Map;