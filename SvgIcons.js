import React from 'react';
import Svg, { Path, Defs, LinearGradient, Stop,G,Mask,Rect,ClipPath } from 'react-native-svg';
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
  const { width, height } = Dimensions.get('window'); // Get the device width and height

  return (
    <Svg width={width} height={height / 4} viewBox="0 0 380 111" fill="none" style={{ position: 'absolute', bottom: 0 }}>
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

export const LeftArrow = ({ fill = "white", width = 24, height = 24 }) => (
  <Svg width={width} height={height} viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
      <Path 
          d="M15.975 2.5L17.75 4.275L9.525 12.5L17.75 20.725L15.975 22.5L5.975 12.5L15.975 2.5Z" 
          fill={fill} 
      />
  </Svg>
);

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

export const StatIcon = ({fill='white',height=24,width=24}) => (
  <Svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 24 24" fill="none">
    <Path
      d="M3 21V19L5 17V21H3ZM7 21V15L9 13V21H7ZM11 21V13L13 15.025V21H11ZM15 21V15.025L17 13.025V21H15ZM19 21V11L21 9V21H19ZM3 15.825V13L10 6L14 10L21 3V5.825L14 12.825L10 8.825L3 15.825Z"
      fill={fill}
    />
  </Svg>
);

export const RightArrow = ({fill="#ffffff",width=24,height=24}) => (
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

export const UpiIcon = ({fill='#29CEFB',height=24,width=24}) => (
  <Svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 24 25" fill="none">
    <Path d="M15.4936 0.5L23.0675 12.558L6.99951 24.5L15.4936 0.5Z" fill={fill} />
    <Path d="M8.4941 0.5L16.068 12.558L0 24.5L8.4941 0.5Z" fill="#1286ED" />
  </Svg>
);

export const HouseIcon = ({fill="#1286ED",height=25,width=25}) => (
  <Svg width={width} height={height} viewBox="0 0 25 25" fill="none">
    <Mask id="mask0_125_476" x="0" y="0" width="25" height="25">
      <Rect x="0.5" y="0.5" width="24" height="24" fill="#D9D9D9" />
    </Mask>
    <G mask="url(#mask0_125_476)">
      <Path
        d="M4.5 19.5V10.5C4.5 10.1833 4.57083 9.88333 4.7125 9.6C4.85417 9.31667 5.05 9.08333 5.3 8.9L11.3 4.4C11.65 4.13333 12.05 4 12.5 4C12.95 4 13.35 4.13333 13.7 4.4L19.7 8.9C19.95 9.08333 20.1458 9.31667 20.2875 9.6C20.4292 9.88333 20.5 10.1833 20.5 10.5V19.5C20.5 20.05 20.3042 20.5208 19.9125 20.9125C19.5208 21.3042 19.05 21.5 18.5 21.5H15.5C15.2167 21.5 14.9792 21.4042 14.7875 21.2125C14.5958 21.0208 14.5 20.7833 14.5 20.5V15.5C14.5 15.2167 14.4042 14.9792 14.2125 14.7875C14.0208 14.5958 13.7833 14.5 13.5 14.5H11.5C11.2167 14.5 10.9792 14.5958 10.7875 14.7875C10.5958 14.9792 10.5 15.2167 10.5 15.5V20.5C10.5 20.7833 10.4042 21.0208 10.2125 21.2125C10.0208 21.4042 9.78333 21.5 9.5 21.5H6.5C5.95 21.5 5.47917 21.3042 5.0875 20.9125C4.69583 20.5208 4.5 20.05 4.5 19.5Z"
        fill={fill}
      />
    </G>
  </Svg>
);

export const ArrowIcon = ({ width = 25, height = 25, fill = "#1C1B1F" }) => (
  <Svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 25 25" fill="none">
      <Mask id="mask0_125_480" maskUnits="userSpaceOnUse" x="0" y="0" width="25" height="25">
          <Rect x="0.5" y="0.5" width="24" height="24" fill="#D9D9D9" />
      </Mask>
      <G mask="url(#mask0_125_480)">
          <Path d="M8.5 20.5L7.1 19.075L9.675 16.5H2.5V14.5H9.675L7.1 11.925L8.5 10.5L13.5 15.5L8.5 20.5ZM16.5 14.5L11.5 9.5L16.5 4.5L17.9 5.925L15.325 8.5H22.5V10.5H15.325L17.9 13.075L16.5 14.5Z" fill={fill} />
      </G>
  </Svg>
);

export const QrIcon = ({ width = 24, height = 25, fill = "#1C1B1F" }) => (
  <Svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 24 25" fill="none">
      <Mask id="mask0_125_484" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="25">
          <Rect y="0.5" width="24" height="24" fill="#D9D9D9" />
      </Mask>
      <G mask="url(#mask0_125_484)">
          <Path d="M3 7.5C2.71667 7.5 2.47917 7.40417 2.2875 7.2125C2.09583 7.02083 2 6.78333 2 6.5V3.5C2 3.21667 2.09583 2.97917 2.2875 2.7875C2.47917 2.59583 2.71667 2.5 3 2.5H6C6.28333 2.5 6.52083 2.59583 6.7125 2.7875C6.90417 2.97917 7 3.21667 7 3.5C7 3.78333 6.90417 4.02083 6.7125 4.2125C6.52083 4.40417 6.28333 4.5 6 4.5H4V6.5C4 6.78333 3.90417 7.02083 3.7125 7.2125C3.52083 7.40417 3.28333 7.5 3 7.5ZM3 22.5C2.71667 22.5 2.47917 22.4042 2.2875 22.2125C2.09583 22.0208 2 21.7833 2 21.5V18.5C2 18.2167 2.09583 17.9792 2.2875 17.7875C2.47917 17.5958 2.71667 17.5 3 17.5C3.28333 17.5 3.52083 17.5958 3.7125 17.7875C3.90417 17.9792 4 18.2167 4 18.5V20.5H6C6.28333 20.5 6.52083 20.5958 6.7125 20.7875C6.90417 20.9792 7 21.2167 7 21.5C7 21.7833 6.90417 22.0208 6.7125 22.2125C6.52083 22.4042 6.28333 22.5 6 22.5H3ZM18 22.5C17.7167 22.5 17.4792 22.4042 17.2875 22.2125C17.0958 22.0208 17 21.7833 17 21.5C17 21.2167 17.0958 20.9792 17.2875 20.7875C17.4792 20.5958 17.7167 20.5 18 20.5H20V18.5C20 18.2167 20.0958 17.9792 20.2875 17.7875C20.4792 17.5958 20.7167 17.5 21 17.5C21.2833 17.5 21.5208 17.5958 21.7125 17.7875C21.9042 17.9792 22 18.2167 22 18.5V21.5C22 21.7833 21.9042 22.0208 21.7125 22.2125C21.5208 22.4042 21.2833 22.5 21 22.5H18ZM21 7.5C20.7167 7.5 20.4792 7.40417 20.2875 7.2125C20.0958 7.02083 20 6.78333 20 6.5V4.5H18C17.7167 4.5 17.4792 4.40417 17.2875 4.2125C17.0958 4.02083 17 3.78333 17 3.5C17 3.21667 17.0958 2.97917 17.2875 2.7875C17.4792 2.59583 17.7167 2.5 18 2.5H21C21.2833 2.5 21.5208 2.59583 21.7125 2.7875C21.9042 2.97917 22 3.21667 22 3.5V6.5C22 6.78333 21.9042 7.02083 21.7125 7.2125C21.5208 7.40417 21.2833 7.5 21 7.5ZM17.5 19.5V18H19V19.5H17.5ZM17.5 16.5V15H19V16.5H17.5ZM16 18V16.5H17.5V18H16ZM14.5 19.5V18H16V19.5H14.5ZM13 18V16.5H14.5V18H13ZM16 15V13.5H17.5V15H16ZM14.5 16.5V15H16V16.5H14.5ZM13 15V13.5H14.5V15H13ZM14 11.5C13.7167 11.5 13.4792 11.4042 13.2875 11.2125C13.0958 11.0208 13 10.7833 13 10.5V6.5C13 6.21667 13.0958 5.97917 13.2875 5.7875C13.4792 5.59583 13.7167 5.5 14 5.5H18C18.2833 5.5 18.5208 5.59583 18.7125 5.7875C18.9042 5.97917 19 6.21667 19 6.5V10.5C19 10.7833 18.9042 11.0208 18.7125 11.2125C18.5208 11.4042 18.2833 11.5 18 11.5H14ZM6 19.5C5.71667 19.5 5.47917 19.4042 5.2875 19.2125C5.09583 19.0208 5 18.7833 5 18.5V14.5C5 14.2167 5.09583 13.9792 5.2875 13.7875C5.47917 13.5958 5.71667 13.5 6 13.5H10C10.2833 13.5 10.5208 13.5958 10.7125 13.7875C10.9042 13.9792 11 14.2167 11 14.5V18.5C11 18.7833 10.9042 19.0208 10.7125 19.2125C10.5208 19.4042 10.2833 19.5 10 19.5H6ZM6 11.5C5.71667 11.5 5.47917 11.4042 5.2875 11.2125C5.09583 11.0208 5 10.7833 5 10.5V6.5C5 6.21667 5.09583 5.97917 5.2875 5.7875C5.47917 5.59583 5.71667 5.5 6 5.5H10C10.2833 5.5 10.5208 5.59583 10.7125 5.7875C10.9042 5.97917 11 6.21667 11 6.5V10.5C11 10.7833 10.9042 11.0208 10.7125 11.2125C10.5208 11.4042 10.2833 11.5 10 11.5H6ZM6.5 18H9.5V15H6.5V18ZM6.5 10H9.5V7H6.5V10ZM14.5 10H17.5V7H14.5V10Z" fill={fill} />
      </G>
  </Svg>
);

export const UserIcon = ({ width = 25, height = 25, fill = "#1C1B1F" }) => (
  <Svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 25 25" fill="none">
      <Mask id="mask0_125_492" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="25" height="25">
          <Rect x="0.5" y="0.5" width="24" height="24" fill="#D9D9D9" />
      </Mask>
      <G mask="url(#mask0_125_492)">
          <Path d="M12.5 12.5C11.4 12.5 10.4583 12.1083 9.675 11.325C8.89167 10.5417 8.5 9.6 8.5 8.5C8.5 7.4 8.89167 6.45833 9.675 5.675C10.4583 4.89167 11.4 4.5 12.5 4.5C13.6 4.5 14.5417 4.89167 15.325 5.675C16.1083 6.45833 16.5 7.4 16.5 8.5C16.5 9.6 16.1083 10.5417 15.325 11.325C14.5417 12.1083 13.6 12.5 12.5 12.5ZM4.5 18.5V17.7C4.5 17.1333 4.64583 16.6125 4.9375 16.1375C5.22917 15.6625 5.61667 15.3 6.1 15.05C7.13333 14.5333 8.18333 14.1458 9.25 13.8875C10.3167 13.6292 11.4 13.5 12.5 13.5C13.6 13.5 14.6833 13.6292 15.75 13.8875C16.8167 14.1458 17.8667 14.5333 18.9 15.05C19.3833 15.3 19.7708 15.6625 20.0625 16.1375C20.3542 16.6125 20.5 17.1333 20.5 17.7V18.5C20.5 19.05 20.3042 19.5208 19.9125 19.9125C19.5208 20.3042 19.05 20.5 18.5 20.5H6.5C5.95 20.5 5.47917 20.3042 5.0875 19.9125C4.69583 19.5208 4.5 19.05 4.5 18.5ZM6.5 18.5H18.5V17.7C18.5 17.5167 18.4542 17.35 18.3625 17.2C18.2708 17.05 18.15 16.9333 18 16.85C17.1 16.4 16.1917 16.0625 15.275 15.8375C14.3583 15.6125 13.4333 15.5 12.5 15.5C11.5667 15.5 10.6417 15.6125 9.725 15.8375C8.80833 16.0625 7.9 16.4 7 16.85C6.85 16.9333 6.72917 17.05 6.6375 17.2C6.54583 17.35 6.5 17.5167 6.5 17.7V18.5ZM12.5 10.5C13.05 10.5 13.5208 10.3042 13.9125 9.9125C14.3042 9.52083 14.5 9.05 14.5 8.5C14.5 7.95 14.3042 7.47917 13.9125 7.0875C13.5208 6.69583 13.05 6.5 12.5 6.5C11.95 6.5 11.4792 6.69583 11.0875 7.0875C10.6958 7.47917 10.5 7.95 10.5 8.5C10.5 9.05 10.6958 9.52083 11.0875 9.9125C11.4792 10.3042 11.95 10.5 12.5 10.5Z" fill={fill} />
      </G>
  </Svg>
)

export const DropDownIcon = (props) => (
  <Svg xmlns="http://www.w3.org/2000/svg" width={24} height={25} viewBox="0 0 24 25" {...props}>
      <Path d="M2 8.525L3.775 6.75L12 14.975L20.225 6.75L22 8.525L12 18.525L2 8.525Z" fill="#1286ED" />
  </Svg>
);

export const MenuIcon = ({ width = 24, height = 25, color = "#1286ED" }) => (
  <Svg 
    width={width} 
    height={height} 
    viewBox="0 0 24 25" 
    fill="none"
  >
    <Path 
      d="M3 18.5V16.5H21V18.5H3ZM3 13.5V11.5H21V13.5H3ZM3 8.5V6.5H21V8.5H3Z" 
      fill={color} 
    />
  </Svg>
);

export const CardIcon = ({ width = 28, height = 29, color = "#1286ED" }) => (
  <Svg 
    width={width} 
    height={height} 
    viewBox="0 0 28 29" 
    fill="none"
  >
    <Path 
      d="M25.6667 7.49984V21.4998C25.6667 22.1415 25.4382 22.6908 24.9813 23.1478C24.5243 23.6047 23.975 23.8332 23.3333 23.8332H4.66668C4.02501 23.8332 3.4757 23.6047 3.01876 23.1478C2.56182 22.6908 2.33334 22.1415 2.33334 21.4998V7.49984C2.33334 6.85817 2.56182 6.30886 3.01876 5.85192C3.4757 5.39498 4.02501 5.1665 4.66668 5.1665H23.3333C23.975 5.1665 24.5243 5.39498 24.9813 5.85192C25.4382 6.30886 25.6667 6.85817 25.6667 7.49984ZM4.66668 9.83317H23.3333V7.49984H4.66668V9.83317ZM4.66668 14.4998V21.4998H23.3333V14.4998H4.66668Z" 
      fill={color} 
    />
  </Svg>
);

export const FilterIcon = ({ color = 'white', size = 24 }) => (
  <Svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 16 17" fill="none">
    <Path
      d="M1 1.5H11.3158L7.63158 6.85293V14.6764L4.68421 11.3823V6.85293L1 1.5Z"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M10.579 13.0293H15"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M12.7895 10.5586V15.4998"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const CalendarIcon = ({ color = '#B4B4B4', size = 24 }) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size * (17 / 16)}  // Adjusting height for aspect ratio
    viewBox="0 0 16 17"
    fill="none"
  >
    <G clipPath="url(#clip0)">
      <Path
        d="M15 1.99844L10.9965 1.99845V1.00195C10.9965 0.725703 10.7727 0.501953 10.4965 0.501953C10.2203 0.501953 9.9965 0.725703 9.9965 1.00195V1.9982H5.9965V1.00195C5.9965 0.725703 5.77275 0.501953 5.4965 0.501953C5.22025 0.501953 4.9965 0.725703 4.9965 1.00195V1.9982H1C0.44775 1.9982 0 2.44595 0 2.9982V15.4982C0 16.0504 0.44775 16.4982 1 16.4982H15C15.5522 16.4982 16 16.0504 16 15.4982V2.9982C16 2.44619 15.5522 1.99844 15 1.99844ZM15 15.4982H1V2.9982H4.9965V3.50195C4.9965 3.77819 5.22025 4.00195 5.4965 4.00195C5.77275 4.00195 5.9965 3.77819 5.9965 3.50195V2.99845H9.9965V3.5022C9.9965 3.77845 10.2203 4.0022 10.4965 4.0022C10.7727 4.0022 10.9965 3.77845 10.9965 3.5022V2.99845H15V15.4982ZM11.5 8.49844H12.5C12.776 8.49844 13 8.27444 13 7.99844V6.99844C13 6.72244 12.776 6.49844 12.5 6.49844H11.5C11.224 6.49844 11 6.72244 11 6.99844V7.99844C11 8.27444 11.224 8.49844 11.5 8.49844ZM11.5 12.4982H12.5C12.776 12.4982 13 12.2744 13 11.9982V10.9982C13 10.7222 12.776 10.4982 12.5 10.4982H11.5C11.224 10.4982 11 10.7222 11 10.9982V11.9982C11 12.2747 11.224 12.4982 11.5 12.4982ZM8.5 10.4982H7.5C7.224 10.4982 7 10.7222 7 10.9982V11.9982C7 12.2744 7.224 12.4982 7.5 12.4982H8.5C8.776 12.4982 9 12.2744 9 11.9982V10.9982C9 10.7224 8.776 10.4982 8.5 10.4982ZM8.5 6.49844H7.5C7.224 6.49844 7 6.72244 7 6.99844V7.99844C7 8.27444 7.224 8.49844 7.5 8.49844H8.5C8.776 8.49844 9 8.27444 9 7.99844V6.99844C9 6.72219 8.776 6.49844 8.5 6.49844ZM4.5 6.49844H3.5C3.224 6.49844 3 6.72244 3 6.99844V7.99844C3 8.27444 3.224 8.49844 3.5 8.49844H4.5C4.776 8.49844 5 8.27444 5 7.99844V6.99844C5 6.72219 4.776 6.49844 4.5 6.49844ZM4.5 10.4982H3.5C3.224 10.4982 3 10.7222 3 10.9982V11.9982C3 12.2744 3.224 12.4982 3.5 12.4982H4.5C4.776 12.4982 5 12.2744 5 11.9982V10.9982C5 10.7224 4.776 10.4982 4.5 10.4982Z"
        fill={color}
      />
    </G>
    <Defs>
      <ClipPath id="clip0">
        <Rect width="16" height="16" fill="white" transform="translate(0 0.5)" />
      </ClipPath>
    </Defs>
  </Svg>
);