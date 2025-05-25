import { Inter, JetBrains_Mono } from 'next/font/google';
import { colors } from './constants/styles';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jetbrains-mono',
});

const styles = {
  main: {
    fontFamily: 'var(--font-inter)',
    background: colors.bgPrimary,
    color: colors.textPrimary,
    lineHeight: 1.6,
  },
};

export const metadata = {
  title: 'Ruby構文・メソッド完全リファレンス',
  description: 'Rubyの全ての構文とメソッドを、わかりやすい例とともに解説。初心者から上級者まで、必要な情報がすぐに見つかります。',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Ruby リファレンス',
  },
  formatDetection: {
    telephone: false,
  },
  other: {
    'mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#dc2626',
};

export default function RootLayout({ children }) {
  return (
    <html lang="ja" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body style={styles.main}>{children}</body>
    </html>
  );
}
