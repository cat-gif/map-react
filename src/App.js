import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import axios from 'axios';
import './marker.css';

const Marker = () => <div className="pin"></div>;

class SimpleMap extends Component {
  static defaultProps = {
    center: {
      lat: 52.52,
      lng: 13.40
    },
    zoom: 15
  };

  constructor() {
    super();
    this.fetchMarkers = this.fetchMarkers.bind(this);
    this.state = {markers: [
      <Marker
        lat={52.52}
        lng={13.40}
        text="My Marker"
      />
    ]};
  }

  componentDidMount() {
    axios.get(`https://api.openchargemap.io/v3/poi/?output=json&countrycode=DE&maxresults=10&compact=true&verbose=false&latitude=52.52&longitude=13.40&distance=10&distanceunit=KM`)
      .then(res => {
        let newMarkers = [];
        res.data.map((location) => newMarkers.push(
          <Marker
            lat={location.AddressInfo.Latitude}
            lng={location.AddressInfo.Longitude}
            text="My Marker"
          />
        ));
        this.setState({markers: newMarkers});
        res.data.map((location) => console.log(location));
      })
  }

  fetchMarkers(map) {
    axios.get('https://api.openchargemap.io/v3/poi/?output=json&countrycode=DE&maxresults=10&compact=true&verbose=false&latitude=' + map.center.lat() +  '&longitude=' + map.center.lng() + '&distance=10&distanceunit=KM')
      .then(res => {
        let newMarkers = [];
        res.data.map((location) => newMarkers.push(
          <Marker
            lat={location.AddressInfo.Latitude}
            lng={location.AddressInfo.Longitude}
            text="My Marker"
          />
        ));
        this.setState({markers: newMarkers});
        res.data.map((location) => console.log(location));
      })
  }

  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyD6T8zNeCCXnR0NhbSplOFvaHG6Jfa6X70' }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
          onDrag={this.fetchMarkers}
        >
          {this.state.markers}
        </GoogleMapReact>
      </div>
    );
  }
}

export default SimpleMap;
