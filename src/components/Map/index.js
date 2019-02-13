import { ScatterplotLayer, HexagonLayer } from 'deck.gl'

const PICKUP_COLOR = [255, 255, 0]

// const HEATMAP_COLORS = [
//   [1, 152, 189],
//   [73, 227, 206],
//   [216, 254, 181],
//   [254, 237, 177],
//   [254, 173, 84],
//   [209, 55, 78],
// ]

const LIGHT_SETTINGS = {
  lightsPosition: [149.137, -35.24, 8000, 149.137, -35.24, 8000],
  ambientRatio: 0.4,
  diffuseRatio: 0.6,
  specularRatio: 0.2,
  lightsStrength: [0.8, 0.0, 0.8, 0.0],
  numberOfLights: 2,
}

export function renderLayers(data, settings) {
  // const { data, settings } = props
  // const data =
  
  console.log('DATA FROM MAP', data);
  return [
    // settings.showScatterplot &&
    new ScatterplotLayer({
      id: 'scatterplot',
      data,
      getPosition: d => d.position,
      getFillColor: PICKUP_COLOR,
      getRadius: d => 10,
      opacity: 0.5,
      pickable: true,
      radiusMinPixels: 0.25,
      radiusMaxPixels: 30,
    }),
    // settings.showHexagon &&
    new HexagonLayer({
      id: 'heatmap',
      data,
      coverage: 1,
      elevationRange: [0, 10000],
      elevationScale: 20,
      extruded: true,
      getPosition: d => d.position,
      opacity: 1,
      radius: 10,
      upperPercentile: 99,
      pickable: true,
      lightSettings: LIGHT_SETTINGS,
    }),
  ]
}
