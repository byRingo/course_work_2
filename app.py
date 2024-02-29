import psycopg2
from flask import Flask, render_template, request, redirect, url_for


app = Flask(__name__)

def db_conn():
    conn = psycopg2.connect(database = "postgres",host ="localhost", user ="postgres", password ="01031979", port = "5432")
    return conn

@app.route('/')
def index():
    conn = db_conn()
    cur = conn.cursor()
    cur.execute('''SELECT * FROM testing''')
    data = cur.fetchall()
    cur.close()
    conn.close()
    return render_template('index_test.html', data = data)

@app.route('/create', methods=['POST'])
def create():
    conn = db_conn()
    cur = conn.cursor()
    name = request.form['name']
    cur.execute('''INSERT INTO testing (name) VALUES(%s)''',(name,))
    conn.commit()
    cur.close()
    conn.close()
    return redirect(url_for('index_test'))

@app.route('/update', methods = ['POST'])
def update():
    conn = db_conn()
    cur = conn.cursor()
    name = request.form['name']

    cur.execute('''UPDATE testing SET name =%s WHERE id=%s''',(name,id))

    conn.commit()
    return redirect(url_for('index_test'))


@app.route('/delete', methods = ['POST'])
def delete():
    conn = db_conn()
    cur = conn.cursor()
    id = request.form['id']

    cur.execute('''DELETE FROM testing WHERE id=%s''',(id,))

    conn.commit()
    return redirect(url_for('index_test'))