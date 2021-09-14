import React from 'react';
import { View, Text, Dimensions, Image } from '../../../library/reactPackage';
import { MaterialIcon, Tooltip } from '../../../library/thirdPartyPackage';
import { Fonts, GlobalStyle } from '../../../helpers';
import masterColor from '../../../config/masterColor.json';

const { width } = Dimensions.get('window');

/**
 * Tooltip Component
 *
 * @param {*} props
 * @param {number} width number
 * @param {function} setOpenTooltip function useState
 * @param {boolean} openTooltip boolean - value of setOpenTooltip state
 * @returns
 */
const tooltipComponent = props => {
  const w = props.width ? props.width : 0.4 * width;
  return (
    <>
      <Tooltip
        backgroundColor={masterColor.fontBlack50OP80}
        height={55}
        withOverlay={false}
        withPointer={false}
        onOpen={() => props.setOpenTooltip}
        onClose={() => props.setOpenTooltip}
        containerStyle={{
          padding: 8,
          width: w
        }}
        popover={<Text style={Fonts.type87}> {props?.tooltipText} </Text>}
      >
        {props.openTooltip ? (
          <MaterialIcon
            name="help"
            style={{ marginLeft: 6 }}
            size={13}
            color={masterColor.mainColor}
          />
        ) : (
          <View />
        )}
      </Tooltip>
    </>
  );
};

/**
 * Card Header Badge
 * @param {string} title string
 * @param {string} backgroundColor string
 * @param {string} textColor string
 * @returns
 */
const CardHeaderBadge = props => {
  return (
    <View style={{ borderRadius: 30, backgroundColor: props.backgroundColor }}>
      <Text style={[Fonts.type38, { padding: 8, color: props.textColor }]}>
        {props.title}
      </Text>
    </View>
  );
};

/**
 * CARD HEADER
 * @param {string} title string
 * @param {StyleSheet} styleContainer StyleSheet - for container style
 * @param {StyleSheet} styleCard StyleSheet - for card
 * @param {StyleSheet} styleCardView StyleSheet - for card view
 * @param {any} renderCardHeaderBadge function
 * @param {any} renderCardBody function
 * @returns
 */
const CardHeader = props => {
  return (
    <View style={{ ...props?.styleContainer }}>
      <View style={{ ...props?.styleCard }}>
        <View style={{ ...props?.styleCardView }}>
          <Text style={Fonts.type48}>{props.title}</Text>
          {props?.renderCardHeaderBadge ? props.renderCardHeaderBadge() : null}
        </View>
        <View style={[GlobalStyle.lines, { flex: 1, marginVertical: 8 }]} />
        {props.renderCardBody ? props.renderCardBody() : null}
      </View>
    </View>
  );
};

const icon = props => {
  const size = props?.size ? props.size : 16;
  return (
    <MaterialIcon
      name={props?.name}
      color={masterColor.mainColor}
      size={size}
      style={props?.style}
    />
  );
};

/**
 * CARD BODY TITLE
 * @param {string} value string
 * @param {StyleSheet} titleStyle StyleSheet
 * @returns
 */
const cardBodyTitle = props => {
  return (
    <View style={{ flexDirection: 'row' }}>
      {props?.titleIcon?.prefixIcon
        ? icon({
            name: props?.titleIcon.prefixIcon,
            size: props?.titleIcon?.prefixSize,
            style: props?.titleIcon?.prefixStyle
          })
        : null}
      <Text style={[Fonts.type17, { ...props?.titleStyle }]}>
        {props?.title}
      </Text>
      {props?.titleIcon?.suffixIcon
        ? icon({
            name: props?.titleIcon.suffixIcon,
            size: props?.titleIcon?.suffixSize,
            style: props?.titleIcon?.suffixStyle
          })
        : null}
    </View>
  );
};

/**
 * CARD BODY VALUE
 * @param {string} value string
 * @param {StyleSheet} valueStyle StyleSheet
 * @returns
 */
const cardBodyValue = props => {
  return (
    <View style={{ flexDirection: 'row' }}>
      {props?.valueIcon?.prefixIcon
        ? icon({
            name: props?.valueIcon.prefixIcon,
            size: props?.valueIcon?.prefixSize,
            style: props?.valueIcon?.prefixStyle
          })
        : null}
      <Text style={{ ...Fonts.type17, ...props?.valueStyle }}>
        {props?.value}
      </Text>
      {props?.valueIcon?.suffixIcon
        ? icon({
            name: props?.valueIcon.suffixIcon,
            size: props?.valueIcon?.suffixSize,
            style: props?.valueIcon?.suffixStyle
          })
        : null}
    </View>
  );
};

/**
 * RENDER IMAGE
 *
 * Example use image payload: {uri: `data:image/jpeg;base64, ${items.imageSource}`}
 *
 * @param {*} props
 * @returns
 */
const renderImage = props => {
  return (
    <View style={{ flexDirection: 'row' }}>
      <View style={{ ...props?.imageContainerStyle }}>
        <Image
          source={{ ...props?.imageSource }}
          style={{ ...props?.imageSourceStyle }}
        />
      </View>
    </View>
  );
};

/**
 * CARD BODY
 * @param {string} title string
 * @param {*} value string | number
 * @param {string} imageSource string
 * @param {StyleSheet} imageContainerStyle StyleSheet
 * @param {StyleSheet} imageSourceStyle StyleSheet
 * @param {StyleSheet} titleStyle StyleSheet - for title
 * @param {StyleSheet} valueStyle StyleSheet - for value
 * @param {string} valuePosition right | bottom; default: right
 * @param {StyleSheet} styleCardView StyleSheet - for card view
 * @param {*} titleIcon Object - {
            prefixIcon: 'date-range',
            prefixStyle: {} // StyleSheet,
            prefixSize: 16,
            suffixIcon: 'help',
            suffixStyle: {}, // StyleSheet
            suffixSize: 16,
          }
 * @param {*} valueIcon Object - {
            prefixIcon: 'date-range',
            prefixStyle: {} // StyleSheet,
            prefixSize: 16,
            suffixIcon: 'help',
            suffixStyle: {}, // StyleSheet
            suffixSize: 16
          }
 * @returns
 */
const CardBody = props => {
  const valuePosition = props.valuePosition ? props.valuePosition : 'right';
  return (
    <>
      <View style={{ marginBottom: 8, ...props?.styleCardView }}>
        {props?.tooltip ? (
          <View style={{ flexDirection: 'row' }}>
            {cardBodyTitle(props)}
            {props?.tooltip ? tooltipComponent(props.tooltip) : null}
          </View>
        ) : (
          cardBodyTitle(props)
        )}
        {valuePosition === 'right' ? (
          <View style={{ flexDirection: 'column' }}>
            {cardBodyValue(props)}
          </View>
        ) : null}
      </View>

      {valuePosition === 'bottom' ? (
        <View style={{ flexDirection: 'row' }}>{cardBodyValue(props)}</View>
      ) : null}
      <View
        style={{
          ...props?.imageSourceStyle,
          alignItems: 'center',
          justifyContent: 'center',
          alignContent:'center',
          alignSelf:'center',
          borderColor: '#ffffff'
        }}
      >
        {props?.loadingImage ? (
          <Image
            source={require('../../../assets/gif/loading/load_triagle.gif')}
            style={{ height: 50, width: 50 }}
          />
        ) : (
          renderImage(props)
        )}
      </View>
    </>
  );
};

export { CardHeaderBadge, CardHeader, CardBody };
