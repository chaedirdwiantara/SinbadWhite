import {
  React,
  Component,
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  LayoutAnimation
} from '../../library/reactPackage'
import {
  MaterialIcon
} from '../../library/thirdPartyPackage'
import { Color } from '../../config'
import { Fonts } from '../../helpers'

class Accordion extends Component{
  constructor(props){
    super(props)
    this.state = {
      promoId: null,
      expand: false
    }
  }

  toggleExpand(promoId){
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    if (this.state.promoId !== promoId) {
        this.setState({ promoId, expand: true })
    } else {
      /** Back to Initial State */
      this.setState({ promoId: null, expand: false })
    }
    
  }

  renderItem({ item, index }){
    return(
      <View key={index} >
        <TouchableOpacity ref={this.accordion} style={styles.row} onPress={() => this.toggleExpand(item.id)}>
          <Text style={Fonts.type8}>{item.name}</Text>
          <MaterialIcon name={item.id === this.state.promoId ? 'keyboard-arrow-up' : 'keyboard-arrow-down'} size={30} />
        </TouchableOpacity>
        <View style={{ backgroundColor: Color.fontBlack10, height: 1, marginTop: -5}} />
        <View style={styles.parentHr}>
          {
            item.id === this.state.promoId && this.state.expand &&
            <View style={styles.child}> 
              <Text style={[Fonts.type8, { marginHorizontal: 16, marginTop: 10 }]}>{item.description}</Text>
            </View>
          }
        </View>
      </View>
    )
  }

  renderData(){
    console.log(this.props.data)
    return(
      <View>
        {
          this.props.data.map((item, index) => (
            this.renderItem({item, index})
          ))
        }
      </View>
    )
  }

  render(){
    return(
      <View style={styles.mainContainer}>
      {this.renderData()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Color.backgroundWhite
  },
  row:{
      flexDirection: 'row',
      justifyContent:'space-between',
      marginVertical: 10,
      paddingLeft:16,
      paddingRight:16,
      alignItems:'center',
      backgroundColor: Color.backgroundWhite,
      flex: 1
  },
  parentHr:{
      color: Color.backgroundWhite,
      width:'100%',
      height: '100%',
      flex: 1
  },
  child:{
      backgroundColor: Color.backgroundWhite,
      height: '100%',
      flex: 1
  }
  
});

export default Accordion