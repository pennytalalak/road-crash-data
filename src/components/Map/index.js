import React, { Component } from 'react'
import MapGL, { NavigationControl } from 'react-map-gl'

const TOKEN =
  'pk.eyJ1IjoicGVubnlwYW5nY29kZSIsImEiOiJjanJpb2dmbWUwM3p0M3ptYTk0a2N4MXBoIn0.HoDSIfRA2aPEH5zxXt8T2Q'

const navStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  padding: '10px',
}

export default class Map extends Component {
  constructor(props) {
    super(props)
    this.state = {
      viewport: {
        latitude: -25.2744,
        longitude: 133.7751,
        zoom: 2.8,
        bearing: 0,
        pitch: 0,
      },
    }
  }

  _onViewportChange = viewport => this.setState({ viewport })

  render() {
    const { viewport } = this.state
    return (
      <MapGL
        {...viewport}
        height="100%"
        width="100%"
        mapStyle="mapbox://styles/mapbox/dark-v9"
        mapboxApiAccessToken={TOKEN}
        onViewportChange={this._onViewportChange}
      >
        <div className="nav" style={navStyle}>
          <NavigationControl />
        </div>
      </MapGL>
    )
  }
}
