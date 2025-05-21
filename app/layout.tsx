import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';
import { AppLayout } from '@/components/app-layout';
import { ClerkProviderWrapper } from '@/components/providers/clerk-provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'LeaseSync - Modern Lease Accounting',
  description: 'Simplify your lease accounting with our modern SaaS solution',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(inter.className, 'antialiased')}>
        <ClerkProviderWrapper>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <AppLayout>{children}</AppLayout>
            <Toaster />
          </ThemeProvider>
        </ClerkProviderWrapper>
      </body>
    </html>
  );
}