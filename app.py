import psycopg2
from flask import Flask, render_template, request, redirect, url_for


app = Flask(__name__)

def db_conn():
    conn = psycopg2.connect(database = "postgres",host ="localhost", user ="postgres", password ="123", port = "5432")
    return conn

@app.route('/')
def index():
    conn = db_conn()
    cur = conn.cursor()
    cur.execute('''SELECT * FROM person''')
    data = cur.fetchall()
    cur.close()
    conn.close()
    return render_template('index.html', data = data)

@app.route('/create', methods=['POST'])
def create():
    conn = db_conn()
    cur = conn.cursor()
    name = request.form['name']
    last_name = request.form['last-name']
    email = request.form['email']
    phone_number = request.form['phone-number']
    password = request.form['password']
    cur.execute('''INSERT INTO person (name, last-name, email, phone-number, password) VALUES(%s, %s, %s, %s, %s)''',(name,last_name,email, phone_number, password ))
    conn.commit()
    cur.close()
    conn.close()
    return redirect(url_for('index'))

@app.route('/update', methods = ['POST'])
def update():
    conn = db_conn()
    cur = conn.cursor()
    name = request.form['name']
    last_name = request.form['last-name']
    email = request.form['email']
    phone_number = request.form['phone-number']
    password = request.form['password']
    id = request.form['id']
    cur.execute('''UPDATE person SET name =%s, last-name =%s, email=%s, phone-number=%s, password=%s WHERE id=%s''',(name,last_name, email, phone_number, password, id))

    conn.commit()
    return redirect(url_for('index'))


@app.route('/delete', methods = ['POST'])
def delete():
    conn = db_conn()
    cur = conn.cursor()
    id = request.form['id']

    cur.execute('''DELETE FROM person WHERE id=%s''',(id,))

    conn.commit()
    return redirect(url_for('index'))
app.run(debug = True)