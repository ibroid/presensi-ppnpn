import { Map, Marker } from 'react-map-gl';
import { useState } from 'react'; // Ensure React is imported if using JSX
interface MapGLProps {
  latitude?: number;
  longitude?: number;
}

export default function MapGL({ latitude, longitude }: MapGLProps) {

  const [viewport, setViewport] = useState<any>({
    latitude: latitude ?? -122.4,
    longitude: longitude ?? 37.8,
    zoom: 18,
    width: '100vw',
    height: '100vh'
  });

  return (
    <Map
      mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      initialViewState={{
        longitude: longitude ?? -122.4,
        latitude: latitude ?? 37.8,
        zoom: 18,
      }}
      attributionControl={false}
      interactive={false}
      style={{ width: 600, height: 400 }}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      reuseMaps={true}
    >
      <Marker
        pitchAlignment="viewport"
        key="marker-1"
        anchor="center"
        latitude={latitude}
        longitude={longitude}
        draggable={true}
        offset={[10 * viewport.zoom, -25 * viewport.zoom]}
        onDragEnd={(e: any) => {
          console.log(e)
        }}
      >
      </Marker>
    </Map>
  )
}
