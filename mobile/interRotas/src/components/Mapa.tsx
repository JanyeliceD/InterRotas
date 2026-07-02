import { WebView } from 'react-native-webview';

type MapaProps = {
  latitude: number;
  longitude: number;
  zoom?: number;
};

export default function Mapa({
  latitude,
  longitude,
  zoom = 14,
}: MapaProps) {

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
            height: 100%;
            margin: 0;
          }
        </style>
      </head>

      <body>
        <div id="map"></div>

        <script src="https://unpkg.com/leaflet/dist/leaflet.js"></script>

        <script>
          const map = L.map('map').setView([${latitude}, ${longitude}], ${zoom});

          L.tileLayer(
            'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
            {
              attribution: '© OpenStreetMap'
            }
          ).addTo(map);

          L.marker([${latitude}, ${longitude}]).addTo(map);
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