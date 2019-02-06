import React, { Component } from 'react'
import DeckGL from 'deck.gl'
import { StaticMap } from 'react-map-gl'
import { renderLayers } from '../src/components/Map'
import { LayerControls, HEXAGON_CONTROLS } from './components/Control'
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
  bearing: 0,
}

export default class App extends Component {
  state = {
    points: [],
    style: 'mapbox://styles/mapbox/dark-v9',
    settings: Object.keys(HEXAGON_CONTROLS).reduce(
      (accu, key) => ({
        ...accu,
        [key]: HEXAGON_CONTROLS[key].value,
      }),
      {}
    ),
  }

  componentDidMount() {
    this._processData()
  }

  _processData() {
    csv(csvFile).then(data => {
      const points = data.reduce((accu, curr) => {
        accu.push({
          position: [Number(curr.LONGITUDE), Number(curr.LATITUDE)],
          pickup: true,
        })
        return accu
      }, [])
      this.setState({
        points,
      })
    })
  }

  _updateLayerSettings(settings) {
    this.setState({ settings })
  }

  render() {
    return (
      <div>
        <LayerControls
          settings={this.state.settings}
          propTypes={HEXAGON_CONTROLS}
          onChange={settings => this._updateLayerSettings(settings)}
        />

        <DeckGL
          layers={renderLayers({
            data: this.state.points,
            settings: this.state.settings,
          })}
          initialViewState={INITIAL_VIEW_STATE}
          controller
        >
          <StaticMap
            mapStyle={this.state.style}
            mapboxApiAccessToken={MAPBOX_TOKEN}
          />
        </DeckGL>
      </div>
    )
  }
}
