import {
  React,
  Component,
  View,
  SafeAreaView,
  StyleSheet,
  Text
} from '../../library/reactPackage';
import { Color } from '../../config';

class CardType1 extends Component {
  renderCard() {
    return (
      <View
        style={{
          backgroundColor: '#f0444c',
          height: 120,
          borderRadius: 12,
          alignContent: 'center',
          alignItems: 'center',
        }}
      >
      <View
        style={{
          position: 'absolute',
          backgroundColor: '#fffff',
          height: '100%',
          width: '100%',
          flex: 1
        }}
      >

      </View>
        <View
          style={{
            borderRadius: 100,
            backgroundColor: '#ffffff',
            height: 120,
            width: 150,
            opacity: 0.1,
            marginLeft: 300
          }}
        />
      </View>
    );
  }
  renderContent() {
    return (
      <View style={{ margin: 16 }}>
        {this.renderCard()}
      </View>
    );
  }
  render() {
    return (
      <SafeAreaView style={styles.mainContainer}>
        {this.renderContent()}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Color.backgroundWhite
  }
});

export default CardType1;
