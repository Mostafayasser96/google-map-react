import React from 'react';
import { defaultProps } from '../consts';
import GoogleMapReact from 'google-map-react';
import DrawingManager from './drawingManager';

const Map = () => {
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