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
  
  class SkeletonType26 extends Component {
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
    renderItem({ item, index }) {
      return (
        <View key={index}>
          <View style={styles.boxContent}>
            <View>
              <SkeletonPlaceholder>
                <View style={{ ...boxSkeleton }} >
                  <View style={{ ...boxSkeletonDetail, width: '30%', }} />
                  <View style={{ ...boxSkeletonDetail, width: '35%' }} />
                </View>
              </SkeletonPlaceholder>
            </View>
            <View style={[GlobalStyle.lines, { marginVertical: 10 }]} />
            <SkeletonPlaceholder>
              <View style={{ ...boxSkeleton }} >
                <View style={{ ...boxSkeletonDetail, width: '35%', }} />
                <View style={{ ...boxSkeletonDetail, width: '25%', }} />
              </View>
              <View style={{ ...boxSkeleton, marginTop: 5 }} >
                <View style={{ ...boxSkeletonDetail, width: '30%', }} />
                <View style={{ ...boxSkeletonDetail, width: '35%', }} />
              </View>
            </SkeletonPlaceholder>
            <View style={[GlobalStyle.lines, { marginVertical: 10 }]} />
            <SkeletonPlaceholder>
              <View style={{ ...boxSkeleton }} >
                <View style={{ ...boxSkeletonDetail, width: '30%', }} />
                <View style={{ ...boxSkeletonDetail, width: '30%', }} />
              </View>
              <View style={{ ...boxSkeleton, marginTop: 5 }} >
                <View style={{ ...boxSkeletonDetail, width: '25%', }} />
                <View style={{ ...boxSkeletonDetail, width: '25%', }} />
              </View>
            </SkeletonPlaceholder>
          </View>
        </View>
      );
    }
    /** === RENDER SKELETON === */
    renderSkeleton() {
      return (
        <View>
          <FlatList
            contentContainerStyle={styles.flatListContainer}
            data={this.state.data}
            scrollEnabled={false}
            renderItem={this.renderItem.bind(this)}
            keyExtractor={(item, index) => index.toString()}
            ItemSeparatorComponent={this.renderSeparator}
          />
        </View>
      );
    }
    /** === MAIN === */
    render() {
      return <View style={styles.mainContainer}>{this.renderSkeleton()}</View>;
    }
  }
  
  const styles = StyleSheet.create({
    mainContainer: {
      height: '100%',
      backgroundColor: Color.backgroundWhite
    },
    flatListContainer: {
      paddingBottom: 16
    },
    boxSkeleton: {
      flexDirection: 'row',
      justifyContent: 'space-between'
    },
    boxSkeletonDetail: {
      height: 10,
      borderRadius: 10
    },
    boxContent: {
      flex: 1,
      paddingVertical: 10,
      paddingHorizontal: 16,
      height: 190,
      justifyContent:'center',
      borderWidth: 1,
      borderColor: Color.fontBlack10,
      borderRadius: 8,
      marginHorizontal: 16
    }
  });
  
  export default SkeletonType26;
  