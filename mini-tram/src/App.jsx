import { useState } from 'react'
import all_stops from "./assets/stops.json"
import { scaleLat, scaleLon, selectStops, colors } from "./utils.js" 

function Stop({props}) {
  return <div className="stop" style={{
    position: "absolute", top: `${900*scaleLat(props.geometry.coordinates[1])}px`, left: `${900*scaleLon(props.geometry.coordinates[0])}px`, color: colors[props.sector]
  }}>
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
