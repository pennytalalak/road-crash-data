import React, { Component } from 'react'
import DeckGL from 'deck.gl'
import { StaticMap } from 'react-map-gl'
import { renderLayers } from '../src/components/Map'
// import { LayerControls, HEXAGON_CONTROLS } from './components/Control'
// import { tooltipStyle } from './components/Control/style'
import csvFile from './data/ACT_Road_Crash_Data.csv'
import { csv } from 'd3-fetch'

const MAPBOX_TOKEN =
  'pk.eyJ1IjoicGVubnlwYW5nY29kZSIsImEiOiJjanJpb2dmbWUwM3p0M3ptYTk0a2N4MXBoIn0.HoDSIfRA2aPEH5zxXt8T2Q'

const INITIAL_VIEW_STATE = {
  longitude: 149.137,
  latitude: -35.24,
  zoom: 11,
  minZoom: 5,
  maxZoom: 16,
  pitch: 45,
  bearing: -27.396674584323023,
}

export default class App extends Component {
  state = {
    points: [],
  }

  componentDidMount() {
    this._processData()
  }

  _processData() {
    csv(csvFile).then(x => {
      const points = x.map(d => ({
        position: [Number(d.LONGITUDE), Number(d.LATITUDE)],
        pickup: true,
      }))
      this.setState({
        points,
      })
    })
  }

  render() {
    return (
      <div>
        <DeckGL
          layers={renderLayers({
            data: this.state.points,
          })}
          initialViewState={INITIAL_VIEW_STATE}
          controller
        >
          <StaticMap
            mapStyle="mapbox://styles/mapbox/dark-v9"
            mapboxApiAccessToken={MAPBOX_TOKEN}
          />
        </DeckGL>
      </div>
    )
  }
}
