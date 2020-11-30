import {
  React,
  Component,
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
  Text
} from '../../../library/reactPackage';
import {
  Modal,
  Carousel,
  AntDesignIcon
} from '../../../library/thirdPartyPackage';
import { Fonts } from '../../../helpers';
import { Color } from '../../../config';

const { width, height } = Dimensions.get('window');

class ModalCarousel extends Component {
  /** === RENDER CONTENT === */
  renderContent() {
    return (
      <View style={styles.contentContainer}>
        <TouchableOpacity style={styles.crossIcon} onPress={this.props.onClose}>
          <AntDesignIcon name="close" color={Color.fontWhite} size={20} />
        </TouchableOpacity>
        <Carousel
          ref={ref => (this.carousel = ref)}
          data={this.props.data}
          sliderWidth={1 * width}
          itemWidth={1 * width}
          onSnapToItem={index => this.props.onSnapToItem(index)}
          renderItem={() => (
            <Image
              source={{
                isStatic: true,
                uri: this.props.data[this.props.activeIndex].fileUrl
              }}
              style={styles.image}
            />
          )}
          inactiveSlideOpacity={1}
          inactiveSlideScale={1}
          activeSlideAlignment={'center'}
        />
        <View style={styles.pagination}>
          <TouchableOpacity
            style={{ marginRight: 16 }}
            disabled={this.props.activeIndex === 0}
            onPress={this.props.onPrevious}
          >
            <AntDesignIcon
              name="left"
              style={{
                color:
                  this.props.activeIndex === 0
                    ? Color.fontBlack60
                    : Color.fontWhite
              }}
              size={20}
            />
          </TouchableOpacity>
          <Text style={Fonts.type2}>
            {this.props.activeIndex + 1} of {this.props.data.length} Photo
          </Text>
          <TouchableOpacity
            style={{ marginLeft: 16 }}
            disabled={this.props.activeIndex === this.props.data.length - 1}
            onPress={this.props.onNext}
          >
            <AntDesignIcon
              name="right"
              style={{
                color:
                  this.props.activeIndex === this.props.data.length - 1
                    ? Color.fontBlack60
                    : Color.fontWhite
              }}
              size={20}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  /** === RENDER MAIN === */
  render() {
    return (
      <Modal
        isVisible={this.props.isVisible}
        useNativeDriver={true}
        hasBackdrop={true}
        coverScreen={true}
        backdropColor={Color.fontBlack100}
        backdropOpacity={0.4}
        deviceHeight={height}
        style={styles.modal}
      >
        {this.renderContent()}
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  modal: {
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 0
  },
  contentContainer: {
    width,
    justifyContent: 'center',
    alignItems: 'center',
    maxHeight: 0.8 * height,
    flexDirection: 'column',
    bottom: 0,
    zIndex: 1000
  },
  crossIcon: {
    alignSelf: 'flex-end',
    padding: 16
  },
  image: {
    width,
    height: width
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16
  }
});

export default ModalCarousel;

/**
 * ============================
 * NOTES
 * ============================
 * createdBy: dyah
 * createdDate: 22112020
 * updatedBy:
 * updatedDate:
 * updatedFunction:
 * -> add modal for image carousel.
 */
