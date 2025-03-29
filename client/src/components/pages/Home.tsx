import Applicability from "@/components/component/Applicability";
import BRSRFormat from "@/components/component/BRSRFormat";
import Footer from "@/components/component/Footer";
import Hero from "@/components/component/Hero";
import KeyPrinciples from "@/components/component/KeyPrinciples";
import Navbar from "@/components/component/Navbar";
import Overview from "@/components/component/Overview";
import ReportPrep from "@/components/component/ReportPrep";

const Home = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <Overview />
      <BRSRFormat />
      <KeyPrinciples />
      <Applicability />
      <ReportPrep />
      <Footer />
    </div>
  );
};

export default Home;
