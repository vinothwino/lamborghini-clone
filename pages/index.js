import Layout from 'layout'
import HeroSection from 'components/Sections/Hero'
import ModelSection from 'components/Sections/Model'
import ModelChoose from 'components/Sections/ModelChoose'
import Banner from 'components/Sections/Banner'
import NewsList from 'components/Sections/NewsList'
import Footer from 'components/Footer'

export default function Home() {
  return (
    <Layout>
      <HeroSection />
      <ModelSection />
      <ModelChoose />
      <Banner />
      <NewsList />
      <Footer />
    </Layout>
  )
}
