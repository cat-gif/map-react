import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import axios from 'axios';

const Marker = ({ text }) => <div style={{fontSize: "1.5em"}}>{text}</div>;

class SimpleMap extends Component {
  static defaultProps = {
    center: {
      lat: 52.52,
      lng: 13.40
    },
    zoom: 11
  };

  constructor() {
    super();
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
        this.setState({markers: [
          <Marker
            lat={52.52}
            lng={13.40}
            text="My Marker"
          />,
          <Marker
            lat={52.55}
            lng={13.43}
            text="My Marker 2"
          />
        ]});
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
        >
          {this.state.markers}
        </GoogleMapReact>
      </div>
    );
  }
}

export default SimpleMap;
