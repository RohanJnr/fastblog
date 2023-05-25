import './globals.css';
import Navbar from "./Navbar";

import { AuthContextProvider } from './AuthContext';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <AuthContextProvider>
          <Navbar />
          <div className='w-4/5 mx-auto'>

          {children}
          </div>
        </AuthContextProvider>
      </body>
    </html>
  )
}
