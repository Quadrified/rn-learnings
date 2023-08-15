import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, StatusBar } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { mapStyle } from './mapStyles';

export const RNMaps = (props) => {
  const onDragEnd = ({ e }) => {
    console.log('>>>onDragEnd<<<', e);
  };
  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={styles.container?.backgroundColor}
      />
      <View style={styles.container}>
        <MapView
          style={styles.mapStyle}
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          showsMyLocationButton
          showsCompass
          showsScale
          followsUserLocation
          customMapStyle={mapStyle}
        >
          <Marker
            tappable
            draggable
            focusable
            coordinate={{
              latitude: 37.78825,
              longitude: -122.4324,
            }}
            onDragEnd={(e) => console.log(e.nativeEvent)}
            title={'Test Marker'}
            description={'This is a description of the marker'}
          />
        </MapView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  mapStyle: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
