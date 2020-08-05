import {
  React,
  Component,
  View,
  SafeAreaView,
  StyleSheet,
  Text
} from '../../library/reactPackage';
import { Color } from '../../config';
import { Fonts } from '../../helpers'

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
          flex: 1,
          flexDirection: 'row'
        }}
      >
      <View style={{flex: 7}}>
        <View style={{flex: 1, marginLeft: 16, flexDirection: 'column-reverse'}}>
          <Text style={[Fonts.type63, {marginBottom: 4}]}>
            Sales Area Mapping
          </Text>
        </View>
        <View style={{flex: 1, marginLeft: 16}}>
          <Text style={[Fonts.type100, {marginTop: 4}]}>
            {this.props.warehouse}
          </Text>
        </View>
      </View>
      <View style={{flex: 3, flexDirection: 'row-reverse', marginLeft: 16, alignItems: 'center'}}>
        <Text style={[Fonts.type1]}>
          0{this.props.number}
        </Text>
      </View>
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
      <View style={{ marginHorizontal: 16, marginTop: 4, marginBottom: 4 }}>
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
