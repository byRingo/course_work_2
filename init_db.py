import psycopg2

conn = psycopg2.connect(database = "postgres",host ="localhost", user ="postgres", password ="01031979", port = "5432")
cur = conn.cursor()

cur.execute('''CREATE TABLE IF NOT EXISTS testing (id serial PRIMARY KEY, name varchar(100))''')
cur.execute('''INSERT INTO testing (name) VALUES ('test')''')

conn.commit()
cur.close()
conn.close()

