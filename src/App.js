import React, { Component } from 'react'
import DeckGL from 'deck.gl'
import { StaticMap } from 'react-map-gl'
import { renderLayers } from '../src/components/Map'
import taxiData from './data/taxi'
import roadData from './data/road-data'

const MAPBOX_TOKEN =
  'pk.eyJ1IjoicGVubnlwYW5nY29kZSIsImEiOiJjanJpb2dmbWUwM3p0M3ptYTk0a2N4MXBoIn0.HoDSIfRA2aPEH5zxXt8T2Q'

const INITIAL_VIEW_STATE = {
  longitude: -74,
  latitude: 40.7,
  zoom: 11,
  minZoom: 5,
  maxZoom: 16,
  pitch: 0,
  bearing: 0,
}

export default class App extends Component {
  state = {
    points: [],
    style: 'mapbox://styles/mapbox/dark-v9',
  }

  componentDidMount() {
    this._processData()
  }

  _processData() {
    const points = taxiData.reduce((accu, curr) => {
      accu.push({
        position: [Number(curr.pickup_longitude), Number(curr.pickup_latitude)],
        pickup: true,
      })
      accu.push({
        position: [
          Number(curr.dropoff_longitude),
          Number(curr.dropoff_latitude),
        ],
        pickup: false,
      })
      return accu
    }, [])
    this.setState({
      points,
    })
  }

  render() {
    return (
      <div>
        <DeckGL
          layers={renderLayers({ data: this.state.points })}
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
