import json
import requests
from sklearn.cluster import KMeans

response = requests.get("https://www.poznan.pl/mim/plan/map_service.html?mtype=pub_transport&co=cluster")

objects = json.loads(response.text)
unique_names = set()
tram_stops = []

for object in objects["features"]:
    if object["properties"]["route_type"]=="0" and object["properties"]["stop_name"] not in unique_names:
        tram_stops.append(object)
        unique_names.add(object["properties"]["stop_name"])

## Sector assignment
all_coords = [object["geometry"]["coordinates"] for object in tram_stops]
kmeans = KMeans(10).fit(all_coords)
for stop in tram_stops:
    stop["sector"] = int(kmeans.predict([stop["geometry"]["coordinates"]])[0])

with open("./mini-tram/src/assets/stops.json", "w", encoding="utf-8") as json_file:
    json.dump(tram_stops, json_file)