import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, View, Text } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location';

function Main({navigation}) {
    const [currentRegion, setCurrentRegion] = useState(null);

    useEffect(() => {
        async function loadInitialPosition() {
            const { granted } = await requestPermissionsAsync();

            if (granted) {
                const { coords } = await getCurrentPositionAsync({
                    enableHighAccuracy: true,
                });

                const { latitude, longitude } = coords;

                setCurrentRegion({
                    latitude,
                    longitude,
                    latitudeDelta: 0.03,
                    longitudeDelta: 0.03,
                })
            }
        }

        loadInitialPosition();
    }, []);

    if (!currentRegion) {
        return null;
    }

    return (
        <MapView initialRegion={currentRegion} style={styles.map}>
            <Marker coordinate={{ latitude: -24.7059218, longitude: -53.7376684 }}>
                <Image style={styles.avatar} source={{ uri: "https://lh3.googleusercontent.com/-OdyglwHsaNw/WGJ6LWYCSyI/AAAAAAAAq5Q/DEwciibFz_8j1apqUj32joGOGtcV-JwRQCEwYBhgL/w140-h140-p/Instasize_1226154757.jpg" }} />

                <Callout onPress={() => {
                    navigation.navigate('Profile', {
                        github_username: 'jacksonvfo'
                    });
                }}>
                    <View style={styles.callout}>
                        <Text style={styles.devName}>Jackson Oliveira</Text>
                        <Text style={styles.devBio}>This is a Bio</Text>
                        <Text style={styles.devTechs}>React.js, React Native, Node.js</Text>
                    </View>
                </Callout>
            </Marker>
        </MapView>
    )
}

const styles = StyleSheet.create({
    map: {
        flex: 1
    },

    avatar: {
        width: 54,
        height: 54,
        borderRadius: 4,
        borderWidth: 4,
        borderColor: "#FFF"
    },

    callout: {
        width: 260
    },

    devName: {
        fontWeight: 'bold',
        fontSize: 16
    },

    devBio: {
        color: '#666',
        marginTop: 5
    },

    devTechs: {
        marginTop: 5
    }
})

export default Main;