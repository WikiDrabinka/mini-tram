import { useState } from 'react'
import all_stops from "./assets/stops.json"
import { scaleLat, scaleLon, selectStops, colors } from "./utils.js" 

function Stop({props}) {
  let style = {
    "--lat" : scaleLat(props.geometry.coordinates[1]),
    "--lon" : scaleLon(props.geometry.coordinates[0]),
    color: colors[props.sector]
  }
  return <div className="stop" style={style}>
  <div>O</div>
  <div className="stop-description">{props.properties.stop_name}</div>
  </div>
}

function App() {
  const [stops, setStops] = useState(all_stops)
  const [routes, setRoutes] = useState([])
  console.log(stops)

  return (
    <div className="map">
      {stops.map((stop) => {
        return <Stop key={stop.stop_id} props={stop}></Stop>
      })}
    </div>
  )
}

export default App
