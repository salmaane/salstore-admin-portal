// color design tokens
export const tokens = (mode = 'light') => ({
    ...(mode === "light"
    ? {
        darkWhite: {
          100: "#fdfdfe",
          200: "#fbfcfd",
          300: "#fafafd",
          400: "#f8f9fc",
          500: "#f6f7fb",
          600: "#c5c6c9",
          700: "#949497",
          800: "#626364",
          900: "#313132"
        },
        purple: {
          100: "#f3e7fd",
          200: "#e7cffb",
          300: "#dbb8fa",
          400: "#cfa0f8",
          500: "#c388f6",
          600: "#9c6dc5",
          700: "#755294",
          800: "#4e3662",
          900: "#271b31"
        },
        red: {
          100: "#fddcdf",
          200: "#fbb8bf",
          300: "#fa95a0",
          400: "#f87180",
          500: "#f64e60",
          600: "#c53e4d",
          700: "#942f3a",
          800: "#621f26",
          900: "#311013"
        },
        primary: {
          100: "#cef1e6",
          200: "#9de2cd",
          300: "#6dd4b5",
          400: "#3cc59c",
          500: "#0bb783",
          600: "#099269",
          700: "#076e4f",
          800: "#044934",
          900: "#02251a"
        },
        yellow: {
          100: "#fff1d3",
          200: "#ffe3a7",
          300: "#ffd47a",
          400: "#ffc64e",
          500: "#ffb822",
          600: "#cc931b",
          700: "#996e14",
          800: "#664a0e",
          900: "#332507"
        },
        indigo: {
          100: "#e2e6fd",
          200: "#c5cdfb",
          300: "#a7b3f9",
          400: "#8a9af7",
          500: "#6d81f5",
          600: "#5767c4",
          700: "#414d93",
          800: "#2c3462",
          900: "#161a31"
        },
        pink: {
          100: "#fdddea",
          200: "#fbbad5",
          300: "#fa98c0",
          400: "#f875ab",
          500: "#f65396",
          600: "#c54278",
          700: "#94325a",
          800: "#62213c",
          900: "#31111e"
        },
        lightBlue: {
          100: "#d2f8ff",
          200: "#a6f2ff",
          300: "#79ebff",
          400: "#4de5ff",
          500: "#20deff",
          600: "#1ab2cc",
          700: "#138599",
          800: "#0d5966",
          900: "#062c33"
        },
        boxShadow: '0 10px 15px -8px rgba(0,0,0,0.1)',
    } 
    : {  

    }
    )
})


// mui theme settings
export const themeSettings = (mode) => {
    const colors = tokens(mode);

    return {
        palette: {
            mode: mode,
            ...(mode === "light" ? {
                primary: {
                    main: colors.primary[500]
                },
                secondary: {
                    main: colors.purple[500]
                },
                background: {
                    default: colors.darkWhite[500]
                },
            } : { 
            
            })
        },
        typography: {
            fontFamily: ["Quicksand", "sans-serif"].join(','),
            fontSize: 12,
            h1: {
                fontFamily: ["Quicksand", "sans-serif"].join(','),
                fontSize: 40,
            },
            h2: {
                fontFamily: ["Quicksand", "sans-serif"].join(','),
                fontSize: 32,
            },
            h3: {
                fontFamily: ["Quicksand", "sans-serif"].join(','),
                fontSize: 24,
            },
            h4: {
                fontFamily: ["Quicksand", "sans-serif"].join(','),
                fontSize: 20,
            },
            h5: {
                fontFamily: ["Quicksand", "sans-serif"].join(','),
                fontSize: 16,
            },
            h6: {
                fontFamily: ["Quicksand", "sans-serif"].join(','),
                fontSize: 14,
            }
        },
        components: {
          MuiButton: {
            styleOverrides: {
              root: ({ownerState}) => ({
                ...(ownerState.variant === 'contained' && {
                  '&:hover': {
                    backgroundColor: tokens().primary[500]
                  },
                  color: '#fff',
                }),
                fontWeight: 'bold',
              })
            },
          },
        }
    }
};