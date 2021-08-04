import React from 'react';
import HistoryDetailPaymentInformation from '../../../../src/screens/history/HistoryDetailPaymentInformation';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import TestRenderer from 'react-test-renderer';
import { View, Text } from 'react-native';

const middleware = [];
const mockStore = configureStore(middleware);
describe('HISTORY DETAIL PAYMENT INFORMATION', function() {
  const mockHistoryState = {
    history: {
      loadingDetailHistory: false,
      dataGetPaymentStatus: null,
      dataDetailHistory: {
        billing: {
          paymentChannelId: 2,
          totalFeeDeduct: 4500,
          totalPayment: 288868,
          deliveredTotalPayment: 30000
        },
        deliveredParcelGrossPrice: 50000,
        deliveredParcelTaxes: 10000,
        delieveredParcelVoucher: 30000,
        deliveredParcelPromo: 250000,
        deliveredParcelFinalPrice: 50000,
        paymentType: {
          name: 'Bayar Sekarang'
        },
        parcelPromoPaymentAmount: 30000,
        parcelFinalPrice: 5000,
        paymentChannel: {
          name: 'Bca Virtual Account',
          description: [
            {
              name: 'ATM BCA',
              instruction:
                '<ol><li>Masukkan Kartu ATM BCA &amp; Pin Anda</li><li>Pilih menu Transaksi Lainnya - Transfer - Rekening BCA Virtual Account</li><li>Masukkan No. Virtual Account&nbsp;</span><span style=font-size:10pt;font-family:Arial;font-style:normal;color:#ff0000;>[<span style=color: rgb(255, 0, 0); font-family: Arial; font-size: 13.3333px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; text-decoration-style: initial; text-decoration-color: initial; display: inline !important; float: none;>07773183060</span>]</span><span style=font-size:10pt;font-family:Arial;font-style:normal;></li><li>Pastikan detil pembayaran Anda sudah sesuai</li><li>Masukkan jumlah Transfer sesuai dengan Jumlah yang harus dibayar</li><li>Ikuti instruksi untuk menyelesaikan transaksi</li><li>Simpan struk transaksi sebagai bukti pembayaran Anda</li></ol>'
            },
            {
              name: 'm-BCA (BCA Mobile)',
              instruction:
                '<ol><li>Log in pada aplikasi BCA Mobile</li><li>Pilih menu m-BCA dan masukkan kode akses Anda</li><li>Pilih m-Transfer - BCA Virtual Account</li><li>Masukkan No. Virtual Account&nbsp;</span><span style=font-size:10pt;font-family:Arial;font-style:normal;color:#ff0000;>[07773183060]</span><span style=font-size:10pt;font-family:Arial;font-style:normal;></li><li>Masukkan pin m-BCA Anda</li><li>Simpan bukti pembayaran Anda</li></ol>'
            },
            {
              name: 'Internet Banking BCA',
              instruction:
                '<ol><li>Login di halaman Internet Banking BCA (</span><a href=https://klikbca.com/><span style=font-size:10pt;font-family:Arial;font-style:normal;color:#4285f4;>https://klikbca.com/</span></a><span style=font-size:10pt;font-family:Arial;font-style:normal;>)</li><li>Pilih Transfer Dana</li><li>Masukkan No. Virtual Account&nbsp;</span><span style=font-size:10pt;font-family:Arial;font-style:normal;color:#ff0000;>[<span style=color: rgb(255, 0, 0); font-family: Arial; font-size: 13.3333px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; text-decoration-style: initial; text-decoration-color: initial; display: inline !important; float: none;>07773183060</span>]</span><span style=font-size:10pt;font-family:Arial;font-style:normal;></li><li>Pastikan detil pembayaran Anda sudah sesuai</li><li>masukkan mToken</li><li>Simpan bukti pembayaran Anda</li></ol>'
            }
          ]
        },
        paylaterType: {
          name: 'Klik ACC'
        },
        order: {
          orderVia: 'sinbadApp'
        },
        voucherList: [
          {
            voucherValue: 10000,
            voucherName: 'testVoucher',
            voucherQty: 0,
            catalogueName: 'testCatalogue'
          }
        ],
        promoList: [
          {
            promoValue: 10000,
            promoName: 'testPromo',
            promoQty: 0,
            catalogueName: 'testCatalogue'
          }
        ],
        order: {
          store: {
            address: 'Jalan Trogong'
          }
        },
        parcelGrossPrice: 284368,
        parcelTaxes: 28436
      },
      errorHistoryDetail: null
    }
  };
  const factoryMockStore = attr =>
    mockStore({
      ...mockHistoryState,
      ...attr
    });

  it('Should contain data detail history', () => {
    const store = factoryMockStore({});
    const component = TestRenderer.create(
      <Provider store={store}>
        <HistoryDetailPaymentInformation
          data={mockHistoryState.history.dataDetailHistory}
        />
      </Provider>
    );
    const result = component.root.findAllByType(View)[0];
    expect(result).toBeDefined();
  });

  it('Should display Layanan Pembayaran if totalFeeDeduct !== 0 ', () => {
    const store = factoryMockStore({});
    const component = TestRenderer.create(
      <Provider store={store}>
        <HistoryDetailPaymentInformation
          data={mockHistoryState.history.dataDetailHistory}
        />
      </Provider>
    );

    const mainContainer = component.root.findAllByType(View)[0];
    const result = mainContainer.findAllByType(Text)[17].props.children;
    expect(result).toEqual('Total Pesanan');
  });

  it('Should display null if Total Fee Deduct === 0', () => {
    const customMockHistoryState = {
      ...mockHistoryState,
      history: {
        ...mockHistoryState.history,
        dataDetailHistory: {
          ...mockHistoryState.history.dataDetailHistory,
          billing: {
            ...mockHistoryState.history.dataDetailHistory.billing,
            totalFeeDeduct: 0
          }
        }
      }
    };
    const factoryMockStore = attr =>
      mockStore({
        ...customMockHistoryState,
        ...attr
      });
    const store = factoryMockStore({});
    const customData = mockHistoryState.history.dataDetailHistory;
    const custom = {
      ...customData,
      billing: {
        paymentChannelId: 2,
        totalFeeDeduct: 0,
        totalPayment: 288868
      }
    };

    const mainComponent = TestRenderer.create(
      <Provider store={store}>
        <HistoryDetailPaymentInformation data={custom} />
      </Provider>
    );

    const mainContainer = mainComponent.root.findAllByType(View)[0];
    const result = mainContainer.findAllByType(Text)[17].props.children;
    expect(result).not.toBe('Layanan Pembayaran');
  });

  it('should display Penyedia Layanan if paylaterType exist', () => {
    const customMockHistoryState = {
      ...mockHistoryState,
      history: {
        ...mockHistoryState.history,
        dataDetailHistory: {
          ...mockHistoryState.history.dataDetailHistory,
          billing: {
            ...mockHistoryState.history.dataDetailHistory.billing,
            totalFeeDeduct: 0
          }
        }
      }
    };
    const factoryMockStore = attr =>
      mockStore({
        ...customMockHistoryState,
        ...attr
      });
    const store = factoryMockStore({});
    const customData = mockHistoryState.history.dataDetailHistory;
    const custom = {
      ...customData,
      paylaterType: 'KLIK ACC'
    };

    const mainComponent = TestRenderer.create(
      <Provider store={store}>
        <HistoryDetailPaymentInformation data={custom} />
      </Provider>
    );
    const mainContainer = mainComponent.root.findAllByType(View)[0];
    const result = mainContainer.findAllByType(Text)[3].props.children;
    expect(result).toEqual('Penyedia Layanan');
  });

  it('should not display Penyedia Layanan if paylaterType null', () => {
    const customMockHistoryState = {
      ...mockHistoryState,
      history: {
        ...mockHistoryState.history,
        dataDetailHistory: {
          ...mockHistoryState.history.dataDetailHistory,
          billing: {
            ...mockHistoryState.history.dataDetailHistory.billing,
            totalFeeDeduct: 0
          },
          paylaterType: null
        }
      }
    };
    const factoryMockStore = attr =>
      mockStore({
        ...customMockHistoryState,
        ...attr
      });
    const store = factoryMockStore({});
    const customData = customMockHistoryState.history.dataDetailHistory;
    const custom = {
      ...customData,
      paylaterType: null
    };

    const mainComponent = TestRenderer.create(
      <Provider store={store}>
        <HistoryDetailPaymentInformation data={custom} />
      </Provider>
    );
    const mainContainer = mainComponent.root.findAllByType(View)[0];
    const result = mainContainer.findAllByType(Text)[3].props.children;

    expect(result).not.toBe('Penyedia Layanan');
  });
});
