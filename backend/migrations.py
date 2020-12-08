import sqlite3


def create_tables():
	with sqlite3.connect("database.db") as conn:
		conn.execute('''CREATE TABLE "Seats" (
                        "id"	INTEGER,
                        "booked"	INTEGER NOT NULL,
                        PRIMARY KEY("id")
                    );''')
