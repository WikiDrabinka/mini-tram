import { useState } from 'react'
import all_stops from "./assets/stops.json"

let min_lat = 37.53//Math.min(...new Set(all_stops.map((stop) => 90-stop.geometry.coordinates[1])))
let max_lat = 37.64//Math.max(...new Set(all_stops.map((stop) => 90-stop.geometry.coordinates[1])))
let min_lon = 16.81//Math.min(...new Set(all_stops.map((stop) => stop.geometry.coordinates[0])))
let max_lon = 17.03//Math.max(...new Set(all_stops.map((stop) => stop.geometry.coordinates[0])))


function scaleLat(lat) {
  return (90-lat - min_lat)/(max_lat - min_lat)
}
function scaleLon(lon) {
  return (lon - min_lon)/(max_lon - min_lon)
}

function Stop({props}) {
  return <div className="stop" style={{
    position: "absolute", top: `${900*scaleLat(props.geometry.coordinates[1])}px`, left: `${900*scaleLon(props.geometry.coordinates[0])}px`
  }}>
  <div>O</div>
  <div className="stop-description">{props.properties.stop_name}</div>
  </div>
}

function App() {
  const [stops, setStops] = useState(all_stops)

  return (
    <div className="map">
      {stops.map((stop) => {
        return <Stop key={stop.stop_id} props={stop}></Stop>
      })}
    </div>
  )
}

export default App
