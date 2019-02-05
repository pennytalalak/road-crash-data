import { ScatterplotLayer } from 'deck.gl'

const PICKUP_COLOR = [114, 19, 108]
const DROPOFF_COLOR = [243, 185, 72]

const DATA_URL =
  'https://raw.githubusercontent.com/uber-common/deck.gl-data/master/examples/3d-heatmap/heatmap-data.csv'

export function renderLayers(props) {
  const { data = DATA_URL, onHover, settings } = props
  return [
    new ScatterplotLayer({
      id: 'scatterplot',
      getPosition: d => d.position,
      getColor: d => (d.pickup ? PICKUP_COLOR : DROPOFF_COLOR),
      getRadius: d => 5,
      opacity: 0.5,
      pickable: true,
      radiusMinPixels: 0.25,
      radiusMaxPixels: 30,
      data,
      onHover,
      ...settings,
    }),
  ]
}
