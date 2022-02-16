import React, { useState } from 'react';
import { View, Dimensions } from '../../library/reactPackage';
import { MaterialIcon, Tooltip } from '../../library/thirdPartyPackage';
import masterColor from '../../config/masterColor.json';

const { width } = Dimensions.get('window');

/**
 * SFA TOOLTIP
 * @param {number} height number
 * @param {any} popover any
 * @returns
 */
const ToolTip = props => {
  const [questionMarkShow, setQuestionMarkShow] = useState(true);
  return (
    <>
      <Tooltip
        backgroundColor={masterColor.fontBlack50OP80}
        height={props?.height ?? 75}
        withOverlay={false}
        withPointer={false}
        onOpen={() => setQuestionMarkShow(false)}
        onClose={() => setQuestionMarkShow(true)}
        containerStyle={{
          width: 0.5 * width
        }}
        popover={props?.popover}
      >
        {questionMarkShow ? (
          <MaterialIcon
            name={props.iconName}
            size={props.iconSize}
            color={props.iconColor}
          />
        ) : (
          <View />
        )}
      </Tooltip>
    </>
  );
};

export default ToolTip;
