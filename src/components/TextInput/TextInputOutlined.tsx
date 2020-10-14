import * as React from 'react';
import {
  Animated,
  View,
  TextInput as NativeTextInput,
  StyleSheet,
  I18nManager,
  Platform,
  TextStyle,
  ColorValue,
  LayoutChangeEvent,
} from 'react-native';

import { Outline } from './Addons/Outline';
import { AdornmentType, AdornmentSide } from './Adornment/enums';
import TextInputAdornment, {
  getAdornmentConfig,
  getAdornmentStyleAdjustmentForNativeInput,
  TextInputAdornmentProps,
} from './Adornment/TextInputAdornment';
import {
  MAXIMIZED_LABEL_FONT_SIZE,
  MINIMIZED_LABEL_FONT_SIZE,
  LABEL_WIGGLE_X_OFFSET,
  ADORNMENT_SIZE,
  OUTLINE_MINIMIZED_LABEL_Y_OFFSET,
  LABEL_PADDING_TOP,
  MIN_DENSE_HEIGHT_OUTLINED,
  LABEL_PADDING_TOP_DENSE,
} from './constants';
import {
  calculateLabelTopPosition,
  calculateInputHeight,
  calculatePadding,
  adjustPaddingOut,
  Padding,
  calculateOutlinedIconAndAffixTopPosition,
  getOutlinedInputColors,
  getConstants,
} from './helpers';
import InputLabel from './Label/InputLabel';
import LabelBackground from './Label/LabelBackground';
import type { RenderProps, ChildTextInputProps } from './types';

