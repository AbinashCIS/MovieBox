import React, { Component } from "react";
import Jumbotron from "react-bootstrap/Jumbotron";
import Button from "react-bootstrap/Button";
import "../stylesheets/seatbooking.style.css";
class Seatbooking extends React.Component {
	constructor() {
		super();
		this.state = {
			seat: [
				"SEAT 1",
				"SEAT 2",
				"SEAT 3",
				"SEAT 4",
				"SEAT 5",
				"SEAT 6",
				"SEAT 7",
				"SEAT 8",
				"SEAT 9",
				"SEAT 10",
				"SEAT 11",
				"SEAT 12",
				"SEAT 13",
				"SEAT 14",
				"SEAT 15",
				"SEAT 16",
				"SEAT 17",
				"SEAT 18",
			],
			seatAvailable: [
				"SEAT 1",
				"SEAT 2",
				"SEAT 3",
				"SEAT 4",
				"SEAT 5",
				"SEAT 6",
				"SEAT 7",
				"SEAT 8",
				"SEAT 9",
				"SEAT 10",
				"SEAT 11",
				"SEAT 12",
				"SEAT 13",
				"SEAT 14",
				"SEAT 15",
				"SEAT 16",
				"SEAT 17",
				"SEAT 18",
			],
			seatReserved: [],
			seatSelected: [],
		};
	}

	onClickData(seat) {
		if (this.state.seatReserved.indexOf(seat) > -1) {
			this.setState({
				seatAvailable: this.state.seatAvailable.concat(seat),
				seatReserved: this.state.seatReserved.filter(
					(res) => res != seat
				),
				//seatSelected: this.state.seatSelected.filter(res => res != seat)
			});
		} else {
			this.setState({
				seatReserved: this.state.seatReserved.concat(seat),
				//seatSelected: this.state.seatSelected.concat(seat),
				seatAvailable: this.state.seatAvailable.filter(
					(res) => res != seat
				),
			});
		}
	}
	checktrue(row) {
		if (this.state.seatSelected.indexOf(row) > -1) {
			return false;
		} else {
			return true;
		}
	}

	handleSubmited() {
		this.setState({
			seatSelected: this.state.seatSelected.concat(
				this.state.seatReserved
			),
		});
		this.setState({
			seatReserved: [],
		});
	}

	render() {
		return (
			<div>
				<Jumbotron className="jumbo-style">
					<DrawGrid
						seat={this.state.seat}
						available={this.state.seatAvailable}
						reserved={this.state.seatReserved}
						selected={this.state.seatSelected}
						onClickData={this.onClickData.bind(this)}
						checktrue={this.checktrue.bind(this)}
						handleSubmited={this.handleSubmited.bind(this)}
					/>
				</Jumbotron>
			</div>
		);
	}
}

class DrawGrid extends React.Component {
	render() {
		return (
			<div className="container">
				<h2></h2>
				<table className="grid">
					<tbody>
						<tr>
							{this.props.seat.map((row) => (
								<td
									className={
										this.props.selected.indexOf(row) > -1
											? "reserved"
											: this.props.reserved.indexOf(row) >
											  -1
											? "selected"
											: "available"
									}
									key={row}
									onClick={
										this.props.checktrue(row)
											? (e) => this.onClickSeat(row)
											: null
									}
								>
									{row}{" "}
								</td>
							))}
						</tr>
					</tbody>
				</table>
				<Button
					type="button"
					className="btn-success btnmargin"
					onClick={() => this.props.handleSubmited()}
				>
					Confirm Booking
				</Button>
			</div>
		);
	}

	onClickSeat(seat) {
		this.props.onClickData(seat);
	}
}
export default Seatbooking;
