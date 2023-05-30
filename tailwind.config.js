/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        // text: "#f3f4f7",
        // background: "#101319",
        // primary: "#897958",
        // secondary: "#0a0c10",
        // accent: "#897958",
        text: "#e9f7fb",
        background: "#06181e",
        primary: "#e99f86",
        secondary: "#092934",
        accent: "#e99f86",
        danger: "#FF0000",
        warning: "#E66C2C",
        success: "#2DA51A",
        info: "#0096FF",
        discord: "#7289DA"
      }
    },
  },
  plugins: [],
}

