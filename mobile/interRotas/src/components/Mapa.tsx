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

  // Controle do que será exibido
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

  const centro =
    localizacoes.length > 0
      ? {
          latitude: localizacoes[0].latitude,
          longitude: localizacoes[0].longitude,
        }
      : {
          latitude: -6.458,
          longitude: -37.097,
        };

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8"/>

        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet/dist/leaflet.css"
        />

        <style>
          html, body, #map {
            height:100%;
            margin:0;
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
            [${centro.latitude}, ${centro.longitude}],
            ${zoom}
          );

          L.tileLayer(
            'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
            {
              attribution:'© OpenStreetMap'
            }
          ).addTo(map);

          // ÔNIBUS 
          if (mostrarOnibus) {
            localizacoes.forEach(bus => {
              L.marker([
                bus.latitude,
                bus.longitude
              ])
              .addTo(map)
              .bindPopup(
                bus.idOnibus.codigo +
                " - " +
                bus.idOnibus.placa
              );
            });
          }

          // PARADAS
          if (mostrarParadas) {
            paradas.forEach(parada => {
              L.marker([
                parada.latitude,
                parada.longitude
              ])
              .addTo(map)
              .bindPopup(parada.nome);
            });
          }

          // ROTA 
          if (mostrarRota && paradas.length > 1) {

            const rota = paradas.map(p => [
              p.latitude,
              p.longitude
            ]);

            L.polyline(rota, {
              color: 'blue',
              weight: 5
            }).addTo(map);

          }

          // Ajusta o zoom automaticamente
          const pontos = [];

          if (mostrarOnibus) {
            localizacoes.forEach(bus => {
              pontos.push([
                bus.latitude,
                bus.longitude
              ]);
            });
          }

          if (mostrarParadas) {
            paradas.forEach(parada => {
              pontos.push([
                parada.latitude,
                parada.longitude
              ]);
            });
          }

          if (pontos.length > 1) {
            map.fitBounds(pontos);
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