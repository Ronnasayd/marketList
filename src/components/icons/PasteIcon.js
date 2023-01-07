import * as React from "react";
import Svg, { Path } from "react-native-svg";
import colors from "tailwindcss/colors";

function PasteIcon(props) {
  return (
    <Svg
      fill={colors.violet[400]}
      width="20px"
      height="20px"
      viewBox="0 0 32 32"
      id="icon"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path d="M26 20h-8.17l2.58-2.59L19 16l-5 5 5 5 1.41-1.41L17.83 22H26v8h2v-8a2 2 0 00-2-2z" />
      <Path d="M23.71 9.29l-7-7A1 1 0 0016 2H6a2 2 0 00-2 2v24a2 2 0 002 2h8v-2H6V4h8v6a2 2 0 002 2h6v2h2v-4a1 1 0 00-.29-.71zM16 4.41L21.59 10H16z" />
      <Path
        id="_Transparent_Rectangle_"
        data-name="&lt;Transparent Rectangle&gt;"
        d="M0 0H32V32H0z"
        fill="none"
      />
    </Svg>
  );
}

export default PasteIcon;
