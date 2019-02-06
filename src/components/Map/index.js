import { ScatterplotLayer, HexagonLayer } from 'deck.gl'
import * as d3 from 'd3'
import { scaleLinear } from 'd3-scale'

const PICKUP_COLOR = [255, 255, 0]

// export function renderLayers(props) {
//   const { data, onHover, settings } = props
//   return [
//     new ScatterplotLayer({
//       id: 'scatterplot',
//       data,
//       getPosition: d => d.position,
//       getColor: PICKUP_COLOR,
//       getRadius: d => 10,
//       opacity: 0.5,
//       pickable: true,
//       radiusMinPixels: 0.25,
//       radiusMaxPixels: 30,
//       ...settings,
//     }),
//   ]
// }

const HEATMAP_COLORS = [
  [1, 152, 189],
  [73, 227, 206],
  [216, 254, 181],
  [254, 237, 177],
  [254, 173, 84],
  [209, 55, 78],
]

const LIGHT_SETTINGS = {
  lightsPosition: [149.137, -35.24, 8000, 149.137, -35.24, 8000],
  ambientRatio: 0.4,
  diffuseRatio: 0.6,
  specularRatio: 0.2,
  lightsStrength: [0.8, 0.0, 0.8, 0.0],
  numberOfLights: 2,
}

export function renderLayers(props) {
  const { data, onHover, settings } = props

  return [
    settings.showScatterplot &&
      new ScatterplotLayer({
        id: 'scatterplot',
        data,
        getPosition: d => d.position,
        getColor: PICKUP_COLOR,
        getRadius: d => 10,
        opacity: 0.5,
        pickable: true,
        onHover: info =>
          this.setState({
            hoveredObject: info.object,
            pointerX: info.x,
            pointerY: info.y,
          }),
        radiusMinPixels: 0.25,
        radiusMaxPixels: 30,
        ...settings,
      }),
    settings.showHexagon &&
      new HexagonLayer({
        id: 'heatmap',
        data,
        colorRange: HEATMAP_COLORS,
        coverage: 1,
        elevationRange: [0, 3000],
        elevationScale: 5,
        extruded: true,
        getPosition: d => d.position,
        opacity: 1,
        pickable: true,
        radius: 60,
        lightSettings: LIGHT_SETTINGS,
        onHover: info =>
          this.setState({
            hoveredObject: info.object,
            pointerX: info.x,
            pointerY: info.y,
          }),
        ...settings,
      }),
  ]
}
