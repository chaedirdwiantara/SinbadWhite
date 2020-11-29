import {
  React,
  Component,
  View,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Text
} from '../../../library/reactPackage';
import { MaterialIcon } from '../../../library/thirdPartyPackage';
import { Fonts } from '../../../helpers';
import { Color } from '../../../config';

class MerchantPhotoList extends Component {
  /** === RENDER CONTENT === */
  renderContent() {
    return (
      <View style={styles.contentContainer}>
        <FlatList
          horizontal={true}
          scrollEnabled={false}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.containerFlatlistStyle}
          data={this.props.data}
          keyExtractor={(data, index) => index.toString()}
          renderItem={({ item, index }) => (
            <View>
              {item.uri ? (
                <View style={styles.imageContainer}>
                  <Image
                    source={{
                      isStatic: true,
                      uri: 'data:image/jpeg;base64,' + item.uri
                    }}
                    style={styles.image}
                  />
                  <TouchableOpacity
                    style={styles.deleteIcon}
                    onPress={() => this.props.onDelete(index)}
                  >
                    <MaterialIcon
                      name="delete"
                      color={Color.fontWhite}
                      size={15}
                    />
                  </TouchableOpacity>
                </View>
              ) : (
                <View style={[styles.imageContainer, styles.view]}>
                  <View style={styles.add}>
                    <Text style={[Fonts.type34, { fontSize: 15 }]}>+</Text>
                  </View>
                </View>
              )}
            </View>
          )}
        />
      </View>
    );
  }
  /** === RENDER MAIN === */
  render() {
    return <View style={styles.container}>{this.renderContent()}</View>;
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.fontWhite
  },
  contentContainer: {
    padding: 16
  },
  containerFlatlistStyle: {
    justifyContent: 'space-between',
    width: '100%'
  },
  imageContainer: {
    width: 50,
    height: 50,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    // marginRight: 6
  },
  image: {
    height: 40,
    width: 40,
    borderRadius: 5
  },
  deleteIcon: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 18,
    height: 18,
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.fontBlack40
  },
  view: {
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: Color.fontBlack10,
    backgroundColor: Color.fontWhite,
    // marginHorizontal: 10
  },
  add: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: Color.fontBlack10,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default MerchantPhotoList;

/**
 * ============================
 * NOTES
 * ============================
 * createdBy: dyah
 * createdDate: 20112020
 * updatedBy: dyah
 * updatedDate: 26112020
 * updatedFunction:
 * -> update ui merchant photo list.
 */
