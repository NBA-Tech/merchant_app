import React from 'react';
import Svg, { Path, Defs, LinearGradient, Stop,G } from 'react-native-svg';
import { Dimensions } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

export const TopHeaderBackground = () => {
    return (
        <Svg width={360} height={290} viewBox="0 0 360 290" fill="none">
            <Path
                d="M360 111.5V-42H0V289.5C0 289.5 19.2282 239.395 58 199.5C96.7718 159.605 151.474 130.941 236 150C320.526 169.059 360 111.5 360 111.5Z"
                fill="url(#paint0_linear)"
            />
            <Defs>
                <LinearGradient
                    id="paint0_linear"
                    x1={180}
                    y1={-42}
                    x2={180}
                    y2={269}
                    gradientUnits="userSpaceOnUse"
                >
                    <Stop stopColor="#29CEFB" />
                    <Stop offset={1} stopColor="#1286ED" />
                </LinearGradient>
            </Defs>
        </Svg>
    );
};

export const LoginFooter = () => {
    return (
      <Svg width="380" height="131" viewBox="0 0 380 111" fill="none">
        <Defs>
          <LinearGradient id="paint0_linear_1_2950" x1="-28" y1="67" x2="364" y2="67" gradientUnits="userSpaceOnUse">
            <Stop stopColor="#29CEFB" />
            <Stop offset="1" stopColor="#1286ED" />
          </LinearGradient>
        </Defs>
        <Path
          d="M-25.9917 111C-45.6434 111 58.183 66.6331 132 65C188.699 63.7456 262.095 102.98 314.5 82C351.223 67.2981 358.821 32.9345 360.081 13.6846C360.032 5.30125 360 0 360 0C360 0 360.618 5.46424 360.081 13.6846C360.222 38.2726 360.5 89.3736 360.5 111L-25.9917 111Z"
          fill="url(#paint0_linear_1_2950)"
        />
      </Svg>
    );
  };

export const LeftArrow = () => {
  return (
    <Svg xmlns="http://www.w3.org/2000/svg" width="36" height="34" viewBox="0 0 36 34" fill="none">
      <Path d="M25.1551 2.83329L28.3501 5.34788L13.5451 17L28.3501 28.652L25.1551 31.1666L7.1551 17L25.1551 2.83329Z" fill="#1D3039"/>
    </Svg>
  );
};

export const RightArrow = () => {
  return (
    <Svg xmlns="http://www.w3.org/2000/svg" width="36" height="34" viewBox="0 0 36 34" fill="none">
      <Path d="M10.8449 31.1667L7.6499 28.6521L22.4549 17L7.6499 5.34796L10.8449 2.83337L28.8449 17L10.8449 31.1667Z" fill="#1D3039"/>
    </Svg>
  );
};
