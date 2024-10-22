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