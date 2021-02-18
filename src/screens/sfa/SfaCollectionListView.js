import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  FlatList
} from '../../library/reactPackage';
import { Fonts, GlobalStyle, MoneyFormat } from '../../helpers';
import masterColor from '../../config/masterColor.json';

function SfaCollectionListView (props){

    /**
   * =======================
   * RENDER VIEW
   * =======================
   */

   const renderData= () =>{
       return (
<View style={styles.flatListContainer}>
<FlatList
        //   contentContainerStyle={styles.flatListContainer}
        //   ItemSeparatorComponent={this.renderSeparator}
          data={props.data.data}
          renderItem={renderItem}
        //   numColumns={1}
        //   extraData={this.state}
          keyExtractor={(item, index) => index.toString()}
        //   refreshing={this.props.history.refreshGetHistory}
        //   onRefresh={this.onHandleRefresh}
          onEndReachedThreshold={0.2}
        //   onEndReached={this.onHandleLoadMore}
          showsVerticalScrollIndicator
        />
</View>
       )
   }

   const renderItem = ({item, index}) => {
       return(
           <View style={styles.listContainer}>
               <View style={styles.view1}>
                   <Text> 1</Text>
                  
               </View>
               <View style={GlobalStyle.lines} />
               <View style={styles.view2}>
                   <Text> 2</Text>
               </View>
               <View style={GlobalStyle.lines} />
               <View style={styles.view3}>
                   <Text> 3</Text>
               </View>
           </View>
       )
   }
     /**
   * =======================
   * MAIN
   * =======================
   */
  return (
      <>
      {renderData()}
      </>
  )
}

export default SfaCollectionListView

const styles = StyleSheet.create({
    listContainer : {
        marginBottom: 9,
        paddingTop : 20,
        paddingBottom : 16,
        paddingRight: 16,
        paddingLeft: 16,
        borderColor: masterColor.fontBlack10,
        borderWidth: 1,
        borderRadius: 8
    },
    flatListContainer :{
        padding: 16
    },
    view1: {
        paddingBottom: 8
    },
    view2 : {
        paddingVertical: 12
    },
    view3: {
        paddingTop: 12
    }
})