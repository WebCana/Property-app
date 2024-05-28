import '@/assets/styles/globals.css';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import AuthProvider from '@/components/AuthProvider';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GlobalProvider } from '@/context/GlobalContext';
import 'photoswipe/dist/photoswipe.css'

export const metadata = {
    title: 'PropertyManagment | Find The perfect Rental',
    description: 'Find your dream property',
    keywords: 'rental, find lands, find houses'
}

// children will show all pages inside this layout, html tag
const MainLayout = ({children}) => {
      return (
        <GlobalProvider>
          <AuthProvider>
              <html lang='en'>
                  <body>
                    <Navbar  />
                        <main> {children}</main>
                    <Footer />
                    <ToastContainer />
                  </body>
              </html>
          </AuthProvider>
        </GlobalProvider>
      )
}

export default MainLayout