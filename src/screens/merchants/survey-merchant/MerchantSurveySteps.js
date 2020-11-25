import {
  React,
  Component,
  View,
  StyleSheet,
  FlatList,
  Text
} from '../../../library/reactPackage';
import { Fonts } from '../../../helpers';
import { Color } from '../../../config';

const steps = ['Before Display', 'After Display', 'Completed'];

class MerchantSurveySteps extends Component {
  /** === RENDER MAIN === */
  render() {
    return (
      <View>
        <FlatList
          horizontal={true}
          scrollEnabled={false}
          showsHorizontalScrollIndicator={false}
          data={steps}
          contentContainerStyle={styles.container}
          keyExtractor={(data, index) => index.toString()}
          renderItem={({ item, index }) => (
            <View style={{ flexDirection: 'column' }}>
              <View style={styles.content}>
                <View
                  style={[
                    styles.numberContainer,
                    {
                      backgroundColor:
                        index <= this.props.active
                          ? Color.mainColor
                          : Color.fontBlack10
                    }
                  ]}
                >
                  <Text style={Fonts.type2}>{index + 1}</Text>
                </View>
                {index !== steps.length - 1 && (
                  <View
                    style={[
                      styles.line,
                      {
                        backgroundColor:
                          index < this.props.active
                            ? Color.mainColor
                            : Color.fontBlack10
                      }
                    ]}
                  />
                )}
              </View>
            </View>
          )}
        />
        <View style={styles.nameContainer}>
          {steps.map((item, index) => (
            <View key={index}>
              <Text style={[Fonts.type57]}>{item}</Text>
            </View>
          ))}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingBottom: 5,
    paddingTop: 8
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  numberContainer: {
    height: 22,
    width: 22,
    borderRadius: 11,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 3
  },
  line: {
    height: 6,
    width: 80,
    borderRadius: 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  nameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 8
  }
});

export default MerchantSurveySteps;

/**
 * ============================
 * NOTES
 * ============================
 * createdBy: dyah
 * createdDate: 20112020
 * updatedBy: dyah
 * updatedDate: 23112020
 * updatedFunction:
 * -> fix ui step component.
 */
