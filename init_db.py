import psycopg2

conn = psycopg2.connect(database="postgres", host="localhost", user="postgres", password="01031979", port="5432")
cur = conn.cursor()

cur.execute('''CREATE TABLE IF NOT EXISTS person (
    person_id serial PRIMARY KEY, 
    person_name varchar(100), 
    person_sname varchar(100), 
    person_email varchar(100), 
    person_tnumber varchar(12), 
    person_password varchar(100)
)''')

conn.commit()
cur.close()
conn.close()
