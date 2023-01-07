const plugin = require("tailwindcss/plugin");
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontSize: {
        s1: [`${12 / 16}rem`, `${16 / 16}rem`], // 12px 16px
        s2: [`${14 / 16}rem`, `${19.1 / 16}rem`], // 14px 19.1px
        s3: [`${16 / 16}rem`, `${20 / 16}rem`], // 16px 20px
        s4: [`${18 / 16}rem`, `${24 / 16}rem`], // 18px 24px
        s5: [`${20 / 16}rem`, `${28 / 16}rem`], // 20px 28px
        s6: [`${24 / 16}rem`, `${32 / 16}rem`], // 24px 32px
        s7: [`${28 / 16}rem`, `${40 / 16}rem`], // 28px 40px
        s8: [`${32 / 16}rem`, `${48 / 16}rem`], // 32px 48px
        s9: [`${40 / 16}rem`, `${54 / 16}rem`], // 40px 54px
      },

      borderWidth: [...new Array(9)].map((el, index) => `${index}px`),
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    plugin(function ({ addUtilities, theme }) {
      const justifyContent = {
        start: "flex-start",
        center: "center",
        end: "flex-end",
        around: "space-around",
        between: "space-between",
        evenly: "space-evenly",
        stretch: "stretch",
      };
      const alignItems = {
        start: "flex-start",
        center: "center",
        end: "flex-end",
        stretch: "stretch",
        baseline: "baseline",
      };

      const inlineLayoutsUtilities = {};
      const stackLayoutsUtilities = {};

      for (const justify in justifyContent) {
        for (const items in alignItems) {
          inlineLayoutsUtilities[`.l-inline-${justify}`] = {
            display: "flex",
            flexWrap: "wrap",
            flexDirection: "row",
            justifyContent: justifyContent[justify],
          };
          inlineLayoutsUtilities[`.l-inline-${justify}-nowrap`] = {
            display: "flex",
            flexWrap: "nowrap",
            flexDirection: "row",
            justifyContent: justifyContent[justify],
          };
          inlineLayoutsUtilities[`.l-inline-${justify}-${items}`] = {
            display: "flex",
            flexWrap: "wrap",
            flexDirection: "row",
            justifyContent: justifyContent[justify],
            alignItems: alignItems[items],
          };
          inlineLayoutsUtilities[`.l-inline-${justify}-${items}-nowrap`] = {
            display: "flex",
            flexWrap: "nowrap",
            flexDirection: "row",
            justifyContent: justifyContent[justify],
            alignItems: alignItems[items],
          };
          stackLayoutsUtilities[`.l-stack-${justify}`] = {
            display: "flex",
            flexWrap: "wrap",
            flexDirection: "column",
            justifyContent: justifyContent[justify],
          };
          stackLayoutsUtilities[`.l-stack-${justify}-nowrap`] = {
            display: "flex",
            flexWrap: "nowrap",
            flexDirection: "column",
            justifyContent: justifyContent[justify],
          };
          stackLayoutsUtilities[`.l-stack-${justify}-${items}`] = {
            display: "flex",
            flexWrap: "wrap",
            flexDirection: "column",
            justifyContent: justifyContent[justify],
            alignItems: alignItems[items],
          };
          stackLayoutsUtilities[`.l-stack-${justify}-${items}-nowrap`] = {
            display: "flex",
            flexWrap: "nowrap",
            flexDirection: "column",
            justifyContent: justifyContent[justify],
            alignItems: alignItems[items],
          };
        }
      }
      const layoutUtilities = {
        ".l-center": {
          display: "grid",
          placeContent: "center",
        },

        ".l-inline": {
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "flex-start",
        },

        ".l-stack": {
          display: "flex",
          flexDirection: "column",
          flexWrap: "wrap",
          justifyContent: "flex-start",
        },
      };
      addUtilities(layoutUtilities, ["responsive"]);
      addUtilities(inlineLayoutsUtilities, ["responsive"]);
      addUtilities(stackLayoutsUtilities, ["responsive"]);
    }),
  ],
};
