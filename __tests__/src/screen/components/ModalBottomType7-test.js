import React from 'react';
import { Text } from 'react-native';

import { render } from '@testing-library/react-native';
import ModalBottomType7 from '../../../../src/components/modal_bottom/ModalBottomType7';

describe('test warning at component modal add to cart', () => {
  it('should show warning when component warning sent', () => {
    const warning = () => {
      return <Text> Warning Credit Limit</Text>;
    };
    const { getByTestId } = render(
      <ModalBottomType7 warningContent={warning()} />
    );
    const warningComponent = getByTestId('view-warning-credit');
    expect(warningComponent).toBeDefined();
  });
});
