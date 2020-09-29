import {
  React,
  Component,
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  LayoutAnimation,
  Platform
} from '../../library/reactPackage'
import {
  MaterialIcon
} from '../../library/thirdPartyPackage'
import { Color } from '../../config'

class Accordion extends Component{
  constructor(props){
    super(props)
    this.state = {
      data: props.data,
      expanded: false
    }
  }

  render(){
    return(
      <View>
        <TouchableOpacity ref={this.accordion} style={styles.row}>
          <Text style={styles.title}>Title</Text>
          <MaterialIcon name={this.state.expanded ? 'keyboard-arrow-up' : 'keyboard-arrow-down'} size={30} />
        </TouchableOpacity>
        <View style={styles.parentHr}>
          {
            this.state.expanded && 
            <View style={styles.child}> 
              <Text>This is the Content</Text>
            </View>
          }
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  title:{
      fontSize: 14,
      fontWeight:'bold',
      color: Color.backgroundWhite,
  },
  row:{
      flexDirection: 'row',
      justifyContent:'space-between',
      height:56,
      paddingLeft:25,
      paddingRight:18,
      alignItems:'center',
      backgroundColor: Color.backgroundWhite
  },
  parentHr:{
      height:1,
      color: Color.backgroundWhite,
      width:'100%'
  },
  child:{
      backgroundColor: Color.backgroundWhite,
      padding:16,
  }
  
});

export default Accordion