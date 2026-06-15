import { useState } from 'react'
import all_stops from "./assets/stops.json"
import { scaleLat, scaleLon, selectStops, colors } from "./utils.js" 

function Stop({props, selected, onClick}) {
  let style = {
    "--lat" : scaleLat(props.geometry.coordinates[1]),
    "--lon" : scaleLon(props.geometry.coordinates[0]),
    color : selected? "RebeccaPurple": "black"
  }
  return <div className="stop" style={style} onClick={onClick}>
  <div>⦿</div>
  <div className="stop-description">{props.properties.stop_name}</div>
  </div>
}

function Route({stops}) {
  console.log(stops.pairs())
  return (
    <div className="route">
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      {stops.pairs().map((pair) => {
        return (
        <line 
        x1={`${scaleLon(pair[0].geometry.coordinates[0])*100}`} 
        y1={`${scaleLat(pair[0].geometry.coordinates[1])*100}`} 
        x2={`${scaleLon(pair[1].geometry.coordinates[0])*100}`} 
        y2={`${scaleLat(pair[1].geometry.coordinates[1])*100}`} 
        stroke="black" 
        />
        )
      })}
      </svg>
    </div>
  )
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
        <div className="stops">
          {stops.map((stop) => {
            return <Stop key={stop.id} props={stop} selected={selected.includes(stop.id)} onClick={() => handleClick(stop)}></Stop>
          })}
        </div>
        <Route stops={selected.map(stop_id => all_stops.filter(stop => stop.id == stop_id)[0])}></Route>
      </div>
    </div>
  )
}

export default App
