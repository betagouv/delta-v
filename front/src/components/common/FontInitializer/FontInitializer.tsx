import { Roboto } from 'next/font/google';
import localFont from 'next/font/local';

export const marianne = localFont({
  src: [
    { path: '/fonts/Marianne/Marianne-Bold_Italic.woff', weight: '700', style: 'italic' },
    { path: '/fonts/Marianne/Marianne-Bold.woff', weight: '700', style: 'normal' },
    { path: '/fonts/Marianne/Marianne-ExtraBold_Italic.woff', weight: '800', style: 'italic' },
    { path: '/fonts/Marianne/Marianne-ExtraBold.woff', weight: '800', style: 'normal' },
    { path: '/fonts/Marianne/Marianne-Light_Italic.woff', weight: '300', style: 'italic' },
    { path: '/fonts/Marianne/Marianne-Light.woff', weight: '300', style: 'normal' },
    { path: '/fonts/Marianne/Marianne-Medium_Italic.woff', weight: '500', style: 'italic' },
    { path: '/fonts/Marianne/Marianne-Medium.woff', weight: '500', style: 'normal' },
    { path: '/fonts/Marianne/Marianne-Regular_Italic.woff', weight: '400', style: 'italic' },
    { path: '/fonts/Marianne/Marianne-Regular.woff', weight: '400', style: 'normal' },
    { path: '/fonts/Marianne/Marianne-Thin_Italic.woff', weight: '100', style: 'italic' },
    { path: '/fonts/Marianne/Marianne-Thin.woff', weight: '100', style: 'normal' },
  ],
  variable: '--font-marianne',
});

export const roboto = Roboto({
  weight: ['100', '300', '400', '500', '700', '900'],
  style: ['normal', 'italic'],
  variable: '--font-roboto',
  subsets: ['latin'],
});

export const FontInitializer = () => {
  return (
    <style jsx global>{`
      h1,
      h2,
      h3,
      h4 {
        font-family: ${marianne.style.fontFamily};
      }
      p {
        font-family: ${roboto.style.fontFamily};
      }
    `}</style>
  );
};
