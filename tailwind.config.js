/** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: [
//     "./app/**/*.{js,ts,jsx,tsx}",
//     "./pages/**/*.{js,ts,jsx,tsx}",
//     "./components/**/*.{js,ts,jsx,tsx}",
//   ],
//   theme: {
//     extend: {
//       fontFamily: {
//         soft: ['SoftMarshmallow', 'sans-serif'],
//       },
//       // Add other extensions here
//     },
//   },
//   plugins: [],
// }


module.exports = {
  darkMode: ["class"],
  content: [
    // Combined content paths from both configs
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{html,js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      // Colors from Figma config (converted to raw values)
      colors: {
        border: "#e5e7eb", // Example conversion - replace with your actual values
        input: "#f3f4f6",
        ring: "#9ca3af",
        background: "#ffffff",
        foreground: "#111827",
        primary: {
          DEFAULT: "#691d39", // Using your pink color from earlier
          foreground: "#ffffff",
        },
        secondary: {
          DEFAULT: "#9db6d8", // Using your blue color from earlier
          foreground: "#111827",
        },
        destructive: {
          DEFAULT: "#ef4444",
          foreground: "#ffffff",
        },
        muted: {
          DEFAULT: "#f3f4f6",
          foreground: "#6b7280",
        },
        accent: {
          DEFAULT: "#f59e0b",
          foreground: "#ffffff",
        },
        popover: {
          DEFAULT: "#ffffff",
          foreground: "#111827",
        },
        card: {
          DEFAULT: "#ffffff",
          foreground: "#111827",
        },
      },
      borderRadius: {
        lg: "0.5rem",
        md: "0.375rem",
        sm: "0.25rem",
      },
      // Font families from both configs
      fontFamily: {
        soft: ['SoftMarshmallow', 'sans-serif'], // From your project
        inter: ['Inter', 'sans-serif'],
        sans: [ // From Figma
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
          '"Noto Color Emoji"',
        ],
      },
      // Animations from Figma
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [
    // Add any plugins you need here
    // require('@tailwindcss/forms'),
    // require('@tailwindcss/typography'),
  ],
};