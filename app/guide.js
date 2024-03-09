import { StyleSheet, Text, View } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { SafeAreaView } from "react-native-safe-area-context";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useState, useEffect } from "react";
import * as Location from "expo-location";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function Guide() {
  const [location, setLocation] = useState({});
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        return;
      }

      let location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
        enableHighAccuracy: true,
        timeInterval: 5,
      });
      setLocation(location);
    })();
  }, []);
  const mapRef = React.createRef();
  const goToMyLocation = async () => {
    mapRef.current.animateCamera({
      center: {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        // latitudeDelta: 0.05,
        // longitudeDelta: 0.05,
      },
    });
  };
  return (
    <View style={styles.container}>
      <Text> Map below here</Text>
      <View style={styles.button}>
        <FontAwesome
          name="location-arrow"
          size={24}
          color="black"
          onPress={goToMyLocation}
        />
      </View>

      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        showsUserLocation={true}
        style={styles.map}
        customMapStyle={generatedMapStyle}
        showsMyLocationButton={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    alignItems: "center",
  },
  button: {
    backgroundColor: "pink",
    borderRadius: 10,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999,
    padding: 10,
    position: "absolute",
    bottom: 20,
    left: 0,
  },
  main: {
    flex: 1,
    justifyContent: "center",
    maxWidth: 960,
    marginHorizontal: "auto",
  },
  map: {
    zIndex: 1,
    width: "100%",
    height: "100%",
  },
});

const generatedMapStyle = [
  {
    elementType: "geometry",
    stylers: [
      {
        color: "#242f3e",
      },
    ],
  },
  {
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#746855",
      },
    ],
  },
  {
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#242f3e",
      },
    ],
  },
  {
    featureType: "administrative.country",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#ffffff",
      },
    ],
  },
  {
    featureType: "administrative.country",
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#0d0d0d",
      },
    ],
  },
  {
    featureType: "administrative.locality",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#ffffff",
      },
    ],
  },
  {
    featureType: "administrative.locality",
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#1c1c1c",
      },
    ],
  },
  {
    featureType: "administrative.province",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#c4fdfb",
      },
    ],
  },
  {
    featureType: "administrative.province",
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#000000",
      },
    ],
  },
  {
    featureType: "poi",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#ffffff",
      },
    ],
  },
  {
    featureType: "poi",
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#000000",
      },
    ],
  },
  {
    featureType: "poi.attraction",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#ffffff",
      },
    ],
  },
  {
    featureType: "poi.attraction",
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#000000",
      },
    ],
  },
  {
    featureType: "poi.business",
    elementType: "geometry",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "geometry",
    stylers: [
      {
        color: "#263c3f",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#6b9a76",
      },
    ],
  },
  {
    featureType: "poi.school",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "poi.sports_complex",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [
      {
        color: "#38414e",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "geometry.stroke",
    stylers: [
      {
        color: "#212a37",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#9ca5b3",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [
      {
        color: "#746855",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "geometry.stroke",
    stylers: [
      {
        color: "#1f2835",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#f3d19c",
      },
    ],
  },
  {
    featureType: "transit",
    elementType: "geometry",
    stylers: [
      {
        color: "#2f3948",
      },
    ],
  },
  {
    featureType: "transit.station",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#d59563",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [
      {
        color: "#17263c",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#515c6d",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#17263c",
      },
    ],
  },
];

// import React, { useState, useEffect } from "react";
// import { StyleSheet, Text, View, Alert } from "react-native";
// import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
// import { SafeAreaView } from "react-native-safe-area-context";
// import FontAwesome from "@expo/vector-icons/FontAwesome";
// import * as Location from "expo-location";
// import Ionicons from "@expo/vector-icons/Ionicons";

// export default function Guide() {
//   const [location, setLocation] = useState(null);
//   const [errorMsg, setErrorMsg] = useState(null);

//   useEffect(() => {
//     (async () => {
//       let { status } = await Location.requestForegroundPermissionsAsync();
//       if (status !== "granted") {
//         setErrorMsg("Permission to access location was denied");
//         return;
//       }

//       let location = await Location.getCurrentPositionAsync({
//         accuracy: Location.Accuracy.Balanced,
//         enableHighAccuracy: true,
//         timeInterval: 5,
//       });

//       setLocation(location);
//     })();
//   }, []);

//   if (errorMsg) {
//     Alert.alert("Error", errorMsg);
//   }

//   return (
//     <SafeAreaView style={styles.container}>
//       {location ? (
//         <MapView
//           customMapStyle={generatedMapStyle}
//           provider={PROVIDER_GOOGLE}
//           style={styles.map}
//           initialRegion={{
//             latitude: location.coords.latitude,
//             longitude: location.coords.longitude,
//             latitudeDelta: 0.005,
//             longitudeDelta: 0.005,
//           }}
//         >
//           <FontAwesome.Button
//             name="location-arrow"
//             backgroundColor="#3b5998"
//             onPress={() => {

//             }}
//           >
//             Go to my location
//           </FontAwesome.Button>
//         </MapView>
//       ) : (
//         <Text>Fetching location...</Text>
//       )}
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   map: {
//     width: "100%",
//     height: "100%",
//   },
// });
