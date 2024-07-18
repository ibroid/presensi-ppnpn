import { Map, Marker } from 'react-map-gl';
import { useState } from 'react'; // Ensure React is imported if using JSX

interface MapGLProps {
  latitude?: number;
  longitude?: number;
}

export default function MapGL({ latitude, longitude }: MapGLProps) {

  const [viewport, setViewport] = useState<any>({
    latitude: latitude,
    longitude: longitude,
    zoom: 18,
    width: '100vw',
    height: '100vh'
  });

  return (
    <Map
      mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      {...viewport}
      style={{ width: 400, maxHeight: 600, margin: 'auto', marginTop: 10 }}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      reuseMaps={true}
      attributionControl={false}
      onViewPortChange={({ viewState }: any) => setViewport(viewState)}
    >
      <Marker
        pitchAlignment="viewport"
        key="marker-1"
        anchor="center"
        latitude={latitude}
        longitude={longitude}
        draggable={true}
        offset={[10 * viewport.zoom, -20 * viewport.zoom]}
        onDragEnd={(e: any) => {
          console.log(e)
        }}
      >
      </Marker>
    </Map>
  )
}
