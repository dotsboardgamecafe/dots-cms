import type { Config } from "tailwindcss";

const config = {
  darkMode: [ "class" ],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "165px",
    },
    fontFamily: {
      'sans': [ 'Futura PT', 'sans-serif' ],
    },
    extend: {
      boxShadow: {
        'general-s': '0px 2px 12px 0px rgba(20, 20, 43, 0.08)'
      },
      backgroundImage: {
        'button-midnight-black': 'linear-gradient(90deg, rgba(35, 37, 38, 1),rgba(67, 67, 67, 1))',
      },
      colors: {
        // custom colors specific to dots
        'brand-yellow': '#F8EA0EFF',
        'brand-red': '#FB1515FF',
        'brand-blue-electric': '#2F3190FF',
        'brand-neon-color': 'linear-gradient(90deg, 0.1706144423224032% rgba(62, 68, 134, 1), 52.127617597579956% rgba(236, 226, 112, 1), 99.37495589256287% rgba(183, 63, 64, 1))',

        'button-hover': '#434343FF',
        'neutral-ink': '#232526FF',
        'neutral-smoke-white': '#FAFAFAFF',
        'accent-soft-blue': '#EEEEF9FF',
        // end custom colors
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          '600': '#7F56D9',
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        error: {
          '700': 'rgba(180, 35, 24, 1)',
          '50': 'rgba(254, 243, 242, 1)'
        },
        blue: {
          '700': 'rgba(23, 92, 211, 1)',
          '50': 'rgba(239, 248, 255, 1)'
        },
        gray: {
          '500': '#667085',
          '100': '#F2F4F7',
          '200': '#EAECF0',
          '300': '#D0D5DD'
        }
      },

      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },

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
  plugins: [ require( "tailwindcss-animate" ) ],
} satisfies Config;

export default config;