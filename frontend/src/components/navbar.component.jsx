import React from "react";
import Navbar from "react-bootstrap/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import {
	faCheckSquare,
	faCoffee,
	faBed,
} from "@fortawesome/fontawesome-free-solid";
class NavigationBar extends React.Component {
	render() {
		return (
			<Navbar bg="dark" variant="dark">
				<Navbar.Brand href="#home">
					<img
						alt=""
						src={faCoffee}
						width="30"
						height="30"
						className="d-inline-block align-top"
					/>{" "}
					Movie Box
				</Navbar.Brand>
			</Navbar>
		);
	}
}

export default NavigationBar;
