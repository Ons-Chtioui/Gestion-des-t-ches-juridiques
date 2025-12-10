// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      gridTemplateColumns: {
        '2xl': 'repeat(6, minmax(0, 1fr))', // Ajoutez les tailles personnalisées dont vous avez besoin
      },
      gap: {
        '8': '2rem', // Ajoutez les tailles de lacunes personnalisées dont vous avez besoin
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
