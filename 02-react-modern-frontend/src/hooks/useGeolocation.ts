interface Coordinates {
  latitude: number;
  longitude: number;
}

interface UseGeolocationReturn {
  getCurrentLocation: () => Promise<Coordinates>;
}

const useGeolocation = (): UseGeolocationReturn => {
  const getCurrentLocation = (): Promise<Coordinates> => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error("Geolocation is not supported by your browser"));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          switch (error.code) {
            case error.PERMISSION_DENIED:
              reject(
                new Error("Location access denied. Please search manually.")
              );
              break;
            case error.POSITION_UNAVAILABLE:
              reject(new Error("Location information is unavailable."));
              break;
            case error.TIMEOUT:
              reject(new Error("Location request timed out."));
              break;
            default:
              reject(
                new Error("An unknown error occurred while getting location.")
              );
          }
        }
      );
    });
  };

  return { getCurrentLocation };
};

export default useGeolocation;
