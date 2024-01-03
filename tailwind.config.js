const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        customBlue: '#025260', 
        customBlueLight: '#036b7a',
        customCreamyButter: 'rgba(239, 243, 229, 1)',
        customCreamyButterLight: '#f5f7ef',
      },
    },
  },
  plugins: [],
});