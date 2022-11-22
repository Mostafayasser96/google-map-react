import React from 'react';
import Map from './map';


const Marker = (map: any, maps: any) => {
  const position = {
    lat: 30.033333,
    lng: 31.233334
  }
  const marker = new google.maps.Marker({
    position: position,
    map,
    title: 'this is marker'
  })
  return marker;
}
export default Marker;