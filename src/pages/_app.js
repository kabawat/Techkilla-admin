import 'bootstrap/dist/css/bootstrap.min.css';
import Aside from '@/components/aside'
import '@/styles/globals.css'
export default function App({ Component, pageProps }) {
  return (<>
    <div className='main_container'>
      <div className="main_container_inner">
        <div className="aside">
          <Aside />
        </div>
        <div className="main">
          <Component {...pageProps} />
        </div>
      </div>
    </div>
  </>)
}
