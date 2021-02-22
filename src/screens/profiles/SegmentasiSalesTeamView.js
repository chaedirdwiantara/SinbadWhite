import {
  React,
  Component,
  StyleSheet,
  View,
  Text,
  ScrollView
} from '../../library/reactPackage';
import { connect, bindActionCreators } from '../../library/thirdPartyPackage';
import { LoadingPage } from '../../library/component';
import { Color } from '../../config';
import * as ActionCreators from '../../state/actions'
import { Fonts } from '../../helpers';

class SegmentasiSalesTeamView extends Component {
  componentDidMount(){
    this.props.getSalesSegmentationTeamProcess()
  }

  setValue(params){
    if(!params) return '-'
    let temp = []
    if(Array.isArray(params)){
      params.forEach(el => temp.push(el.name))
    }
    return temp.length > 0 ? temp.join(', ') : '-'
  }
  render() {
    if(this.props.profile.loadingGetSalesSegmentationTeam){
      return <LoadingPage />
    }
    const {
      name, externalId, warehouses,
      types, groups, channels, clusters
    } = this.props.profile.dataSalesSegmentationTeam || {}
    return (
      <View style={styles.mainContainer}>
        <ScrollView>
          <View style={{padding: 16}}>
            <Text style={[Fonts.type7, {marginBottom: 8}]}>Sales Team</Text>
            <SegmentationCell label="Nama" value={name} />
            <SegmentationCell label="ID" value={externalId} />
          </View>
          <View style={{flex: 1}}>
            <View style={{padding: 16}}>
              <Text style={[Fonts.type7, {marginBottom: 8 }]}>Segmentasi</Text>
              <SegmentationCell label="Warehouse" value={this.setValue(warehouses)} />
              <SegmentationCell label="Tipe Toko" value={this.setValue(types)} />
              <SegmentationCell label="Group Toko" value={this.setValue(groups)} />
              <SegmentationCell label="Channel Toko" value={this.setValue(channels)} />
              <SegmentationCell label="Cluster Toko" value={this.setValue(clusters)} />
            </View>
          </View>
        </ScrollView>
      </View>
    )
  }
}

class SegmentationCell extends Component {
  render(){
    return(
      <View style={{paddingVertical: 8}}>
        <Text style={[Fonts.type8, {color: Color.fontBlack50OP50}]}>{this.props.label}</Text>
        <View style={{paddingVertical: 4}} />
        <Text style={[Fonts.type8, {color: Color.fontBlack100, fontSize: 14, lineHeight: 24}]}>{this.props.value}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Color.backgroundWhite
  }
});

const mapStateToProps = ({ global, profile }) => {
  return { global, profile };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(ActionCreators, dispatch);
};

// eslint-disable-next-line prettier/prettier
export default connect(mapStateToProps, mapDispatchToProps)(SegmentasiSalesTeamView);
