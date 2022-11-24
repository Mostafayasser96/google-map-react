/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { api_key, defaultProps, baseUrl } from '../consts';
import GoogleMapReact from 'google-map-react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form, Modal } from 'react-bootstrap';
import { useForm, SubmitHandler } from 'react-hook-form';
import { ServerPoly, ZoneData } from './zone-types';
import './map-styles.css';
import axiosInst, { getCookie } from '../login/instance';


const Map = () => {
  const [show, setShow] = useState<boolean>(false);
  const [polygonToEdit, setPolygonToEdit] = useState<google.maps.Polygon>();
  const [isUpdate, setIsUpdate] = useState<boolean>(false);
  const [objToUpdate, setObjToUpdate] = useState<ServerPoly>();
  const [myDrawing, setMyDrawing] = useState<any>();
  const [myMap, setMyMap] = useState<google.maps.Map>();
  const trigger = (polygon?: google.maps.Polygon) => {
    setPolygonToEdit(polygon ?? {} as google.maps.Polygon);
    setShow(!show);
    console.log(show);
  }
  const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm<ZoneData>();
  const onSubmit: SubmitHandler<ZoneData> = (data) => {
    console.log(data.color, data.name);
    console.log('the polygon to edit is: ', polygonToEdit);
    const points = polygonToEdit?.getPaths()?.getArray()['0'].getArray()?.map((point) => {
      return ({
        lat: point.lat().toString(),
        lng: point.lng().toString()
      })
    })
    const objToSend: ServerPoly = {
      color: data.color,
      label: data.name,
      points: points as { lat: string, lng: string, id: string }[]
    }
    console.log('this is the object to send: ', objToSend);
    if (objToUpdate?._id === undefined) {
      setIsUpdate(false);
      createZone(objToSend as ServerPoly);
      console.log('the polygon to edit is: ', polygonToEdit);
      console.log(objToUpdate, data.color, data.name);
      reset({
        color: '',
        name: ''
      });
    } else {
      updateZone({ ...objToUpdate, color: data.color, label: data.name } as ServerPoly);
      reset({
        color: '',
        name: ''
      });
    }
  }
  const getZones = async () => {
    const response = await axiosInst.get(baseUrl + '/zones');
    console.log('this is getZones Response: ', response.data.data);
    response.data.data.map((response: ServerPoly) => {
      const paths = response.points.map((point) => {
        return { lat: Number(point.lat), lng: Number(point.lng) }
      })
      const newPolygon = new google.maps.Polygon({
        paths: paths,
        fillColor: response.color,
        strokeColor: response.color,
        strokeOpacity: .8,
        strokeWeight: 2
      })
      newPolygon.setMap(myMap as google.maps.Map); 
      const onZoneClicked = () => {
        console.log('the zone is clicked');
        setObjToUpdate({ ...response as ServerPoly });
        console.log(objToUpdate);
        setIsUpdate(true);
        trigger(newPolygon as google.maps.Polygon);
        setValue("color", response?.color as string);
        setValue("name", response?.label as string);
      } 
      newPolygon.addListener('click', onZoneClicked);    
    })
  return response.data.data;
  }
  useEffect(() => {
    getZones();
  })
  const handleDelete = () => {
    deleteZone(objToUpdate as ServerPoly, polygonToEdit as google.maps.Polygon);
  }
  const onPolygonComplete = (polygon: google.maps.Polygon) => {
    console.log('polygon is complete', polygon);
    trigger(polygon as google.maps.Polygon);
  }
  
  const handleApiLoaded = (map: any, maps: any) => {
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
    setMyDrawing(drawingManager);
    setMyMap(map as google.maps.Map);
    google.maps.event.addListener(drawingManager, 'polygoncomplete', (polygon) => {
      onPolygonComplete(polygon);
    })
  }
  
  const createZone = async (objToSend: ServerPoly) => {
    console.log('the obj to send is: ', objToSend);
    console.log(getCookie('token'));
    const response = await axiosInst.post(baseUrl + '/zones', objToSend);
    console.log('response of creating new zone: ', response);
    await getZones();
    setShow(false);
  }

  const updateZone = async (objToUpdate: ServerPoly) => {
    console.log('the zone to update is: ', objToUpdate);
    const response = await axiosInst.put(baseUrl + '/zones/' + objToUpdate?._id, objToUpdate);
    console.log('response of updating a zone: ', response);
    await getZones();
    setShow(false);
  }

  const deleteZone = async (zoneToDelete: ServerPoly, mapZone: google.maps.Polygon) => {
    console.log('the zone to delete is: ', zoneToDelete);
    const response = await axiosInst.delete(baseUrl + '/zones/' + zoneToDelete?._id);
    response.status === 200 && mapZone.setMap(null);
    await getZones();
    setShow(false);
  }
  
  return (
    <div className='map'>
      <GoogleMapReact
        bootstrapURLKeys={{ key: api_key }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
      >
        <Modal show={show} onHide={trigger}>
          <Form className='zone-form' onSubmit={handleSubmit(onSubmit)}>
            <Form.Label>name:</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter name'
              {...register('name', { required: true })}
            />
            {errors.name && <span className='zone-name'>name is required!</span>}
            <Form.Label>color: </Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter color'
              {...register('color', { required: true })}
            />
            {errors.color && <span className='zone-color'>color is required!</span>}
            {!isUpdate ? <Button className='sub-btn' type='submit'>Create</Button> : null}
            {isUpdate && <><Button className='sub-btn' type='submit'>Update</Button>
              <Button type='button' className='sub-btn' onClick={handleDelete}>Delete</Button>
              </>
            }   
          </Form>
         
        </Modal>
      </GoogleMapReact>
    </div>
  )
}
export default Map;