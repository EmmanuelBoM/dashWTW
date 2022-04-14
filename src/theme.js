import { extendTheme, theme as base } from '@chakra-ui/react';

const theme = extendTheme({
	fonts: {
		heading: `Lato, ${base.fonts.heading}`,
		body: `Lato, ${base.fonts.body}`,
	},
	body: 'black',
	colors: {
        blue: {
			main: '#2F6FE4',
			100: '#E8EFFC',
			200: '#C0D3F7',
			300: '#93B4F1',
			400: '#5C8EEA',
			500: '#2F6FE4',
			600: '#1953BE',
			700: '#144399',
			800: '#0E2F6C',
			900: '#071836',
        },
        black: {
			main: '#000000',
			100: '#FFFFFF',
			200: '#E6E6E6',
			300: '#CCCCCC',
			400: '#999999',
			500: '#808080',
			600: '#666666',
			700: '#4D4D4D',
			800: '#333333',
			900: '#000000',
        },
        orange: {
			main: '#FF7562',
			100: '#FFE4E0',
			200: '#FFC5BD',
			300: '#FF9385',
			400: '#FF7562',
			500: '#FF553D',
			600: '#F51E00',
			700: '#B81600',
			800: '#851000',
			900: '#470900',
        },
        grayishblue: {
        	main: '#3E5A8C' 
        },
        lightgray: {
        	main: '#DFE0EB',
        }
	},
	components: {
		Button: {
			baseStyle: {
			  	fontWeight: 'regular',
			},
			
			variants: {
				'with-shadow': {
					fontFamily: 'Roboto, sans-serif',
					fontSize: '1em',
					bg: 'black.main',
					boxShadow: '0 0 1px 1px #efdfde',
				},
				'login-button': {
					bg: 'black.400',
					color: 'black'
				},
				'login-button-clicked': {
					bg: 'blue.500',
					color: 'white'
				}
			},	
		}
	}
});

export default theme;