import Navbar from "./components/Navbar";
import Hero from "./components/Hero"
import Footer from "./components/Footer";
import '../App.css'

function HomePage() {
  return (
		<>
			<Navbar />
      <Hero />
      <Footer/>
		</>
  );
}

export default HomePage;
