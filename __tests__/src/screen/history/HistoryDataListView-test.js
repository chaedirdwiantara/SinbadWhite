import React from 'react';
import TestRenderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import HistoryDataListView from '../../../../src/screens/history/HistoryDataListView';
import { FlatList } from 'react-native';
const middleware = [];
const mockStore = configureStore(middleware);

describe('HISTORY PAYMENT RETURN INFORMATION', function() {
  const mockHistoryState = {
    history: {
      loadingDetailHistory: false,
      loadingGetHistory: false,
      loadingEditHistory: false,
      dataDetailHistory: {
        billing: {
          paymentChannnelId: 2,
          refundTotal: 0,
          totalPayment: 1000,
          deliveredTotalPayment: 1000
        },
        paymentType: {
          description:
            'Parcel akan diproses setelah pembayaran diselesaikan dalam tenggat waktu tertentu',
          iconUrl:
            'https://sinbad-website-sg.s3-ap-southeast-1.amazonaws.com/dev/payment_type_icon/pay_now.png',
          id: 1,
          name: 'Bayar Sekarang',
          status: 'active',
          terms:
            '<ul><li class=p1>Pembeli harus membayar dalam waktu 24 jam setelah pesanan dibuat.</li><li class=p1>Pesanan tidak akan diproses apabila pembayaran belum dilakukan.</li><li class=p1>Apabila pembayaran melewati batas waktu, maka pesanan akan dibatalkan.</li></ul>'
        }
      },
      dataGetHistory: [
        {
          billing: {
            totalPayment: 50000,
            deliveredTotalPayment: 40000
          },
          paymentChannel: {
            id: 5
          },
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
              ]
            }
          ]
        }
      ],
      refreshGetHistory: false,
      dataGetOrderStatus: [
        {
          status: 'pending',
          title: 'Tertunda',
          detail: 'Akun sedang diverifikasi oleh Supplier'
        }
      ],
      dataGetPaymentStatus: [
        {
          status: 'waiting_for_refund',
          title: 'Menunggu Pengembalian',
          detail: 'Sedang menunggu pengembalian dana'
        }
      ],
      statusPayment: 'waiting_for_refund',
      status: 'delivered'
    }
  };

  const dateFilter = { dateGte: '', dateLte: '' };
  const factoryMockStore = attr =>
    mockStore({
      ...mockHistoryState,
      ...attr
    });

  test('if flatlist displayed correctly', () => {
    const store = factoryMockStore({});
    const component = TestRenderer.create(
      <Provider store={store}>
        <HistoryDataListView
          data={mockHistoryState.dataDetailHistory}
          dateFilter={dateFilter}
          section={'payment'}
          status={'waiting_for_refund'}
        />
      </Provider>
    );

    const flatList = component.UNSAFE_getAllByType(FlatList);
    expect(flatList.length).toBe(1);
  });
});
