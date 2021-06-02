import {React, View, StyleSheet, Text, Image} from '../../library/reactPackage';
import {moment} from '../../library/thirdPartyPackage';
import {InputType5} from '../../library/component';
import { toLocalTime} from '../../helpers/TimeHelper';
import { Fonts, MoneyFormatSpace } from '../../helpers';

const SfaCollectionDetailTransfer = (props) => {
    const data = props.data
    const paymentCollection = data.paymentCollection
    const paymentCollectionMethod = paymentCollection.paymentCollectionMethod

     /**
   * *********************************
   * FUNCTION
   * *********************************
   */
  const formatDate = (date) => {
    const local = toLocalTime(date)
    return (
    moment(local).format(
        'DD MMMM YYYY'
      )
    )
  }

    return (
        <>
        <View style={styles.inputField}>
          <InputType5
            title={`Nomor Referensi`}
            placeholder={paymentCollectionMethod.reference? paymentCollectionMethod.reference: ''}
            editable={false}
          />
        </View>
        <View style={styles.inputField}>
          <InputType5
            title={`Sumber Bank`}
            placeholder={paymentCollectionMethod.bankFrom.name?paymentCollectionMethod.bankFrom.name:''}
            editable={false}
          />
        </View>
        <View style={styles.inputField}>
          <InputType5
            title={`Tujuan Bank`}
            placeholder={paymentCollectionMethod.bankToAccount.displayName?paymentCollectionMethod.bankToAccount.displayName:''}
            editable={false}
          />
        </View>
        <View style={styles.inputField}>
          <InputType5
            title={`Tanggal Transfer`}
            placeholder={formatDate(paymentCollectionMethod.date? paymentCollectionMethod.date : '')}
            editable={false}
          />
        </View>
        <View style={styles.inputField}>
          <InputType5
            title={`Nilai Transfer`}
            placeholder={MoneyFormatSpace(paymentCollectionMethod.amount ? paymentCollectionMethod.amount : 0)}
            editable={false}
          />
        </View>
        <View style={styles.inputField}>
          <InputType5
            title={`Jumlah Penagihan`}
            placeholder={MoneyFormatSpace(paymentCollection.paidAmount ? paymentCollection.paidAmount : 0)}
            editable={false}
          />
        </View>
        <View style={styles.imageContainer}>
          <Text style={Fonts.type10}>Foto/Gambar</Text>
          <View style={styles.smallContainerImage}>
            <Image
              source={{
                uri: `data:image/jpeg;base64, ${data.image}`
              }}
              style={[
                styles.images
              ]}
            />
          </View>
        </View>
        </>
    )
}

const styles = StyleSheet.create({
    inputField: {
        marginTop: 16
      },
    imageContainer: {
        padding: 16
    },
    smallContainerImage: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'white',
      alignItems: 'center',
      paddingTop: 8
    },
    images: {
      width: 328,
      height: 328,
      borderWidth: 1,
      marginHorizontal: 3,
      backgroundColor: 'white',
      aspectRatio: 2 / 3
    },
      
})
export default SfaCollectionDetailTransfer