const TextInputOutlined = ({
  disabled = false,
  editable = true,
  label,
  error = false,
  selectionColor: customSelectionColor,
  cursorColor,
  underlineColor: _underlineColor,
  outlineColor: customOutlineColor,
  activeOutlineColor,
  outlineStyle,
  textColor,
  dense,
  style,
  theme,
  render = (props: RenderProps) => <NativeTextInput {...props} />,
  multiline = false,
  parentState,
  innerRef,
  onFocus,
  forceFocus,
  onBlur,
  onChangeText,
  onLayoutAnimatedText,
  onLabelTextLayout,
  onLeftAffixLayoutChange,
  onRightAffixLayoutChange,
  onInputLayout,
  onLayout,
  left,
  right,
  placeholderTextColor,
  testID = 'text-input-outlined',
  contentStyle,
  scaledLabel,
  ...rest
}: ChildTextInputProps) => {
  const adornmentConfig = getAdornmentConfig({ left, right });

  const { colors, isV3, roundness } = theme;
  const font = isV3 ? theme.fonts.bodyLarge : theme.fonts.regular;
  const hasActiveOutline = parentState.focused || error;

  const { INPUT_PADDING_HORIZONTAL, MIN_HEIGHT, ADORNMENT_OFFSET, MIN_WIDTH } =
    getConstants(isV3);

  const {
    fontSize: fontSizeStyle,
    fontWeight,
    lineHeight: lineHeightStyle,
    height,
    backgroundColor = colors?.background,
    paddingHorizontal,
    paddingVertical,
    paddingTop: paddingTopProp,
    paddingBottom: paddingBottomProp,
    textAlign,
    ...viewStyle
  } = (StyleSheet.flatten(style) || {}) as TextStyle;
  const fontSize = fontSizeStyle || MAXIMIZED_LABEL_FONT_SIZE;
  const lineHeight =
    lineHeightStyle || (Platform.OS === 'web' ? fontSize * 1.2 : undefined);

  const {
    inputTextColor,
    activeColor,
    outlineColor,
    placeholderColor,
    errorColor,
    selectionColor,
  } = getOutlinedInputColors({
    activeOutlineColor,
    customOutlineColor,
    customSelectionColor,
    textColor,
    disabled,
    error,
    theme,
  });

  const densePaddingTop = label ? LABEL_PADDING_TOP_DENSE : 0;
  const paddingTop = label ? LABEL_PADDING_TOP : 0;
  const yOffset = label ? OUTLINE_MINIMIZED_LABEL_Y_OFFSET : 0;

  const labelScale = MINIMIZED_LABEL_FONT_SIZE / fontSize;
  const fontScale = MAXIMIZED_LABEL_FONT_SIZE / fontSize;

  const labelWidth = parentState.labelLayout.width;
  const labelHeight = parentState.labelLayout.height;
  const labelHalfWidth = labelWidth / 2;
  const labelHalfHeight = labelHeight / 2;

  const baseLabelTranslateX =
    (I18nManager.getConstants().isRTL ? 1 : -1) *
    (labelHalfWidth -
      (labelScale * labelWidth) / 2 -
      (fontSize - MINIMIZED_LABEL_FONT_SIZE) * labelScale);

  let labelTranslationXOffset = 0;
  const isAdornmentLeftIcon = adornmentConfig.some(
    ({ side, type }) =>
      side === AdornmentSide.Left && type === AdornmentType.Icon
  );
  const isAdornmentRightIcon = adornmentConfig.some(
    ({ side, type }) =>
      side === AdornmentSide.Right && type === AdornmentType.Icon
  );

  if (isAdornmentLeftIcon) {
    labelTranslationXOffset =
      (I18nManager.getConstants().isRTL ? -1 : 1) *
      (ADORNMENT_SIZE + ADORNMENT_OFFSET - (isV3 ? 0 : 8));
  }

  const minInputHeight =
    (dense ? MIN_DENSE_HEIGHT_OUTLINED : MIN_HEIGHT) - paddingTop;

  const inputHeight = calculateInputHeight(labelHeight, height, minInputHeight);

  const topPosition = calculateLabelTopPosition(
    labelHeight,
    inputHeight,
    paddingTop
  );

  if (height && typeof height !== 'number') {
    // eslint-disable-next-line
    console.warn('Currently we support only numbers in height prop');
  }

  const paddingSettings = {
    height: height ? +height : null,
    labelHalfHeight,
    offset: paddingTop,
    multiline: multiline ? multiline : null,
    dense: dense ? dense : null,
    topPosition,
    fontSize,
    lineHeight,
    label,
    scale: fontScale,
    isAndroid: Platform.OS === 'android',
    styles: StyleSheet.flatten(
      dense ? styles.inputOutlinedDense : styles.inputOutlined
    ) as Padding,
  };

  const pad = calculatePadding(paddingSettings);

  const paddingOutDefault = adjustPaddingOut({ ...paddingSettings, pad });
  const resolvedPaddingHorizontal =
    typeof paddingHorizontal === 'number'
      ? paddingHorizontal
      : INPUT_PADDING_HORIZONTAL;

  let paddingOut = paddingOutDefault;

<<<<<<< HEAD
  if (paddingVertical !== undefined) {
    if (typeof paddingVertical !== 'number') {
      console.warn('Currently we support only numbers in paddingVertical prop');
    } else {
      paddingOut = {
        paddingTop: paddingVertical,
        paddingBottom: paddingVertical,
=======
    const {
      fontSize: fontSizeStyle,
      fontWeight,
      height,
      backgroundColor = colors.background,
      paddingHorizontal,
      textAlign,
      ...viewStyle
    } = (StyleSheet.flatten(style) || {}) as TextStyle;
    const fontSize = fontSizeStyle || MAXIMIZED_LABEL_FONT_SIZE;

    let inputTextColor, activeColor, outlineColor, placeholderColor, errorColor;

    if (disabled) {
      inputTextColor = activeColor = color(colors.text)
        .alpha(0.54)
        .rgb()
        .string();
      placeholderColor = outlineColor = colors.disabled;
    } else {
      inputTextColor = colors.text;
      activeColor = error ? colors.error : colors.primary;
      placeholderColor = outlineColor = colors.placeholder;
      errorColor = colors.error;
    }

    const labelScale = MINIMIZED_LABEL_FONT_SIZE / fontSize;
    const fontScale = MAXIMIZED_LABEL_FONT_SIZE / fontSize;

    const labelWidth = parentState.labelLayout.width;
    const labelHeight = parentState.labelLayout.height;
    const labelHalfWidth = labelWidth / 2;
    const labelHalfHeight = labelHeight / 2;

    const baseLabelTranslateX =
      (I18nManager.isRTL ? 1 : -1) *
      (labelHalfWidth -
        (labelScale * labelWidth) / 2 -
        (fontSize - MINIMIZED_LABEL_FONT_SIZE) * labelScale);

    let labelTranslationXOffset = 0;
    const isAdornmentLeftIcon = adornmentConfig.some(
      ({ side, type }) =>
        side === AdornmentSide.Left && type === AdornmentType.Icon
    );
    if (isAdornmentLeftIcon) {
      labelTranslationXOffset =
        (I18nManager.isRTL ? -1 : 1) * (ADORNMENT_SIZE + ADORNMENT_OFFSET - 8);
    }

    const minInputHeight =
      (dense ? MIN_DENSE_HEIGHT : MIN_HEIGHT) - LABEL_PADDING_TOP;

    const inputHeight = calculateInputHeight(
      labelHeight,
      height,
      minInputHeight
    );

    const topPosition = calculateLabelTopPosition(
      labelHeight,
      inputHeight,
      LABEL_PADDING_TOP
    );

    if (height && typeof height !== 'number') {
      // eslint-disable-next-line
      console.warn('Currently we support only numbers in height prop');
    }

    const paddingSettings = {
      height: height ? +height : null,
      labelHalfHeight,
      offset: LABEL_PADDING_TOP,
      multiline: multiline ? multiline : null,
      dense: dense ? dense : null,
      topPosition,
      fontSize,
      label,
      scale: fontScale,
      isAndroid: Platform.OS === 'android',
      styles: StyleSheet.flatten(
        dense ? styles.inputOutlinedDense : styles.inputOutlined
      ) as Padding,
    };

    const pad = calculatePadding(paddingSettings);

    const paddingOut = adjustPaddingOut({ ...paddingSettings, pad });

    const baseLabelTranslateY =
      -labelHalfHeight - (topPosition + OUTLINE_MINIMIZED_LABEL_Y_OFFSET);

      const placeholderOpacity = hasActiveOutline
        ? interpolatePlaceholder(parentState.labeled, hasActiveOutline)
        : parentState.labelLayout.measured
        ? 1
        : 0;

    const labelProps = {
      label,
      onLayoutAnimatedText,
      placeholderOpacity,
      error,
      placeholderStyle: StyleSheet.flatten([styles.placeholder, { paddingHorizontal }]),
      baseLabelTranslateY,
      baseLabelTranslateX,
      font,
      fontSize,
      fontWeight,
      labelScale,
      wiggleOffsetX: LABEL_WIGGLE_X_OFFSET,
      topPosition,
      hasActiveOutline,
      activeColor,
      placeholderColor,
      backgroundColor: backgroundColor as ColorValue,
      errorColor,
      labelTranslationXOffset,
    };

    const minHeight = (height ||
      (dense ? MIN_DENSE_HEIGHT : MIN_HEIGHT)) as number;

    const { leftLayout, rightLayout } = parentState;

    const leftAffixTopPosition = calculateOutlinedIconAndAffixTopPosition({
      height: minHeight,
      affixHeight: leftLayout.height || 0,
      labelYOffset: -OUTLINE_MINIMIZED_LABEL_Y_OFFSET,
    });

    const rightAffixTopPosition = calculateOutlinedIconAndAffixTopPosition({
      height: minHeight,
      affixHeight: rightLayout.height || 0,
      labelYOffset: -OUTLINE_MINIMIZED_LABEL_Y_OFFSET,
    });
    const iconTopPosition = calculateOutlinedIconAndAffixTopPosition({
      height: minHeight,
      affixHeight: ADORNMENT_SIZE,
      labelYOffset: -OUTLINE_MINIMIZED_LABEL_Y_OFFSET,
    });

    const rightAffixWidth = right
      ? rightLayout.width || ADORNMENT_SIZE
      : ADORNMENT_SIZE;

    const leftAffixWidth = left
      ? leftLayout.width || ADORNMENT_SIZE
      : ADORNMENT_SIZE;

    const adornmentStyleAdjustmentForNativeInput = getAdornmentStyleAdjustmentForNativeInput(
      {
        adornmentConfig,
        rightAffixWidth,
        leftAffixWidth,
        mode: 'outlined',
      }
    );
    const affixTopPosition = {
      [AdornmentSide.Left]: leftAffixTopPosition,
      [AdornmentSide.Right]: rightAffixTopPosition,
    };
    const onAffixChange = {
      [AdornmentSide.Left]: onLeftAffixLayoutChange,
      [AdornmentSide.Right]: onRightAffixLayoutChange,
    };

    let adornmentProps: TextInputAdornmentProps = {
      adornmentConfig,
      forceFocus,
      topPosition: {
        [AdornmentType.Icon]: iconTopPosition,
        [AdornmentType.Affix]: affixTopPosition,
      },
      onAffixChange,
      isTextInputFocused: parentState.focused,
    };
    if (adornmentConfig.length) {
      adornmentProps = {
        ...adornmentProps,
        left,
        right,
        textStyle: { ...font, fontSize, fontWeight },
        visible: this.props.parentState.labeled,
>>>>>>> c56af130 (Apply customisations)
      };
    }
  }

  if (paddingBottomProp !== undefined) {
    if (typeof paddingBottomProp !== 'number') {
      console.warn('Currently we support only numbers in paddingBottom prop');
    } else {
      paddingOut = {
        ...paddingOut,
        paddingBottom: paddingBottomProp,
      };
    }
  }

  if (paddingTopProp !== undefined) {
    if (typeof paddingTopProp !== 'number') {
      console.warn('Currently we support only numbers in paddingTop prop');
    } else {
      paddingOut = {
        ...paddingOut,
        paddingTop: paddingTopProp,
      };
    }
  }

  const baseLabelTranslateY = -labelHalfHeight - (topPosition + yOffset);

  const { current: placeholderOpacityAnims } = React.useRef([
    new Animated.Value(0),
    new Animated.Value(1),
  ]);

  const placeholderOpacity = hasActiveOutline
    ? parentState.labeled
    : placeholderOpacityAnims[parentState.labelLayout.measured ? 1 : 0];

  const placeholderStyle = {
    position: 'absolute',
    left: 0,
    paddingHorizontal: resolvedPaddingHorizontal,
  };

  const placeholderTextColorBasedOnState = parentState.displayPlaceholder
    ? placeholderTextColor ?? placeholderColor
    : 'transparent';

  const labelBackgroundColor: ColorValue =
    backgroundColor === 'transparent'
      ? theme.colors.background
      : backgroundColor;

  const labelProps = {
    label,
    onLayoutAnimatedText,
    onLabelTextLayout,
    placeholderOpacity,
    labelError: error,
    placeholderStyle,
    baseLabelTranslateY,
    baseLabelTranslateX,
    font,
    fontSize,
    lineHeight,
    fontWeight,
    labelScale,
    wiggleOffsetX: LABEL_WIGGLE_X_OFFSET,
    topPosition,
    hasActiveOutline,
    activeColor,
    placeholderColor,
    backgroundColor: labelBackgroundColor,
    errorColor,
    labelTranslationXOffset,
    roundness,
    maxFontSizeMultiplier: rest.maxFontSizeMultiplier,
    testID,
    contentStyle,
    inputContainerLayout: {
      width:
        parentState.inputContainerLayout.width +
        (isAdornmentRightIcon || isAdornmentLeftIcon
          ? INPUT_PADDING_HORIZONTAL
          : 0),
    },
    opacity:
      parentState.value || parentState.focused
        ? parentState.labelLayout.measured
          ? 1
          : 0
        : 1,
    isV3,
  };

  const onLayoutChange = React.useCallback(
    (e: LayoutChangeEvent) => {
      onInputLayout(e);
      onLayout?.(e);
    },
    [onLayout, onInputLayout]
  );

  const minHeight = (height ||
    (dense ? MIN_DENSE_HEIGHT_OUTLINED : MIN_HEIGHT)) as number;

  const outlinedHeight =
    inputHeight + (dense ? densePaddingTop / 2 : paddingTop);
  const { leftLayout, rightLayout } = parentState;

  const leftAffixTopPosition = calculateOutlinedIconAndAffixTopPosition({
    height: outlinedHeight,
    affixHeight: leftLayout.height || 0,
    labelYOffset: -yOffset,
  });

  const rightAffixTopPosition = calculateOutlinedIconAndAffixTopPosition({
    height: outlinedHeight,
    affixHeight: rightLayout.height || 0,
    labelYOffset: -yOffset,
  });
  const iconTopPosition = calculateOutlinedIconAndAffixTopPosition({
    height: outlinedHeight,
    affixHeight: ADORNMENT_SIZE,
    labelYOffset: -yOffset,
  });

  const rightAffixWidth = right
    ? rightLayout.width || ADORNMENT_SIZE
    : ADORNMENT_SIZE;

  const leftAffixWidth = left
    ? leftLayout.width || ADORNMENT_SIZE
    : ADORNMENT_SIZE;

  const adornmentStyleAdjustmentForNativeInput =
    getAdornmentStyleAdjustmentForNativeInput({
      adornmentConfig,
      rightAffixWidth,
      leftAffixWidth,
      mode: 'outlined',
      isV3,
    });
  const affixTopPosition = {
    [AdornmentSide.Left]: leftAffixTopPosition,
    [AdornmentSide.Right]: rightAffixTopPosition,
  };
  const onAffixChange = {
    [AdornmentSide.Left]: onLeftAffixLayoutChange,
    [AdornmentSide.Right]: onRightAffixLayoutChange,
  };

  let adornmentProps: TextInputAdornmentProps = {
    adornmentConfig,
    forceFocus,
    topPosition: {
      [AdornmentType.Icon]: iconTopPosition,
      [AdornmentType.Affix]: affixTopPosition,
    },
    onAffixChange,
    isTextInputFocused: parentState.focused,
    maxFontSizeMultiplier: rest.maxFontSizeMultiplier,
    disabled,
  };
  if (adornmentConfig.length) {
    adornmentProps = {
      ...adornmentProps,
      left,
      right,
      textStyle: { ...font, fontSize, lineHeight, fontWeight },
      visible: parentState.labeled,
    };
  }

  return (
    <View style={viewStyle}>
      {/*
          Render the outline separately from the container
          This is so that the label can overlap the outline
          Otherwise the border will cut off the label on Android
          */}
      <Outline
        isV3={isV3}
        style={outlineStyle}
        label={label}
        roundness={roundness}
        hasActiveOutline={hasActiveOutline}
        focused={parentState.focused}
        activeColor={activeColor}
        outlineColor={outlineColor}
        backgroundColor={backgroundColor}
      />
      <View
        style={[
          styles.labelContainer,
          {
            paddingTop,
            minHeight,
          },
        ]}
      >
        {label ? (
          <InputLabel
            labeled={parentState.labeled}
            error={parentState.error}
            focused={parentState.focused}
            scaledLabel={scaledLabel}
            wiggle={Boolean(parentState.value && labelProps.labelError)}
            labelLayoutMeasured={parentState.labelLayout.measured}
            labelLayoutWidth={parentState.labelLayout.width}
            labelLayoutHeight={parentState.labelLayout.height}
            {...labelProps}
            labelBackground={LabelBackground}
            maxFontSizeMultiplier={rest.maxFontSizeMultiplier}
          />
<<<<<<< HEAD
        ) : null}
        {render?.({
          ...rest,
          ref: innerRef,
          onLayout: onLayoutChange,
          onChangeText,
          placeholder: rest.placeholder,
          editable: !disabled && editable,
          selectionColor,
          cursorColor:
            typeof cursorColor === 'undefined' ? activeColor : cursorColor,
          placeholderTextColor: placeholderTextColorBasedOnState,
          onFocus,
          onBlur,
          underlineColorAndroid: 'transparent',
          multiline,
          style: [
            styles.input,
            !multiline || (multiline && height) ? { height: inputHeight } : {},
            paddingOut,
            {
              ...font,
              fontSize,
              lineHeight,
              fontWeight,
              color: inputTextColor,
              textAlignVertical: multiline ? 'top' : 'center',
              textAlign: textAlign
                ? textAlign
                : I18nManager.getConstants().isRTL
                ? 'right'
                : 'left',
              paddingHorizontal: resolvedPaddingHorizontal,
              minWidth: Math.min(
                parentState.labelTextLayout.width +
                  2 * resolvedPaddingHorizontal,
                MIN_WIDTH
              ),
            },
            Platform.OS === 'web' ? { outline: 'none' } : undefined,
            adornmentStyleAdjustmentForNativeInput,
            contentStyle,
          ],
          testID,
        } as RenderProps)}
=======
          <View
            style={[
              styles.labelContainer,
              {
                paddingTop: LABEL_PADDING_TOP,
                minHeight,
              },
            ]}
          >
            <InputLabel
              parentState={parentState}
              labelProps={labelProps}
              labelBackground={LabelBackground}
            />
            {render?.({
              ...rest,
              ref: innerRef,
              onChangeText,
              placeholder: label
                ? parentState.placeholder
                : this.props.placeholder,
              placeholderTextColor: placeholderTextColor || placeholderColor,
              editable: !disabled && editable,
              selectionColor:
                typeof selectionColor === 'undefined'
                  ? activeColor
                  : selectionColor,
              onFocus,
              onBlur,
              underlineColorAndroid: 'transparent',
              multiline,
              style: [
                styles.input,
                !multiline || (multiline && height)
                  ? { height: inputHeight }
                  : {},
                paddingOut,
                { paddingHorizontal },
                {
                  ...font,
                  fontSize,
                  fontWeight,
                  color: inputTextColor,
                  textAlignVertical: multiline ? 'top' : 'center',
                  textAlign: textAlign
                    ? textAlign
                    : I18nManager.isRTL
                    ? 'right'
                    : 'left',
                },
                adornmentStyleAdjustmentForNativeInput,
              ],
            } as RenderProps)}
          </View>
          <TextInputAdornment {...adornmentProps} />
        </View>
>>>>>>> c56af130 (Apply customisations)
      </View>
      <TextInputAdornment {...adornmentProps} />
    </View>
  );
};

export default TextInputOutlined;

<<<<<<< HEAD
=======
type OutlineProps = {
  activeColor: string;
  hasActiveOutline?: boolean;
  outlineColor?: string;
  backgroundColor: ColorValue;
  theme: ReactNativePaper.Theme;
};

const Outline = ({
  theme,
  activeColor,
  backgroundColor,
}: OutlineProps) => (
  <View
    pointerEvents="none"
    style={[
      styles.outline,
      // eslint-disable-next-line react-native/no-inline-styles
      {
        backgroundColor,
        borderRadius: theme.roundness,
        borderWidth: 2,
        borderColor: activeColor,
      },
    ]}
  />
);

>>>>>>> c56af130 (Apply customisations)
const styles = StyleSheet.create({
  labelContainer: {
    paddingBottom: 0,
    flexGrow: 1,
  },
  input: {
    margin: 0,
    flexGrow: 1,
  },
  inputOutlined: {
    paddingTop: 8,
    paddingBottom: 8,
  },
  inputOutlinedDense: {
    paddingTop: 4,
    paddingBottom: 4,
  },
});
