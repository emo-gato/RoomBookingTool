import { useMemo } from "react";
import styles from "./MapPin.module.css";

const MapPin = ({
  shape,
  k,
  shape1,
  k1,
  showDefault,
  showK,
  showActive,
  mapPinPosition,
  mapPinTop,
  mapPinLeft,
  mapPinBorderRadius,
  defaultWidth,
  kLeft,
  kLineHeight,
  kFontFamily,
  kColor,
  kTextAlign,
  kFontWeight,
  activeWidth,
  kLeft1,
  kLineHeight1,
  kFontFamily1,
  kColor1,
  kTextAlign1,
  kFontWeight1,
}) => {
  const mapPinStyle = useMemo(() => {
    return {
      position: mapPinPosition,
      top: mapPinTop,
      left: mapPinLeft,
      borderRadius: mapPinBorderRadius,
    };
  }, [mapPinPosition, mapPinTop, mapPinLeft, mapPinBorderRadius]);

  const defaultStyle = useMemo(() => {
    return {
      width: defaultWidth,
    };
  }, [defaultWidth]);

  const kStyle = useMemo(() => {
    return {
      left: kLeft,
      lineHeight: kLineHeight,
      fontFamily: kFontFamily,
      color: kColor,
      textAlign: kTextAlign,
      fontWeight: kFontWeight,
    };
  }, [kLeft, kLineHeight, kFontFamily, kColor, kTextAlign, kFontWeight]);

  const activeStyle = useMemo(() => {
    return {
      width: activeWidth,
    };
  }, [activeWidth]);

  const k1Style = useMemo(() => {
    return {
      left: kLeft1,
      lineHeight: kLineHeight1,
      fontFamily: kFontFamily1,
      color: kColor1,
      textAlign: kTextAlign1,
      fontWeight: kFontWeight1,
    };
  }, [kLeft1, kLineHeight1, kFontFamily1, kColor1, kTextAlign1, kFontWeight1]);

  return (
    <div className={styles.mapPin} style={mapPinStyle}>
      {showDefault && (
        <div className={styles.default} style={defaultStyle}>
          <img className={styles.shapeIcon} alt="" src={shape} />
          {showK && (
            <b className={styles.k} style={kStyle}>
              {k}
            </b>
          )}
        </div>
      )}
      {showActive && (
        <div className={styles.active} style={activeStyle}>
          <img className={styles.shapeIcon1} alt="" src={shape1} />
          <b className={styles.k1} style={k1Style}>
            {k1}
          </b>
        </div>
      )}
    </div>
  );
};

export default MapPin;
