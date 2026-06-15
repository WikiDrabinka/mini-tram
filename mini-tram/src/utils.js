let min_lat = 37.53//Math.min(...new Set(all_stops.map((stop) => 90-stop.geometry.coordinates[1])))
let max_lat = 37.64//Math.max(...new Set(all_stops.map((stop) => 90-stop.geometry.coordinates[1])))
let min_lon = 16.81//Math.min(...new Set(all_stops.map((stop) => stop.geometry.coordinates[0])))
let max_lon = 17.03//Math.max(...new Set(all_stops.map((stop) => stop.geometry.coordinates[0])))
export const colors = ["BlueViolet", "Coral", "CornflowerBlue", "PaleGreen", "Orange", "RebeccaPurple", "Tomato", "DarkSalmon", "Indigo", "Crimson"]

Array.prototype.random = function () {
  return this[Math.floor((Math.random()*this.length))];
}

Array.prototype.pairs = function () {
    let all_pairs = []
    for (let i = 0; i < this.length - 1; ++i) {
        all_pairs.push([this[i], this[i+1]])
    }
    return all_pairs
}

export function scaleLat(lat) {
  return (90-lat - min_lat)/(max_lat - min_lat)
}

export function scaleLon(lon) {
  return (lon - min_lon)/(max_lon - min_lon)
}

export function selectStop(all_stops, current_stops) {
  let available_stops = all_stops.filter(stop => !current_stops.includes(stop))
  return available_stops.random()
}

export function selectStops(n, all_stops, current_stops) {
    let selected_stops = []
    for (let i = 0; i < n; ++i) {
        selected_stops.push(selectStop(all_stops, current_stops.concat(selected_stops)))
    }
    return selected_stops
}