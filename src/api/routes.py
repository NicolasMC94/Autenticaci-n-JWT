import redis
from datetime import timedelta
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from sqlalchemy.sql import text
from flask_jwt_extended import (
    JWTManager, jwt_required, get_jwt_identity,
    create_access_token,get_jwt
)

api = Blueprint('api', __name__)

""" blacklist = set() """

@api.route('/signup', methods=['POST'])
def signup():
    data = request.get_json() 
    user = User.query.filter_by(email = data.get("email")).first()
    if user is not None:
        return "Usuario ya existente", 404
    new_user = User(
        email = data.get("email"),
        password = data.get("password"),
        is_active = True
    )
    db.session.add(new_user)
    db.session.commit()

    return jsonify(new_user.serialize()), 200

    
@api.route('/login', methods=['POST'])
def login():
    data = request.get_json() 
    user = User.query.filter_by(email = data["email"], password = data["password"]).first()
    # user = User.query.filter_by(email = data.get("email"), password = data.get("password")).first()
    # las 2 lineas anteriores significan lo mismo
    if user is None:
        return "Usuario incorrecto", 401
    access_token = create_access_token(identity=user.id)
    return jsonify({ "token": access_token, "user_id": user.id, "result": "Usuario registrado correctamente"}), 200


@api.route('/private', methods=['GET'])
@jwt_required()
def private():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    if user:
        return jsonify({"resultado": "acceso permitido"}), 200
    else:
        return jsonify({ "resultado": "usuario no autenticado"}), 400
