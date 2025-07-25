// app/layout.tsx
import './globals.css';

export const metadata = {
  title: 'Sweet Treatinator',
  description: 'AI-powered sweet treat recipe generator',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-pink-50 text-gray-800 font-sans">
        <main className="max-w-4xl mx-auto p-6">{children}</main>
      </body>
    </html>
  );
}
