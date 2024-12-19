const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      spacing: {
        '24.5': '120px',
        '13': '52px',
        '180': '180px',
        '75': '58px',
      },
      colors: {
        lightsilver: '#e8e8e8',
        compgray: '#a5a5a5',
        txt_color: '#14213D',
        blue_txt_color: '#040316',
        compblue: '#2f27ce',
        outline: '#404040',
        bkgd: '#FBFBFE',
        dashboard_base: '#E1E1FF',
        dashboard_shadow: '#A9A5EB',
        darker_purple: '#17118A',
        lighter_purple: '#1E18A1',
        another_purple: '#DDDBFF',
        red: "#CE272A",
        light_darker_gray: "#D6D6D8",
        lighter_gray: "#E6E6EC",

        ...defaultTheme.colors,
      },
    },
  },
  plugins: [],
};
