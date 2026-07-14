import { WebView } from 'react-native-webview';
import { Localizacao } from '../services/localizacaoService';

type Parada = {
  nome: string;
  latitude: number;
  longitude: number;
};

type MapaProps = {
  localizacoes: Localizacao[];
  zoom?: number;
  paradas?: Parada[];

  mostrarOnibus?: boolean;
  mostrarParadas?: boolean;
  mostrarRota?: boolean;
};

export default function Mapa({
  localizacoes,
  zoom = 14,
  paradas = [],
  mostrarOnibus = true,
  mostrarParadas = false,
  mostrarRota = false,
}: MapaProps) {

  // Define um centro inicial
  let centro = {
    latitude: -6.458,
    longitude: -37.097,
  };

  if (mostrarParadas && paradas.length > 0) {
    centro = {
      latitude: paradas[0].latitude,
      longitude: paradas[0].longitude,
    };
  } else if (localizacoes.length > 0) {
    centro = {
      latitude: localizacoes[0].latitude,
      longitude: localizacoes[0].longitude,
    };
  }

  const html = `
<!DOCTYPE html>
<html>

<head>

<meta charset="utf-8"/>

<link
rel="stylesheet"
href="https://unpkg.com/leaflet/dist/leaflet.css"/>

<style>

html,
body,
#map{
height:100%;
margin:0;
padding:0;
}

</style>

</head>

<body>

<div id="map"></div>

<script src="https://unpkg.com/leaflet/dist/leaflet.js"></script>

<script>

const localizacoes = ${JSON.stringify(localizacoes)};
const paradas = ${JSON.stringify(paradas)};

const mostrarOnibus = ${mostrarOnibus};
const mostrarParadas = ${mostrarParadas};
const mostrarRota = ${mostrarRota};

const map = L.map('map').setView(
[
${centro.latitude},
${centro.longitude}
],
${zoom}
);

L.tileLayer(
'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
{
attribution:'© OpenStreetMap'
}
).addTo(map);

const bounds = [];


// =========================
// ÔNIBUS
// =========================

if(mostrarOnibus){

localizacoes.forEach(bus=>{

if(!bus.latitude || !bus.longitude) return;

L.marker([
bus.latitude,
bus.longitude
])
.addTo(map)
.bindPopup(
(bus.idOnibus?.codigo || "Ônibus") +
" - " +
(bus.idOnibus?.placa || "")
);

bounds.push([
bus.latitude,
bus.longitude
]);

});

}


// =========================
// PARADAS
// =========================

if(mostrarParadas){

paradas.forEach(parada=>{

L.circleMarker(
[
parada.latitude,
parada.longitude
],
{
radius:7,
color:"red",
fillColor:"red",
fillOpacity:1
}
)
.addTo(map)
.bindPopup(parada.nome);

bounds.push([
parada.latitude,
parada.longitude
]);

});

}


// =========================
// ROTA
// =========================

if(mostrarRota && paradas.length>1){

const rota = paradas.map(p=>[
p.latitude,
p.longitude
]);

L.polyline(
rota,
{
color:"blue",
weight:5
}
).addTo(map);

}


// =========================
// AJUSTA O ZOOM
// =========================

if(bounds.length>1){

map.fitBounds(bounds,{
padding:[40,40]
});

}else if(bounds.length===1){

map.setView(bounds[0],16);

}

</script>

</body>

</html>
`;

  return (
    <WebView
      originWhitelist={['*']}
      source={{ html }}
      style={{ flex: 1 }}
    />
  );
}