import Navbar from "../components/Navbar";
import Hero from "../components/Hero"
import Footer from "../components/Footer";
import '../App.css'
import { connect } from "react-redux";

function HomePage(props) {
  const { isLoggedIn } = props;
  console.log(isLoggedIn);
  return (
    <>
      <Hero/>
		</>
  );
}

const mapStateToProps = (state) => {
  console.log(state)
	const isLoggedIn = state.loginReducer;
	return {
		isLoggedIn,
	};
};


export default connect(mapStateToProps, null)(HomePage);