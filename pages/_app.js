import '../styles/globals.css'
import { AnimatePresence } from 'framer-motion'

function MyApp({ Component }) {
  // 2. Use at the root of your app
  return (
    
      <>
       {/* <Header /> */}
            <AnimatePresence
                exitBeforeEnter
                initial={false}
                onExitComplete={() => window.scrollTo(0, 0)}
            >
                <Component />
            </AnimatePresence>
            {/* <Footer /> */}
      </>
    
  );
}


export default MyApp
//  {...pageProps} canonical={url} key={url}