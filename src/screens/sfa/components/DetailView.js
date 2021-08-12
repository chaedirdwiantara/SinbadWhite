import React from 'react';
import { View, Text } from '../../../library/reactPackage';
import { Fonts, GlobalStyle } from '../../../helpers';

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
    <View style={{ ...props.styleContainer }}>
      <View style={{ ...props.styleCard }}>
        <View style={{ ...props.styleCardView }}>
          <Text style={Fonts.type48}>{props.title}</Text>
          {props.renderCardHeaderBadge ? props.renderCardHeaderBadge() : null}
        </View>
        <View style={[GlobalStyle.lines, { flex: 1, marginVertical: 8 }]} />
        {props.renderCardBody ? props.renderCardBody() : null}
      </View>
    </View>
  );
};

/**
 * CARD BODY TITLE
 * @param {string} value string
 * @param {StyleSheet} titleStyle StyleSheet
 * @returns
 */
const cardBodyTitle = props => (
  <Text style={[Fonts.type17, { ...props.titleStyle }]}>{props.title}</Text>
);

/**
 * CARD BODY VALUE
 * @param {string} value string
 * @param {StyleSheet} valueStyle StyleSheet
 * @returns
 */
const cardBodyValue = props => (
  <Text style={[Fonts.type17, { ...props.valueStyle }]}>{props.value}</Text>
);

/**
 * CARD BODY
 * @param {string} title string
 * @param {*} value string | number
 * @param {string} imageSource string
 * @param {StyleSheet} imageSourceStyle StyleSheet
 * @param {StyleSheet} titleStyle StyleSheet - for title
 * @param {StyleSheet} valueStyle StyleSheet - for value
 * @param {*} valuePosition right | bottom; default: right
 * @param {*} viewType date | string; default: string
 * @param {StyleSheet} styleCardView StyleSheet - for card view
 * @returns
 */
const CardBody = props => {
  const valuePosition = props.valuePosition ? props.valuePosition : 'right';

  return (
    <>
      <View style={{ marginBottom: 8, ...props.styleCardView }}>
        {props?.tooltip ? (
          <View style={{ flexDirection: 'row' }}>{cardBodyTitle(props)}</View>
        ) : (
          cardBodyTitle(props)
        )}
        {valuePosition === 'right' ? cardBodyValue(props) : null}
      </View>

      {valuePosition === 'bottom' ? (
        <View style={{ flexDirection: 'row' }}>{cardBodyValue(props)}</View>
      ) : null}

      {props.imageSource ? (
        <View style={{ flexDirection: 'row' }}>
          <View style={{ ...props.imageSourceStyle }}>
            <Text style={Fonts.type17}>{props.value}</Text>
          </View>
        </View>
      ) : null}
    </>
  );
};

export { CardHeaderBadge, CardHeader, CardBody };
