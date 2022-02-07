/* eslint-disable react-hooks/exhaustive-deps */

import React from 'react';
import { View } from '../../../library/reactPackage';
import ErrorBottomFailPayment from '../../../components/error/ModalBottomFailPayment';

/** RENDER MODAL ERROR */
export const ModalError = React.forwardRef((props, ref) => {
  const [open, setOpen] = React.useState(false);
  const [messageError, setMessageError] = React.useState(null);
  const [titleError, setTitleError] = React.useState(null);
  const [buttonTitle, setButtonTitle] = React.useState(null);

  /** FUNCTION HANDLE ERROR */
  const handleError = error => {
    if (error) {
      switch (error.data.code) {
        // case 40005:
        //   handleErrorSpecific(
        //     error,
        //     'Nomor Referensi Duplikat',
        //     'Oke, Mengerti'
        //   );
        //   break;
        default:
          handleErrorGlobal();
          break;
      }
      setOpen(true);
    }
  };

  /** HANDLE ERROR SPECIFIC */
  // const handleErrorSpecific = (error, title, buttonText) => {
  //   setMessageError(error.data.errorMessage);
  //   setTitleError(title);
  //   setButtonTitle(buttonText);
  // };

  /** HANDLE ERROR GLOBAL */
  const handleErrorGlobal = () => {
    setMessageError(null);
    setTitleError(null);
    setButtonTitle(null);
  };

  React.useImperativeHandle(
    ref,
    () => ({
      handleError
    }),
    []
  );

  return (
    <View>
      {open ? (
        <ErrorBottomFailPayment
          open={open}
          onPress={() => setOpen(false)}
          text={messageError}
          errorTitle={titleError}
          buttonTitle={buttonTitle}
        />
      ) : null}
    </View>
  );
});
