from flask import Flask, request, jsonify
import sqlite3
from flask_mail import Mail, Message
from flask_cors import CORS
app = Flask(__name__)
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 465
app.config['MAIL_USERNAME'] = 'abinash.s@cisinlabs.com'
app.config['MAIL_PASSWORD'] = 'sinha@123'
app.config['MAIL_USE_TLS'] = False
app.config['MAIL_USE_SSL'] = True

mail = Mail(app)
DATABASE = 'database.db'
CORS(app)
print("HEllo")


@app.route('/available', methods=['GET'])
def available_seats():
	try:
		with sqlite3.connect(DATABASE) as conn:
			cur = conn.cursor()
			cur.execute("select * from Seats")
			rows = cur.fetchall()
			#rows = dict(zip(rows.keys(), rows))
			d = []
			for row in rows:
				d.append({"id": row[0], "available": row[1]})
			available = str([i for i in d if i['available'] == 0])
			return available if available else '0'
	except:
		raise


def check_seat(id):
	try:
		with sqlite3.connect(DATABASE) as conn:
			cur = conn.cursor()
			cur.execute(f"select booked from Seats where id={id}")
			rows = cur.fetchall()
			print(rows)
			return True if rows and rows[0][0] == 0 else False
	except:
		raise


def book_seat(id):
	try:
		with sqlite3.connect(DATABASE) as conn:
			cur = conn.cursor()
			cur.execute(f"UPDATE Seats SET booked=1 WHERE id={id};")
			return True
	except:
		raise


@app.route('/book', methods=['GET', 'POST'])
def book():
	seatID = request.json["seatID"]
	try:
		status = check_seat(seatID)
		print(status)
		if status:
			ret = book_seat(seatID)
			return "Booked"
		else:
			return "Seat already booked"

	except:
		raise


@app.route("/unbook", methods=["GET", "POST"])
def unbook():
	seatID = request.json['seatID']
	try:
		status = check_seat(seatID)
		print(status)
		if not status:
			ret = unbook_seat(seatID)
			return "Unbooked" if ret else "Problem occured"
		else:
			return "Seat not booked yet."
	except:
		raise


def unbook_seat(seatID):
	try:
		with sqlite3.connect(DATABASE) as conn:
			cur = conn.cursor()
			cur.execute(f"UPDATE Seats SET booked=0 WHERE id={seatID};")
			return True
	except:
		raise


@app.route("/mail", methods=["GET", "POST"])
def send_main():
	emailID = request.json['Email']
	try:
		msg = Message('Hello',
		              sender='abinash.s@cisinlabs.com',
		              recipients=[emailID])
		msg.body = "Thank You for booking"
		mail.send(msg)
		return "Sent"
	except:
		raise


if __name__ == "__main__":
	app.run(debug=True, host="0.0.0.0")