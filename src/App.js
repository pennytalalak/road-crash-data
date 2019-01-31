import React, { Component } from 'react'
import './App.css'
import 'mapbox-gl/dist/mapbox-gl.css'

import Map from '../src/components/Map'

class App extends Component {
  render() {
    const containerStyle = {
      height: '100%',
    }
    return (
      <div style={containerStyle}>
        <Map />
      </div>
    )
  }
}

export default App
