import psycopg2

conn = psycopg2.connect(database = "postgres",host ="localhost", user ="postgres", password ="01031979", port = "5432")
cur = conn.cursor()

cur.execute('''CREATE TABLE IF NOT EXISTS person (id serial PRIMARY KEY, name varchar(100), last-name varchar(100), email varchar(100), phone-number varchar(12), password varchar(100))''')
cur.execute('''INSERT INTO person (name, last-name, email, phone-number, password) VALUES ('name, last-name, email, phone-number, password') ''')

conn.commit()
cur.close()
conn.close()

