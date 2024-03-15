import {
    React,
    Component,
    StyleSheet,
    View,
    TouchableOpacity,
    Text
} from '../../library/reactPackage'

import {
    MaterialCommunityIcons
} from '../../library/thirdPartyPackage'
import { Color } from '../../config'
import { Fonts } from '../../helpers'

export default class IconButtonWithLabel extends Component{
  render(){
    const {icon, label, onPress, disabled} = this.props
    return(
      <View style={{alignItems: 'center'}}>
        <TouchableOpacity disabled={disabled} onPress={onPress}>
          <MaterialCommunityIcons
            name={icon}
            color={disabled ? Color.buttonGreyWhiteDisabled : Color.fontRed50}
            size={20}
            style={styles.icon}
          />
        </TouchableOpacity>
        <Text style={[Fonts.type71, {marginVertical: 8}]}>{label}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  icon: {
    borderWidth: 1, 
    borderColor: Color.buttonGreyWhiteDisabled,
    borderRadius: 12, 
    width: 40, 
    height: 40, 
    textAlign: 'center', 
    textAlignVertical: 'center'
}
})