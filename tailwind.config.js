const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        customBlue: '#025260', 
        customBlueLight: '#036b7a',
        logoGold: '#CEA348'
      },
    },
  },
  plugins: [],
});