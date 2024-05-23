/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {},
    screens: {
      '2xl': {'max': '1780'},
      // => @media (max-width: 1535px) { ... }

      'xl': {'max': '1279px'},
      // => @media (max-width: 1279px) { ... }

      'lg': {'max': '1155px'},
      // => @media (max-width: 1023px) { ... }

      'md': {'max': '992px'},
      // => @media (max-width: 767px) { ... }

      'sm': {'max': '567px'},
      // => @media (max-width: 639px) { ... }

    }
  },
  plugins: [
    require('flowbite/plugin')
  ],
}