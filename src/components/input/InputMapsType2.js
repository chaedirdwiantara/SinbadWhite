import {
  React,
  Component,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  width
} from '../../library/reactPackage';
import { MapView, Marker } from '../../library/thirdPartyPackage';
import { Fonts } from '../../helpers';
import { Color } from '../../config'
import masterColor from '../../config/masterColor.json';
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
        this.props.urbanId !== null &&
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
            style={{ flex: 1, width: '100%', borderRadius: 10 }}
            maxZoomLevel={15}
            initialRegion={{
              latitude: this.props.selectedMapLat,
              longitude: this.props.selectedMapLong,
              latitudeDelta: 0.05,
              longitudeDelta: 0.05
            }}
            onLayout={() => {
              setTimeout(() => {
                if (this.mapRef) {
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
                }
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
        <Text style={Fonts.type34}>Pin Lokasi Toko</Text>
      </TouchableOpacity>
    );
  }
  renderMaps() {
    return this.props.selectedMapLong !== '' &&
      this.props.selectedMapLat !== '' &&
      this.props.urbanId !== null
      ? this.renderSelectedMaps()
      : this.renderMapView();
  }
  /** === RENDER CONTENT === */
  renderContent() {
    return (
      <View style={styles.contentContainer}>
        {this.renderTitle()}
        {this.renderMaps()}
        <View
          style={{
            marginBottom: this.props.marginBottom ? this.props.marginBottom : 16
          }}
        />
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
    backgroundColor: Color.backgroundWhite
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
    borderBottomColor: Color.fontBlack40
  },
  boxMapsEmpty: {
    borderWidth: 2,
    borderStyle: 'dashed',
    backgroundColor: Color.fontBlack05,
    height: 0.3 * width,
    borderRadius: 10,
    borderColor: Color.fontBlack60,
    justifyContent: 'center',
    alignItems: 'center'
  },
  boxMaps: {
    height: 0.3 * width,
    zIndex: 1000,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default InputMapsType1;

/**
* ============================
* NOTES
* ============================
* createdBy: 
* createdDate: 
* updatedBy: dyah
* updatedDate: 15022022
* updatedFunction:
* -> add validation to fix crash because of ref (fitToCoordinates)
* 
*/

