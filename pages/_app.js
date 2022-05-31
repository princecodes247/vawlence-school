import '../styles/globals.css'
import { AnimatePresence } from 'framer-motion'

function MyApp({ Component, pageProps }) {
  // 2. Use at the root of your app
  return (
    
      <>
       {/* <Header /> */}
            <AnimatePresence
                exitBeforeEnter
                initial={false}
                onExitComplete={() => window.scrollTo(0, 0)}
            >
                <Component {...pageProps} />
            </AnimatePresence>
            {/* <Footer /> */}
      </>
    
  );
}


export default MyApp
//  {...pageProps} canonical={url} key={url}