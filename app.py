import psycopg2
from flask import Flask, render_template, request, redirect, url_for, flash


app = Flask(__name__)
app.secret_key = 'svozv'
def db_conn():
    conn = psycopg2.connect(database = "postgres",host ="localhost", user ="postgres", password ="123", port = "5432")
    return conn

@app.route('/')
def registration():
    conn = db_conn()
    cur = conn.cursor()
    cur.close()
    conn.close()
    return render_template('registration.html')

@app.route('/create', methods=['POST'])
def create():
    conn = db_conn()
    cur = conn.cursor()
    name = request.form['name']
    last_name = request.form['last-name']
    email = request.form['email']
    phone_number = request.form['phone']
    password = request.form['password']
    confirm_password = request.form['confirm-password']
    if password != confirm_password:
        flash('Пароли не совпадают. Пожалуйста, попробуйте снова.')
        return redirect(url_for('registration'))

    cur.execute('''INSERT INTO person (person_name, person_sname, person_email, person_tnumber, person_password) VALUES(%s, %s, %s, %s, %s)''',(name,last_name,email, phone_number, password))
    conn.commit()
    cur.close()
    conn.close()
    return redirect(url_for('registration'))

@app.route('/update', methods = ['POST'])
def update():
    conn = db_conn()
    cur = conn.cursor()
    id = request.form['id']
    name = request.form['name']
    last_name = request.form['last-name']
    email = request.form['email']
    phone_number = request.form['phone']
    password = request.form['password']
    id = request.form['id']
    cur.execute('''UPDATE person SET person_name =%s, person_sname =%s, person_email=%s, person_tnumber=%s, person_password=%s WHERE id=%s''',(name,last_name, email, phone_number, password, id))

    conn.commit()
    return redirect(url_for('registration'))


@app.route('/delete', methods = ['POST'])
def delete():
    conn = db_conn()
    cur = conn.cursor()
    id = request.form['id']

    cur.execute('''DELETE FROM person WHERE id=%s''',(id,))

    conn.commit()
    return redirect(url_for('registration'))