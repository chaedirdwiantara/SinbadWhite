import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import masterColor from '../../config/masterColor.json';
import Fonts from '../../helpers/GlobalFont';
import NavigationServices from '../../navigation/NavigationService';

class InputMapsType1 extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  /**
   * ======================
   * RENDER VIEW
   * =======================
   */
  /** === RENDER TITLE === */
  renderTitle() {
    return (
      <View style={styles.boxTitle}>
        <Text style={Fonts.type32}>{this.props.title}</Text>
        {this.props.selectedMapLat !== '' &&
        this.props.selectedMapLong !== '' &&
        this.props.change ? (
          <TouchableOpacity
            onPress={() => NavigationServices.navigate('MapsView')}
          >
            <Text style={Fonts.type22}>Ubah</Text>
          </TouchableOpacity>
        ) : (
          <View />
        )}
      </View>
    );
  }
  /** === RENDER BAR === */
  renderSelectedMaps() {
    return (
      <View style={styles.boxMaps}>
        {!this.props.refresh ? (
          <MapView
            ref={ref => (this.mapRef = ref)}
            style={{ flex: 1, width: '100%' }}
            maxZoomLevel={15}
            initialRegion={{
              latitude: this.props.selectedMapLat,
              longitude: this.props.selectedMapLong,
              latitudeDelta: 0.05,
              longitudeDelta: 0.05
            }}
            onLayout={() => {
              setTimeout(() => {
                this.mapRef.fitToCoordinates(
                  [
                    {
                      latitude: this.props.selectedMapLat,
                      longitude: this.props.selectedMapLong
                    }
                  ],
                  {
                    edgePadding: {
                      top: 0,
                      right: 0,
                      bottom: 0,
                      left: 0
                    },
                    animated: true
                  }
                );
              }, 0);
            }}
          >
            <Marker
              image={require('../../assets/icons/maps/drop_pin.png')}
              coordinate={{
                latitude: this.props.selectedMapLat,
                longitude: this.props.selectedMapLong
              }}
            />
          </MapView>
        ) : (
          <View />
        )}
      </View>
    );
  }
  /** === RENDER MAP VIEW === */
  renderMapView() {
    return (
      <TouchableOpacity
        style={styles.boxMapsEmpty}
        onPress={this.props.openMaps}
      >
        <Text style={Fonts.type34}>Pin Lokasi Anda</Text>
      </TouchableOpacity>
    );
  }
  renderMaps() {
    return this.props.selectedMapLong !== '' && this.props.selectedMapLat !== ''
      ? this.renderSelectedMaps()
      : this.renderMapView();
  }
  /** === RENDER CONTENT === */
  renderContent() {
    return (
      <View style={styles.contentContainer}>
        {this.renderTitle()}
        {this.renderMaps()}
        <View style={styles.spacing} />
      </View>
    );
  }
  /** === MAIN VIEW === */
  render() {
    return <View style={styles.mainContainer}>{this.renderContent()}</View>;
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: masterColor.backgroundWhite
  },
  contentContainer: {
    paddingHorizontal: 16
  },
  boxTitle: {
    paddingBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  boxInput: {
    borderBottomWidth: 1,
    flexDirection: 'row',
    borderRadius: 10,
    paddingBottom: 8,
    borderBottomColor: masterColor.fontBlack40
  },
  boxMapsEmpty: {
    borderWidth: 2,
    borderStyle: 'dashed',
    backgroundColor: masterColor.fontBlack05,
    height: 150,
    borderRadius: 10,
    borderColor: masterColor.fontBlack60,
    justifyContent: 'center',
    alignItems: 'center'
  },
  boxMaps: {
    height: 150,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  spacing: {
    marginBottom: 12
  }
});

export default InputMapsType1;
