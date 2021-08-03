import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import TestRenderer from 'react-test-renderer';
import {
  View,
  TouchableOpacity,
  Text,
  FlatList,
  SafeAreaView
} from 'react-native';
import HistoryDetailView from '../../../../src/screens/history/HistoryDetailView';
import HistoryDetailPaymentInformation from '../../../../src/screens/history/HistoryDetailPaymentInformation';
import MoneyFormat from '../../../../src/helpers/NumberFormater';
jest.useFakeTimers();

const middlewares = [];
const mockStore = configureStore(middlewares);

describe('HISTORY DETAIL', function() {
  const navigationMock = { state: { params: { section: 'payment' } } };

  const mockSfaState = {
    history: {
      loadingDetailHistory: false,
      dataGetPaymentStatus: null,
      dataDetailHistory: {
        billing: {
          paymentChannelId: 2,
          totalFeeDeduct: 4500,
          totalPayment: 288868,
          deliveredTotalPayment: 20000,
          refundTotal: 0
        },
        bonusCatalogues: [],
        orderBrands: [
          {
            id: '6528',
            orderBrandCatalogues: [
              {
                catalogue: {
                  catalogueImages: [
                    {
                      id: '30',
                      imageUrl:
                        'https://sinbad-website.s3.amazonaws.com/odoo_img/product/118713.png'
                    }
                  ],
                  id: '29',
                  name: 'ASAHI SARDEN SAUS TOMAT 425GR'
                },
                catalogueId: '29',
                id: '7481',
                qty: 16
              }
            ],
            grossPrice: 0,
            deliveredCatalogueGrossPrice: 0,
            catalogueGrossPrice: 0
          }
        ],
        deliveredParcelModified: true,
        removedList: [],
        paymentType: {
          name: 'Bayar Sekarang'
        },
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
          },
          orderVia: 'sinbadApp'
        },
        parcelGrossPrice: 284368,
        deliveredParcelGrossPrice: 0,
        parcelTaxes: 28436,
        deliveredParcelTaxes: 0,
        parcelFinalPrice: 0,
        deliveredParcelFinalPrice: 0
      },
      errorHistoryDetail: null
    }
  };

  const factoryMockStore = attr =>
    mockStore({
      ...mockSfaState,
      ...attr
    });

  // cek layanan pembayaran if using Bca Virtual Account
  it('Cek layanan pembayaran', () => {
    const store = factoryMockStore({});
    const component = TestRenderer.create(
      <Provider store={store}>
        <HistoryDetailPaymentInformation
          data={mockSfaState.history.dataDetailHistory}
        />
      </Provider>
    );
    const container = component.root.findAllByType(View)[0];
    expect(container).toBeDefined();
  });
});
