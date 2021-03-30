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
            placeholder={data.referenceCode}
            editable={false}
          />
        </View>
        <View style={styles.inputField}>
          <InputType5
            title={`Nomor Promo`}
            placeholder={data.promoNumber}
            editable={false}
          />
        </View>
        <View style={styles.inputField}>
          <InputType5
            title={`Principal`}
            placeholder={data.principalName}
            editable={false}
          />
        </View>
        <View style={styles.inputField}>
          <InputType5
            title={`Nilai Promo`}
            placeholder={MoneyFormatSpace(data.paymentCollectionMethodAmount)}
            editable={false}
          />
        </View>
        <View style={styles.inputField}>
          <InputType5
            title={`Jumlah Penagihan`}
            placeholder={MoneyFormatSpace(data.paidAmount)}
            editable={false}
          />
        </View>
        <View style={styles.imageContainer}>
          <Text style={Fonts.type10}>Foto/Gambar</Text>
         
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
    }
      
})
export default SfaCollectionDetailPromo