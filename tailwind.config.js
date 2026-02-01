/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Custom design system colors
        accent: {
          DEFAULT: '#3B82F6',
          hover: '#2563EB',
          light: '#DBEAFE',
        },
        surface: {
          DEFAULT: '#FAFAFA',
          white: '#FFFFFF',
          subtle: '#F3F4F6',
        },
        border: {
          DEFAULT: '#E5E7EB',
          light: '#F3F4F6',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'slide-up': 'slideUp 0.6s ease-out forwards',
        'slide-left': 'slideLeft 0.6s ease-out forwards',
        'slide-right': 'slideRight 0.6s ease-out forwards',
        'scale-in': 'scaleIn 0.5s ease-out forwards',
        'bounce-subtle': 'bounceSoft 2s infinite',
      },
      keyframes: {
        fadeIn: {
          'from': {
            opacity: '0',
          },
          'to': {
            opacity: '1',
          }
        },
        slideUp: {
          'from': {
            opacity: '0',
            transform: 'translateY(30px)'
          },
          'to': {
            opacity: '1',
            transform: 'translateY(0)'
          }
        },
        slideLeft: {
          'from': {
            opacity: '0',
            transform: 'translateX(30px)'
          },
          'to': {
            opacity: '1',
            transform: 'translateX(0)'
          }
        },
        slideRight: {
          'from': {
            opacity: '0',
            transform: 'translateX(-30px)'
          },
          'to': {
            opacity: '1',
            transform: 'translateX(0)'
          }
        },
        scaleIn: {
          'from': {
            opacity: '0',
            transform: 'scale(0.95)'
          },
          'to': {
            opacity: '1',
            transform: 'scale(1)'
          }
        },
        bounceSoft: {
          '0%, 100%': {
            transform: 'translateY(0)',
          },
          '50%': {
            transform: 'translateY(-10px)',
          }
        }
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },
    },
  },
  plugins: [],
}
