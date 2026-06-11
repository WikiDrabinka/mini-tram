import { useState } from 'react'
import all_stops from "./assets/stops.json"
import { scaleLat, scaleLon, selectStops, colors } from "./utils.js" 

function Stop({props, selected, onClick}) {
  let style = {
    "--lat" : scaleLat(props.geometry.coordinates[1]),
    "--lon" : scaleLon(props.geometry.coordinates[0]),
    color : selected? "RebeccaPurple": "black"
  }
  console.log(props)
  return <div className="stop" style={style} onClick={onClick}>
  <div>O</div>
  <div className="stop-description">{props.properties.stop_name}</div>
  </div>
}


function App() {
  const [stops, setStops] = useState(all_stops)
  const [routes, setRoutes] = useState([])
  const [selected, setSelected] = useState([])

  
  function handleClick(stop) {
    let current_selected = selected.slice()
    if (selected.includes(stop.id)) {
      current_selected = selected.filter(id => id != stop.id)
    } else {
      current_selected.push(stop.id)
    }
    setSelected(current_selected)
  }

  return (
    <div className="app">
      <div className="map">
        {stops.map((stop) => {
          return <Stop key={stop.id} props={stop} selected={selected.includes(stop.id)} onClick={() => handleClick(stop)}></Stop>
        })}
      </div>
    </div>
  )
}

export default App
