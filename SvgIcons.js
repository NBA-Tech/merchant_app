import React from 'react';
import Svg, { Path, Defs, LinearGradient, Stop,G } from 'react-native-svg';
import { Dimensions } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

export const TopHeaderBackground = () => {
    return (
        <Svg width={360} height={290} viewBox="0 60 360 290" fill="none">
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
      <Svg width="380" height="131" viewBox="0 30 380 111" fill="none">
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


export const NoInterNetIcon = () => {
  return (
    <Svg xmlns="http://www.w3.org/2000/svg" width="66" height="66" viewBox="0 0 66 66" fill="none">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.608 29.5955C22.6325 15.3642 26.6447 8.25 33 8.25C39.3552 8.25 43.3675 15.3642 51.392 29.5955L52.393 31.3665C59.0617 43.1915 62.3975 49.104 59.3835 53.427C56.3695 57.75 48.9115 57.75 34.001 57.75H31.999C17.0885 57.75 9.63049 57.75 6.61649 53.427C3.60249 49.104 6.93824 43.1915 13.607 31.3665L14.608 29.5955ZM33 19.9375C33.547 19.9375 34.0716 20.1548 34.4584 20.5416C34.8452 20.9284 35.0625 21.453 35.0625 22V35.75C35.0625 36.297 34.8452 36.8216 34.4584 37.2084C34.0716 37.5952 33.547 37.8125 33 37.8125C32.453 37.8125 31.9284 37.5952 31.5416 37.2084C31.1548 36.8216 30.9375 36.297 30.9375 35.75V22C30.9375 21.453 31.1548 20.9284 31.5416 20.5416C31.9284 20.1548 32.453 19.9375 33 19.9375ZM33 46.75C33.7293 46.75 34.4288 46.4603 34.9445 45.9445C35.4603 45.4288 35.75 44.7293 35.75 44C35.75 43.2707 35.4603 42.5712 34.9445 42.0555C34.4288 41.5397 33.7293 41.25 33 41.25C32.2706 41.25 31.5712 41.5397 31.0554 42.0555C30.5397 42.5712 30.25 43.2707 30.25 44C30.25 44.7293 30.5397 45.4288 31.0554 45.9445C31.5712 46.4603 32.2706 46.75 33 46.75Z"
        fill="#F24E1E"
      />
    </Svg>
  );
};

export const StatIcon = () => (
  <Svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
    <Path
      d="M3 21V19L5 17V21H3ZM7 21V15L9 13V21H7ZM11 21V13L13 15.025V21H11ZM15 21V15.025L17 13.025V21H15ZM19 21V11L21 9V21H19ZM3 15.825V13L10 6L14 10L21 3V5.825L14 12.825L10 8.825L3 15.825Z"
      fill="white"
    />
  </Svg>
);

export const RightArrow = ({fill,width=24,height=24}) => (
  <Svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 20 24" fill="none">
    <Path
      d="M6.025 22L4.25 20.225L12.475 12L4.25 3.775L6.025 2L16.025 12L6.025 22Z"
      fill={fill}
    />
  </Svg>
);


export const BankIcon = ({ width = 24, height = 24, fill = "#1286ED" }) => (
  <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
    <Path d="M5 17V10H7V17H5ZM11 17V10H13V17H11ZM2 21V19H22V21H2ZM17 17V10H19V17H17ZM2 8V6L12 1L22 6V8H2ZM6.45 6H17.55L12 3.25L6.45 6Z" fill={fill} />
  </Svg>
);


export const DownloadIcon = ({ width = 24, height = 25, fill = "#1286ED" }) => (
  <Svg width={width} height={height} viewBox="0 0 24 25" fill="none">
    <Path d="M12 16.7346L7 11.7346L8.4 10.2846L11 12.8846V4.73462H13V12.8846L15.6 10.2846L17 11.7346L12 16.7346ZM6 20.7346C5.45 20.7346 4.97917 20.5388 4.5875 20.1471C4.19583 19.7555 4 19.2846 4 18.7346V15.7346H6V18.7346H18V15.7346H20V18.7346C20 19.2846 19.8042 19.7555 19.4125 20.1471C19.0208 20.5388 18.55 20.7346 18 20.7346H6Z" fill={fill} />
  </Svg>
);

export const UpiIcon = () => (
  <Svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
    <Path d="M15.4936 0.5L23.0675 12.558L6.99951 24.5L15.4936 0.5Z" fill="#29CEFB" />
    <Path d="M8.4941 0.5L16.068 12.558L0 24.5L8.4941 0.5Z" fill="#1286ED" />
  </Svg>
);
