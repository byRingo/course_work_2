import psycopg2
from models import House;
from flask import Flask, render_template, request, redirect, url_for, flash


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///<db_name>.db'
app.secret_key = 'svozv'
def db_conn():
    conn = psycopg2.connect(database = "",host ="", user ="", password ="", port = "")
    return conn

@app.route('/')
def index():    
    conn = db_conn()
    cur = conn.cursor()
    cur.close()
    conn.close()
    return render_template('index.html')


@app.route('/data')
def data():
    house = House.HouseModel.query.all()
    conn = db_conn()
    cur = conn.cursor()
    cur.close()
    conn.close()
    return render_template('index.html', house = house)

@app.route('/path')
def path():
    conn = db_conn()
    cur = conn.cursor()
    cur.close()
    conn.close()
    return render_template('path.html')

@app.route('/registration', methods=['GET'])
def registration():
    return render_template('registration.html')

@app.route('/create', methods=['POST'])
def create():
    conn = db_conn()
    cur = conn.cursor()
    name = request.form['name']
    last_name = request.form['last-name']
    email = request.form['email']
    cur.execute('SELECT * FROM person WHERE person_email = %s', (email,))
    if cur.fetchone():
        flash('Этот адрес электронной почты уже используется. Пожалуйста, используйте другой адрес.')
        return redirect(url_for('registration'))
    phone_number = request.form['phone']
    cur.execute('SELECT * FROM person WHERE person_tnumber = %s', (phone_number,))
    if cur.fetchone():
        flash('Этот номер телефона уже используется. Пожалуйста, используйте другой адрес.')
        return redirect(url_for('registration'))
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

# @app.route('/update', methods = ['POST'])
# def update():
#     conn = db_conn()
#     cur = conn.cursor()
#     id = request.form['id']
#     name = request.form['name']
#     last_name = request.form['last-name']
#     email = request.form['email']
#     phone_number = request.form['phone']
#     password = request.form['password']
#     id = request.form['id']
#     cur.execute('''UPDATE person SET person_name =%s, person_sname =%s, person_email=%s, person_tnumber=%s, person_password=%s WHERE id=%s''',(name,last_name, email, phone_number, password, id))

#     conn.commit()
#     return redirect(url_for('registration'))


# @app.route('/delete', methods = ['POST'])
# def delete():
#     conn = db_conn()
#     cur = conn.cursor()
#     id = request.form['id']
#     cur.execute('''DELETE FROM person WHERE id=%s''',(id,))
#     conn.commit()
#     return redirect(url_for('registration'))
