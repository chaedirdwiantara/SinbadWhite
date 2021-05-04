import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import TestRenderer from 'react-test-renderer';
import { View, TouchableOpacity, Text, FlatList, SafeAreaView } from 'react-native';
import HistoryDetailView from '../../../../src/screens/history/HistoryDetailView';
import HistoryDetailPaymentInformation from '../../../../src/screens/history/HistoryDetailPaymentInformation'
jest.useFakeTimers();

const middlewares = [];
const mockStore = configureStore(middlewares);

describe('HISTORY DETAIL', function() {
    // const { navigation } = props;
    // const name = this.props.navigation.getParam('name', 'Peter');

    //   navigation.navigate("Modal", {
    //       section: () => {
    //           onIndexChange(0);
    //       }
    //   });
    const navigationMock = { state: { params: { section: "payment" } } };

    const mockSfaState = {
        history: {
            loadingDetailHistory: false,
            dataGetPaymentStatus: null,
            dataDetailHistory: {
                billing: {
                    paymentChannelId : 2
                },
                paymentType: {
                    name: "Bayar Sekarang"
                },
                paymentChannel: {
                    name: "Bca Virtual Account",
                    description: [
                        {
                            name: "ATM BCA",
                            instruction: "<ol><li>Masukkan Kartu ATM BCA &amp; Pin Anda</li><li>Pilih menu Transaksi Lainnya - Transfer - Rekening BCA Virtual Account</li><li>Masukkan No. Virtual Account&nbsp;</span><span style=font-size:10pt;font-family:Arial;font-style:normal;color:#ff0000;>[<span style=color: rgb(255, 0, 0); font-family: Arial; font-size: 13.3333px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; text-decoration-style: initial; text-decoration-color: initial; display: inline !important; float: none;>07773183060</span>]</span><span style=font-size:10pt;font-family:Arial;font-style:normal;></li><li>Pastikan detil pembayaran Anda sudah sesuai</li><li>Masukkan jumlah Transfer sesuai dengan Jumlah yang harus dibayar</li><li>Ikuti instruksi untuk menyelesaikan transaksi</li><li>Simpan struk transaksi sebagai bukti pembayaran Anda</li></ol>"
                        },
                        {
                            name: "m-BCA (BCA Mobile)",
                            instruction: "<ol><li>Log in pada aplikasi BCA Mobile</li><li>Pilih menu m-BCA dan masukkan kode akses Anda</li><li>Pilih m-Transfer - BCA Virtual Account</li><li>Masukkan No. Virtual Account&nbsp;</span><span style=font-size:10pt;font-family:Arial;font-style:normal;color:#ff0000;>[07773183060]</span><span style=font-size:10pt;font-family:Arial;font-style:normal;></li><li>Masukkan pin m-BCA Anda</li><li>Simpan bukti pembayaran Anda</li></ol>"
                        },
                        {
                            name: "Internet Banking BCA",
                            instruction: "<ol><li>Login di halaman Internet Banking BCA (</span><a href=https://klikbca.com/><span style=font-size:10pt;font-family:Arial;font-style:normal;color:#4285f4;>https://klikbca.com/</span></a><span style=font-size:10pt;font-family:Arial;font-style:normal;>)</li><li>Pilih Transfer Dana</li><li>Masukkan No. Virtual Account&nbsp;</span><span style=font-size:10pt;font-family:Arial;font-style:normal;color:#ff0000;>[<span style=color: rgb(255, 0, 0); font-family: Arial; font-size: 13.3333px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; text-decoration-style: initial; text-decoration-color: initial; display: inline !important; float: none;>07773183060</span>]</span><span style=font-size:10pt;font-family:Arial;font-style:normal;></li><li>Pastikan detil pembayaran Anda sudah sesuai</li><li>masukkan mToken</li><li>Simpan bukti pembayaran Anda</li></ol>"
                        }
                    ],
                },
                order: {
                    orderVia: "sinbadApp"
                },
                voucherList: [
                    {voucherValue: 10000}
                ],
                promoList: [
                    {promoValue: 10000}
                ],
                order: {
                    store: {
                        "address": "Jalan Trogong",
                    }
                },
                parcelGrossPrice: 284368,
            },
            errorHistoryDetail: null,
        },
    };

    const factoryMockStore = attr =>
        mockStore({
            ...mockSfaState,
            ...attr
    });

  // If click history list navigate to history detail view
  it('SHOW HISTORY DETAIL VIEW', () => {
    const store = factoryMockStore({});
    const component = TestRenderer.create(
      <Provider store={store}>
        <HistoryDetailView navigation={navigationMock} />
      </Provider>
    );
    const result = component.root.findAllByType(HistoryDetailView);
    // const flatlist = container.findAllByType(View)[0];
    // const flatlistContainer = flatlist.findAllByType(View)[0];
    // const result = flatlistContainer.findAllByType(View)[0]
    // const result1 = result.findAllByType(View)[1]
    // const result = container.findAllByType(Text)[1].props.children;
    // const tree = container.props
    // console.log("view0:", tree)
    expect(
      result
    ).toBeDefined();
  });

  // cek layanan pembayaran if using Bca Virtual Account
  it('Cek layanan pembayaran', () => {
    const store = factoryMockStore({});
    const component = TestRenderer.create(
      <Provider store={store}>
        <HistoryDetailPaymentInformation data={[mockSfaState.history.dataDetailHistory]} />
      </Provider>
    );
    const container = component.root.findAllByType(View)[0];
    // const result = container.findAllByType(Text)[0];
    console.log("log:", container);
    expect(
      result
    ).toBeDefined();
  });  
});