import {
  React,
  Component,
  View,
  StyleSheet,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity
} from '../../../library/reactPackage';
import {
  MaterialIcon,
  bindActionCreators,
  connect
} from '../../../library/thirdPartyPackage';
import { Fonts } from '../../../helpers';
import { Color } from '../../../config';
import * as ActionCreators from '../../../state/actions';

class EditStockRecordListView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data,
      editData: []
    };
  }
  /** FUNCTION */
  deleteStockRecord(id) {
    this.props.parentFunction({ type: 'delete', data: id });
  }
  /** RENDER VIEW */
  /** RENDER MSS TYPE ICON */
  renderMSSType() {
    return (
      <View
        style={{
          marginLeft: 8,
          padding: 4,
          backgroundColor: Color.fontYellow10,
          borderRadius: 100
        }}
      >
        <Text style={Fonts.type108}>MSS</Text>
      </View>
    );
  }
  /** RENDER CARD DATA */
  renderCardData({ item, index }) {
    let shelfQty = {};
    let nonShelfQty = {};

    if (item.showedStock < item.packagedQty) {
      (shelfQty.pcs = item.showedStock), (shelfQty.box = 0);
    } else {
      (shelfQty.pcs = item.showedStock % item.packagedQty),
        (shelfQty.box = Math.floor(item.showedStock / item.packagedQty));
    }

    if (item.nonShowedStock < item.packagedQty) {
      (nonShelfQty.pcs = item.nonShowedStock), (nonShelfQty.box = 0);
    } else {
      (nonShelfQty.pcs = item.nonShowedStock % item.packagedQty),
        (nonShelfQty.box = Math.floor(item.nonShowedStock / item.packagedQty));
    }

    return (
      <View style={styles.cardContent} key={index}>
        <View
          style={{
            alignItems: 'baseline',
            flexDirection: 'row',
            marginHorizontal: 16
          }}
        >
          <View>
            <Text style={[Fonts.type10, { marginTop: 20 }]}>
              {item.catalogueCode}
            </Text>
          </View>
          {item.isMustSale ? this.renderMSSType() : <View />}
        </View>

        <Text
          style={[
            Fonts.type59,
            { marginTop: 11, marginHorizontal: 16, marginBottom: 8 }
          ]}
        >
          {item.name}
        </Text>
        {this.renderSeparator()}
        <View style={styles.cardBodyShelf}>
          <View style={styles.shelfSection}>
            <View style={{ flex: 1 }}>
              <Text style={[Fonts.type96]}>Shelf Produk</Text>
            </View>
            <View style={{ flex: 1 }}>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-end'
                }}
              >
                <View style={[styles.inputBox, { marginRight: 8 }]}>
                  <Text style={[Fonts.type24, styles.textInput]}>
                    {shelfQty.box}box
                  </Text>
                </View>
                <View style={styles.inputBox}>
                  <Text style={[Fonts.type24, styles.textInput]}>
                    {shelfQty.pcs}pcs
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.shelfSection}>{this.renderSeparator()}</View>
          <View style={styles.shelfSection}>
            <View style={{ flex: 1 }}>
              <Text style={[Fonts.type96]}>Non-Shelf Produk</Text>
            </View>
            <View style={{ flex: 1 }}>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-end'
                }}
              >
                <View style={[styles.inputBox, { marginRight: 8 }]}>
                  <Text style={[Fonts.type24, styles.textInput]}>
                    {nonShelfQty.box}box
                  </Text>
                </View>
                <View style={styles.inputBox}>
                  <Text style={[Fonts.type24, styles.textInput]}>
                    {nonShelfQty.pcs}pcs
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={{ position: 'absolute', marginTop: 16, right: 16 }}>
          <TouchableOpacity onPress={() => this.deleteStockRecord(item.id)}>
            <MaterialIcon name={'delete'} size={24} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  renderContent() {
    return (
      <FlatList
        contentContainerStyle={styles.flatListContainer}
        data={this.props.data}
        renderItem={this.renderCardData.bind(this)}
        keyExtractor={(item, index) => index.toString()}
      />
    );
  }

  /** RENDER SEPARATOR */
  renderSeparator() {
    return (
      <View
        style={{
          flex: 1,
          height: 1,
          backgroundColor: Color.fontBlack10,
          marginVertical: 8
        }}
      />
    );
  }
  /** RENDER MODAL */

  render() {
    return <View style={styles.mainContainer}>{this.renderContent()}</View>;
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    height: '100%',
    backgroundColor: Color.fontBlack05
  },
  flatListContainer: {
    paddingTop: 8,
    paddingBottom: 200
  },
  cardContent: {
    backgroundColor: Color.backgroundWhite,
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 8,
    elevation: 3
  },
  inputBox: {
    borderRadius: 4,
    width: 50,
    height: 30,
    borderWidth: 1,
    borderColor: Color.fontBlack10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  shelfSection: {
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1
  },
  cardBodyShelf: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'column',
    marginVertical: 16,
    marginHorizontal: 16
  },
  textInput: {
    color: Color.fontBlack60
  }
});
const mapStateToProps = ({ merchant }) => {
  return { merchant };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(ActionCreators, dispatch);
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditStockRecordListView);
