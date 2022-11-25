import React from 'react';
import ReactIcoMoon from 'react-icomoon';
import icoMoonConfig from './selection.json';
import {Svg, Path} from 'react-native-svg';
import {ViewStyle} from 'react-native';

interface SVGIconProps {
  name: string;
  size?: number;
  color?: string;
  disableFill?: boolean;
  style?: ViewStyle;
}

const SVGIcon: React.FC<SVGIconProps> = ({
  name,
  size = 30,
  color,
  disableFill = false,
  style,
}) => {
  return (
    <ReactIcoMoon
      native
      // @ts-ignore
      style={style}
      iconSet={icoMoonConfig}
      SvgComponent={Svg}
      PathComponent={Path}
      icon={name}
      size={size}
      color={color}
      disableFill={color != null}
    />
  );
};

export default SVGIcon;
