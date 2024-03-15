import {
    React,
    Component,
    View,
    StyleSheet,
    FlatList
  } from '../../library/reactPackage';
  import { SkeletonPlaceholder } from '../../library/thirdPartyPackage';
  import { Color } from '../../config';
  import { GlobalStyle } from '../../helpers';
  
  /**
   * =============================
   * NOTE
   * =============================
   * this skeleton for "History"
   */
  
  class SkeletonType25 extends Component {
    constructor(props) {
      super(props);
      this.state = {
        data: [1, 2, 3, 4, 5, 6, 7]
      };
    }
  
    renderSeparator() {
      return <View style={GlobalStyle.boxPadding} />;
    }
    /** === RENDER ITEM SKELETON === */
    renderItem() {
      return (
        <View >
          <View>
            <View>
              <SkeletonPlaceholder>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginBottom: 8
                  }}
                >
                  <View
                    style={{
                      height: 10,
                      width: '30%',
                      borderRadius: 10
                    }}
                  />
                  <View
                    style={{
                      height: 10,
                      width: '35%',
                      borderRadius: 10
                    }}
                  />
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                  }}
                >
                  <View
                    style={{
                      height: 10,
                      width: '35%',
                      borderRadius: 10,
                    }}
                  />
                  <View
                    style={{
                      height: 10,
                      width: '35%',
                      borderRadius: 10
                    }}
                  />
                </View>
              </SkeletonPlaceholder>
            </View>
          </View>
        </View>
      );
    }
    /** === RENDER SKELETON === */
    renderSkeleton() {
      return (
        <View>
          {this.renderItem()}
        </View>
      );
    }
    /** === MAIN === */
    render() {
      return <View >{this.renderSkeleton()}</View>;
    }
  }
  
  const styles = StyleSheet.create({
    boxContent: {
      flex: 1,
      paddingVertical: 10,
      paddingHorizontal: 16,
      justifyContent:'center',
      borderWidth: 1,
      borderColor: Color.fontBlack10,
      borderRadius: 8,
      marginHorizontal: 16
    }
  });
  
  export default SkeletonType25;
  