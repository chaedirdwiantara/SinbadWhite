import {React, View, StyleSheet, Text, Image} from '../../library/reactPackage';
import {moment} from '../../library/thirdPartyPackage';
import {InputType5} from '../../library/component';
import { toLocalTime} from '../../helpers/TimeHelper';
import { Fonts, MoneyFormatSpace } from '../../helpers';

const SfaCollectionDetailPromo = (props) => {
    const data = props.data

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
            placeholder={data.paymentCollection.paymentCollectionMethod.reference}
            editable={false}
          />
        </View>
        <View style={styles.inputField}>
          <InputType5
            title={`Nomor Promo`}
            placeholder={data.paymentCollection.paymentCollectionMethod.promoNo}
            editable={false}
          />
        </View>
        <View style={styles.inputField}>
          <InputType5
            title={`Principal`}
            placeholder={data.paymentCollection.paymentCollectionMethod.principal.name}
            editable={false}
          />
        </View>
        <View style={styles.inputField}>
          <InputType5
            title={`Nilai Promo`}
            placeholder={MoneyFormatSpace(data.paymentCollection.paymentCollectionMethod.amount)}
            editable={false}
          />
        </View>
        <View style={styles.inputField}>
          <InputType5
            title={`Jumlah Penagihan`}
            placeholder={MoneyFormatSpace(data.paymentCollection.paidAmount)}
            editable={false}
          />
        </View>
        <View style={styles.imageContainer}>
          <Text style={Fonts.type10}>Foto/Gambar</Text>
          <View style={styles.smallContainerImage}>
            <Image
              source={{
                uri: `data:image/jpeg;base64, ${data.paymentCollection.paymentCollectionMethod.image}`
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
      aspectRatio: 2 / 3,
      opacity: 0.5
    },
      
})
export default SfaCollectionDetailPromo