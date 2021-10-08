import {
  React,
  Component,
  View,
  Text,
  height,
  StyleSheet,
  TouchableOpacity,
  FlatList
} from '../../../library/reactPackage';
import {
  Modal,
  MaterialIcon,
  MaterialCommunityIcons
} from '../../../library/thirdPartyPackage';
import {
  StatusBarBlackOP40,
  ButtonSingle,
  SkeletonType24
} from '../../../library/component';
import { GlobalStyle, Fonts } from '../../../helpers';
import { Color } from '../../../config';

class ModalReturnConfirmation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmation: [
        {
          status: true,
          title: 'Ya'
        },
        {
          status: false,
          title: 'Tidak'
        }
      ],
      selectedConfirmation: null
    };
  }
  /**
   * ==================
   * RENDER VIEW
   * ==================
   */
  /** === RENDER TITLE === */
  renderContentTitle() {
    return (
      <View>
        <View style={{ alignItems: 'center' }}>
          <View style={GlobalStyle.linesSwipeModal} />
        </View>
        <View style={styles.boxContentTitle}>
          <TouchableOpacity style={styles.boxClose} onPress={this.props.close}>
            <MaterialIcon name={'close'} size={24} color={Color.fontBlack100} />
          </TouchableOpacity>
          <View>
            <Text style={Fonts.type7}>{this.props.title}</Text>
          </View>
        </View>
        <View style={[GlobalStyle.lines, { marginVertical: 16 }]} />
      </View>
    );
  }
  renderContentBody() {
    return (
      <View style={styles.boxContentBody}>
        {this.renderBody()}
        {this.renderButton()}
      </View>
    );
  }

  renderSkeleton() {
    return <SkeletonType24 />;
  }

  renderBody() {
    return this.state.loading ? (
      this.renderSkeleton()
    ) : (
      <View>
        <FlatList
          contentContainerStyle={styles.flatListContainer}
          data={this.state.confirmation}
          numColumns={1}
          extraData={this.state}
          keyExtractor={(item, index) => index.toString()}
          renderItem={this.renderItem.bind(this)}
        />
      </View>
    );
  }

  renderItem({ item, index }) {
    return (
      <View style={{ flex: 1 }} key={index}>
        <TouchableOpacity
          style={{
            flex: 1,
            justifyContent: 'space-between',
            marginBottom: 16,
            flexDirection: 'row'
          }}
          onPress={() => {
            this.setState({ selectedConfirmation: item.status });
          }}
        >
          <View
            style={{
              alignItems: 'flex-start',
              justifyContent: 'center',
              width: '80%'
            }}
          >
            <Text
              style={[
                {
                  marginBottom: 4,
                  color: Color.fontBlack80
                },
                Fonts.fontH10Bold
              ]}
            >
              {item.title}
            </Text>
          </View>
          <View
            style={{
              justifyContent: 'center',
              marginRight: 16
            }}
          >
            {this.state.selectedConfirmation === item.status ? (
              this.renderSelectedActive()
            ) : (
              <MaterialCommunityIcons
                name="checkbox-blank-circle-outline"
                color={Color.fontBlack40}
                size={24}
              />
            )}
          </View>
        </TouchableOpacity>
      </View>
    );
  }
  renderSelectedActive() {
    return (
      <View
        style={{
          height: 20,
          width: 20,
          backgroundColor: Color.fontRed10,
          borderRadius: 10,
          alignItems: 'center',
          justifyContent: 'center',
          marginRight: 4
        }}
      >
        <View
          style={{
            height: 12,
            width: 12,
            backgroundColor: Color.fontRed50,
            borderRadius: 6
          }}
        />
      </View>
    );
  }

  renderButton() {
    return (
      <View style={[GlobalStyle.shadowForBox10, { flex: 1 }]}>
        <ButtonSingle
          title={'Konfirmasi'}
          borderRadius={8}
          onPress={() =>
            this.props.parentFunction({
              type: 'SelectConfirmation',
              data: this.state.selectedConfirmation
            })
          }
        />
      </View>
    );
  }
  renderContent() {
    return (
      <Modal
        isVisible={this.props.open}
        useNativeDriver={true}
        hasBackdrop={true}
        coverScreen={true}
        swipeDirection={['down']}
        backdropColor={Color.fontBlack100}
        backdropOpacity={0.4}
        deviceHeight={height}
        style={styles.mainContainer}
        onBackButtonPress={this.props.close}
        onBackdropPress={this.props.close}
      >
        <View style={styles.contentContainer}>
          {this.renderContentTitle()}
          {this.renderContentBody()}
        </View>
      </Modal>
    );
  }
  render() {
    return (
      <View>
        <StatusBarBlackOP40 />
        {this.renderContent()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 0
  },
  contentContainer: {
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    maxHeight: 0.8 * height,
    backgroundColor: Color.backgroundWhite,
    flexDirection: 'column',
    position: 'absolute',
    width: '100%',
    bottom: 0,
    zIndex: 1000
  },
  boxContentBody: {
    flex: 1
  },
  boxContentTitle: {
    marginTop: 18,
    justifyContent: 'center',
    flexDirection: 'row'
  },
  boxClose: {
    position: 'absolute',
    height: '100%',
    justifyContent: 'center',
    left: 16
  },
  input: {
    padding: 0,
    alignItems: 'center',
    width: '100%',
    textAlign: 'left',
    marginLeft: 16
  },
  /** FOR INPUT  */
  inputList: {
    flex: 1,
    borderWidth: 1,
    borderColor: Color.fontBlack40,
    borderRadius: 4,
    backgroundColor: Color.backgroundWhite,
    justifyContent: 'center',
    alignItems: 'center'
  },
  flatListContainer: {
    paddingVertical: 16,
    paddingHorizontal: 16,

    backgroundColor: Color.backgroundWhite
  },
  cardContainer: {
    backgroundColor: Color.backgroundWhite,
    borderRadius: 8
  }
});

export default ModalReturnConfirmation;
