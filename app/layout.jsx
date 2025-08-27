import AuthProvider from '@/components/SessionProvider';
import LayoutWrapper from '@/components/LayoutWrapper';
import "./globals.css";

export const metadata = {
  title: 'ProductApp',
  description: 'Browse and manage products',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <LayoutWrapper>
            {children}
          </LayoutWrapper>
        </AuthProvider>
      </body>
    </html>
  );
}
