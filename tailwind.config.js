// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        // replace these with your exact brand hex values if you have them
        "lh-blue": "#0057FF",   // primary blue (change if you want)
        "lh-green": "#00C38A",  // accent green (change if you want)
      }
    }
  },
  plugins: []
};
