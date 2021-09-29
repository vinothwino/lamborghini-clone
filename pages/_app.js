import 'assets/scss/main.scss'
import 'assets/icomoon/style.css'

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp


MyApp.getInitialProps = async ({ store, res }) => {
  if (res) {
    // res available only at server
    // no-store disable bfCache for any browser. So your HTML will not be cached
    res.setHeader('Cache-Control', 'no-store');
  }
  return {};
};