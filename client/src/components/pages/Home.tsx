import Applicability from '../component/Applicability'
import BRSRFormat from '../component/BRSRFormat'
import Footer from '../component/Footer'
import Hero from '../component/Hero'
import KeyPrinciples from '../component/KeyPrinciples'
import Navbar from '../component/Navbar'
import Overview from '../component/Overview'
import ReportPrep from '../component/ReportPrep'

const Home = () => {
  return (
    <div> 
      <Navbar/>
        <Hero/>
        <Overview/>
        <BRSRFormat/>
        <KeyPrinciples/>
        <Applicability/>
        <ReportPrep/>
        <Footer/>
    </div>
  )
}

export default Home