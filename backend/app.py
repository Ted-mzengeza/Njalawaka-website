from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy

import os
from werkzeug.utils import secure_filename

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = "uploads"
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER

# Database
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///njalawaka.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)


# =========================
# MODELS
# =========================

class Admin(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100), unique=True)
    password = db.Column(db.String(100))

class Product(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    description = db.Column(db.String(200))
    image = db.Column(db.String(200))
    category = db.Column(db.String(50))
    price = db.Column(db.Integer, nullable=True)


class Equipment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    description = db.Column(db.String(200))
    image = db.Column(db.String(200))
    price = db.Column(db.Integer, nullable=True)


class Animal(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    description = db.Column(db.Text)
    image = db.Column(db.String(200))
    price = db.Column(db.Integer, nullable=True)


@app.route("/")
def home():
    return {"message": "Njalawaka Agri API running"}


with app.app_context():
    db.create_all()


# =========================
# PRODUCTS
# =========================

@app.route("/products", methods=["POST"])
def add_product():

    name = request.form.get("name")
    description = request.form.get("description")
    category = request.form.get("category")
    price = request.form.get("price")

    image = request.files.get("image")
    filename = None

    if image:
        filename = secure_filename(image.filename)
        image.save(os.path.join(app.config["UPLOAD_FOLDER"], filename))

    product = Product(
        name=name,
        description=description,
        image=filename,
        category=category,
        price=price
    )

    db.session.add(product)
    db.session.commit()

    return {"message": "Product added successfully"}


@app.route("/products", methods=["GET"])
def get_products():

    products = Product.query.all()

    result = []

    for p in products:
        result.append({
            "id": p.id,
            "name": p.name,
            "description": p.description,
            "image": p.image,
            "category": p.category,
            "price": p.price
        })

    return jsonify(result)


@app.route("/products/<int:id>", methods=["DELETE"])
def delete_product(id):

    product = Product.query.get(id)

    if not product:
        return {"message": "Product not found"}, 404

    db.session.delete(product)
    db.session.commit()

    return {"message": "Product deleted"}


@app.route("/products/<int:id>", methods=["PUT"])
def update_product(id):

    product = Product.query.get(id)

    if not product:
        return {"message": "Product not found"}, 404

    name = request.form.get("name")
    description = request.form.get("description")
    category = request.form.get("category")
    price = request.form.get("price")

    image = request.files.get("image")

    if name:
        product.name = name

    if description:
        product.description = description

    if category:
        product.category = category

    if price:
        product.price = price

    if image:
        filename = secure_filename(image.filename)
        image.save(os.path.join(app.config["UPLOAD_FOLDER"], filename))
        product.image = filename

    db.session.commit()

    return {"message": "Product updated"}


# =========================
# EQUIPMENT
# =========================

@app.route("/equipment", methods=["POST"])
def add_equipment():

    name = request.form.get("name")
    description = request.form.get("description")
    price = request.form.get("price")

    image = request.files.get("image")
    filename = None

    if image:
        filename = secure_filename(image.filename)
        image.save(os.path.join(app.config["UPLOAD_FOLDER"], filename))

    equipment = Equipment(
        name=name,
        description=description,
        image=filename,
        price=price
    )

    db.session.add(equipment)
    db.session.commit()

    return {"message": "Equipment added"}


@app.route("/equipment", methods=["GET"])
def get_equipment():

    equipment = Equipment.query.all()

    result = []

    for e in equipment:
        result.append({
            "id": e.id,
            "name": e.name,
            "description": e.description,
            "image": e.image,
            "price": e.price
        })

    return jsonify(result)


# =========================
# ANIMALS
# =========================

@app.route("/animals", methods=["POST"])
def add_animal():

    name = request.form.get("name")
    description = request.form.get("description")
    price = request.form.get("price")

    image = request.files.get("image")
    filename = None

    if image:
        filename = secure_filename(image.filename)
        image.save(os.path.join(app.config["UPLOAD_FOLDER"], filename))

    animal = Animal(
        name=name,
        description=description,
        image=filename,
        price=price
    )

    db.session.add(animal)
    db.session.commit()

    return {"message": "Animal added"}


@app.route("/animals", methods=["GET"])
def get_animals():

    animals = Animal.query.all()

    result = []

    for a in animals:
        result.append({
            "id": a.id,
            "name": a.name,
            "description": a.description,
            "image": a.image,
            "price": a.price
        })

    return jsonify(result)


# =========================
# IMAGE SERVING
# =========================

@app.route("/uploads/<filename>")
def uploaded_file(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)


# =========================
# LOGIN
# =========================

@app.route("/login", methods=["POST"])
def login():

    data = request.get_json()

    username = data.get("username")
    password = data.get("password")

    user = Admin.query.filter_by(username=username, password=password).first()

    if user:
        return {"message": "Login successful"}
    else:
        return {"message": "Invalid credentials"}, 401

@app.route("/register", methods=["POST"])
def register():

    data = request.get_json()

    username = data.get("username")
    password = data.get("password")

    existing = Admin.query.filter_by(username=username).first()

    if existing:
        return {"message": "User already exists"}, 400

    new_admin = Admin(username=username, password=password)

    db.session.add(new_admin)
    db.session.commit()

    return {"message": "User registered successfully"}


if __name__ == "__main__":
    app.run(debug=True)