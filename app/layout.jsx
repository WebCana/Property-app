import '@/assets/styles/globals.css';

export const metadata = {
    title: 'PropertyManagment | Find The perfect Rental',
    description: 'Find your dream property',
    keywords: 'rental, find lands, find houses'
}

// children will show all pages inside this layout, html tag
const MainLayout = ({children}) => {
  return (
    <html lang='en'>
        <body>
            <div> {children}</div>
        </body>
    </html>
  )
}

export default MainLayout