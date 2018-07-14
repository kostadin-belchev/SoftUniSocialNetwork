import React, { Component } from 'react'
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps'

class Contacts extends Component {
  render () {
    const GoogleMapExample = withGoogleMap(props => (
      <GoogleMap
        defaultCenter={{ lat: 42.667185, lng: 23.350576 }}
        defaultZoom={15}
      >
        <Marker position={{ lat: 42.667185, lng: 23.350576 }} />
      </GoogleMap>
    ))
    return (
      <div className='container-fluid text-center'>
        <div className='row content'>
          <div className='col-sm-3 sidenav' />
          <div className='col-sm-4 text-left'>
            <h1>Where to find us</h1>
            <p><strong>Email:</strong> kostadin.belchev@gmail.com</p>
            <p><strong>Address:</strong> "Tintyava" street, 15-17, 1113 g.k. Dianabad, Sofia</p>
            <GoogleMapExample containerElement={<div style={{ height: `500px`, width: '500px' }} />} mapElement={<div style={{ height: `100%` }} />} />
            <hr />
          </div>
          <div className='col-sm-3 sidenav' />
        </div>
      </div>
    )
  }
}

export default Contacts
