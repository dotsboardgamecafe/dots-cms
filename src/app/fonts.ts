import { Lexend as LexendFonts, Open_Sans } from 'next/font/google';

export const OpenSans = Open_Sans( {
  subsets: [ 'latin' ],
  variable: '--font-open-sans',
  display: 'swap',
} );

export const Lexend = LexendFonts( {
  subsets: [ 'latin' ],
  variable: '--font-lexend',
  display: 'swap',
} );
