import "./App.css";
import Homepage from "./components/homepage.component";
import NavigationBar from "./components/navbar.component";
import Seatbooking from "./components/seatbooking.component";
function App() {
	return (
		<div>
			<NavigationBar />
			<Seatbooking />
		</div>
	);
}

export default App;
