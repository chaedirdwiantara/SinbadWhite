import {
  React,
  Component,
  View,
  StyleSheet,
  FlatList,
  Image,
  Text
} from '../../../library/reactPackage';
import {
  ButtonSingleSmall,
  ModalBottomType5
} from '../../../library/component';
import { Fonts } from '../../../helpers';

class ModalBottomSubmit extends Component {
  /** === RENDER CONTENT === */
  renderContent() {
    return (
      <View>
        <View style={styles.contentContainer}>
          <Text style={Fonts.type12}>
            Mengirim foto hanya dapat dilakukan satu kali. Setelah mengirim
            foto, dapat melanjutkan ke langkah selanjutnya.
          </Text>
        </View>
        <FlatList
          data={this.props.data}
          numColumns={3}
          keyExtractor={(data, index) => index.toString()}
          renderItem={({ item }) => (
            <Image
              source={{
                isStatic: true,
                uri: 'data:image/jpeg;base64,' + item.uri
              }}
              style={styles.image}
            />
          )}
        />
        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <ButtonSingleSmall
              title="Batal"
              white
              borderRadius={4}
              onPress={this.props.onClose}
              disabled={this.props.loading}
            />
          </View>
          <View style={styles.button}>
            <ButtonSingleSmall
              title="Kirim"
              loading={this.props.loading}
              disabled={this.props.loading}
              borderRadius={4}
              onPress={this.props.onSubmit}
            />
          </View>
        </View>
      </View>
    );
  }
  /** === RENDER MAIN === */
  render() {
    return (
      <ModalBottomType5
        open={this.props.open}
        title={this.props.title}
        content={this.renderContent()}
        close={this.props.loading ? null : this.props.onClose}
        typeClose={'cancel'}
      />
    );
  }
}

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16
  },
  image: {
    width: 99,
    height: 99,
    marginLeft: 16,
    marginBottom: 16,
    borderRadius: 5
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    padding: 16,
    flex: 1
  }
});

export default ModalBottomSubmit;

/**
 * ============================
 * NOTES
 * ============================
 * createdBy: dyah
 * createdDate: 20112020
 * updatedBy: dyah
 * updatedDate: 18122020
 * updatedFunction:
 * -> change modal submit component from type3 to type5.
 */
