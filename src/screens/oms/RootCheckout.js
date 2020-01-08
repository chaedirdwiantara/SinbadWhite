import React, { Component } from 'react';
import { StyleSheet, View, BackHandler } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { connect } from 'react-redux';
import { deleteOrder } from '../../redux/actions';
import { backNavigation } from '../../helpers/Navigation';
import CheckoutListView from './CheckoutListView';
import ModalConfirmation from '../../components/ModalConfirmation';

class RootCheckout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      openModalConfirmBack: false
    };
  }

  componentDidMount() {
    this.navigationEventListener = Navigation.events().bindComponent(this);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
    if (this.navigationEventListener) {
      this.navigationEventListener.remove();
    }
  }

  confirmBack() {
    this.setState({ openModalConfirmBack: false });
    /**
     * post delete order data
     */
    this.props.deleteOrder();
    setTimeout(() => {
      backNavigation(this.props.componentId);
    }, 100);
  }

  navigationButtonPressed({ buttonId }) {
    if (buttonId === 'ButtonBack') {
      this.setState({ openModalConfirmBack: true });
    }
  }

  handleBackPress = () => {
    this.setState({ openModalConfirmBack: true });
    return true;
  };

  renderModalConfirmBack() {
    return (
      <View>
        {this.state.openModalConfirmBack ? (
          <ModalConfirmation
            modalConfirmation={this.state.openModalConfirmBack}
            type={'okeNotRed'}
            close={() => this.setState({ openModalConfirmBack: false })}
            process={() => this.confirmBack()}
            content={
              'Yakin ingin kembali ke keranjang dan membatalkan Checkout ?'
            }
          />
        ) : (
          <View />
        )}
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <CheckoutListView componentId={this.props.componentId} />
        {this.renderModalConfirmBack()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  }
});

const mapStateToProps = ({ cart }) => {
  return { cart };
};

export default connect(mapStateToProps, { deleteOrder })(RootCheckout);
