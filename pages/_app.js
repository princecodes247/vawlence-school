import '../styles/globals.css'
import { AnimatePresence } from 'framer-motion'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Head from 'next/head';
function MyApp({ Component, pageProps }) {
  // 2. Use at the root of your app
  return (
    
    <div className="min-h-screen relative">
      <Head>
        <title>Vawulence University International</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.webp" />
      </Head>
       <Header />
            <AnimatePresence
                exitBeforeEnter
                initial={true}
                onExitComplete={() => {
                    window.scrollTo(0, 0)
                    console.log("done")
                } }
            >
                <Component {...pageProps} />
            
            </AnimatePresence>
            <Footer />
      </div>
    
  );
}


export default MyApp
//  {...pageProps} canonical={url} key={url}