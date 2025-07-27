// app/layout.tsx
import './globals.css';
import DynamicLayout from './dynamic-layout';
import "@fontsource/inter"; // Defaults to weight 400 (normal)
import PersistentAudio from './persistentaudio';


export const metadata = {
  title: 'Sweet Treatinator',
  description: 'AI-powered sweet treat recipe generator',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <DynamicLayout>{children}</DynamicLayout>
        <PersistentAudio />
      </body>
    </html>
  );
}
