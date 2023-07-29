from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Customer, Project
from api.utils import generate_sitemap, APIException
from werkzeug.security import generate_password_hash, check_password_hash
from base64 import b64encode
import os
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

api = Blueprint('api', __name__)

# /users endpoints

@api.route('/users', methods=['GET'])
@jwt_required()
def get_users():
    users = User()
    users = users.query.all()
    if users is not None:
        users = list(map(lambda item: item.serialize(), users))
        return jsonify(users), 200
    else:
        return jsonify({"message": "no users found"}), 404


@api.route('/users/<int:user_id>', methods=['GET'])
def get_one_user(user_id=None):
    if user_id is not None:
        users = User()
        users = users.query.get(user_id)
        if users is not None:
            return jsonify(users.serialize()), 200
        else:
            return jsonify({"message": "user not found"}), 404
    else:
        return jsonify({"message": "bad request"}), 400


@api.route('/users/<int:user_id>/projects', methods=['GET'])
def get_user_projects(user_id=None):
    projects = Project.query.filter_by(account_manager_id=user_id).all()
    if len(projects) == 0:
        projects = Project.query.filter_by(assistant_id=user_id).all()
        if len(projects) == 0:
            return jsonify({"message": "no projects found"}), 404
    projects = list(map(lambda item: item.serialize(), projects))
    return jsonify(projects), 200


@api.route('/users/<department>', methods=['GET'])
def get_department(department=None):
    if department == "hr" or department == "sales" or department == "finances" or department == "trial" or department == "recruitment":
        users = User()
        users = users.query.filter_by(department=department).all()
        users = list(map(lambda item: item.serialize(), users))
        if len(users) != 0:
            return jsonify(users), 200
        else:
            return jsonify({"message": "no users found"}), 404
    else:
        return jsonify({"message": "bad request"}), 400

def set_password(password, salt):
    return generate_password_hash(f"{password}{salt}")

def check_password(hash_password, password, salt):
    return check_password_hash(hash_password, f"{password}{salt}")

@api.route('/users', methods=['POST'])
def add_user():
    if request.method == "POST":
        data = request.json

        if data.get("email") is None:
            return jsonify({"message": "Wrong property"}), 400
        if data.get("password") is None:
            return jsonify({"message": "Wrong property"}), 400
        if data.get("department") is None:
            return jsonify({"message": "Wrong property"}), 400
        if data.get("name") is None:
            return jsonify({"message": "Wrong property"}), 400
        if data.get("last_name") is None:
            return jsonify({"message": "Wrong property"}), 400
        if data.get("city") is None:
            return jsonify({"message": "Wrong property"}), 400
        if data.get("country") is None:
            return jsonify({"message": "Wrong property"}), 400
        
        user = User.query.filter_by(email=data.get("email")).first()
        if user is not None:
            return jsonify({"message": "The user all ready exist"})

        if user is None:
            salt = b64encode(as.urandom(32)).decode('utf-8')
            password = set_password (password, salt)
            user = User(email=data["email"], password=data["password"],
                        department=data["department"], name=data["name"],
                        last_name=data["last_name"], city=data["city"],
                        country=data["country"], salt = salt)
            db.session.add(user)

            try:
                db.session.commit()
                return jsonify(body), 201

            except Exception as error:
                print(error)
                return jsonify({"message": error.args}), 500

@api.route('/login', methods=['POST'])
def handle_login():
    if request.method == "POST":
        body = request.json
        email = body.get ("email", None)
        password = body.get("password", None)

        if email is None or password is None:
            return jsonify("You need an Email and a Password"), 400
        else:
            user = User.query.filter_by(email=email).one_or_none()
            if user is None:
                return jsonify({"message":"Bad credential"}),400
            else:
                if check_password(user.password, password, user.salt):
                    token = create_access_token(identity = user.id)
                    return jsonify({"token":token}), 200
                else:
                    return jsonify({"message":"Bad Credential"}),400
                




# /customers endpoints


@api.route('/customers', methods=['GET'])
def get_customers():
    customers = Customer()
    customers = customers.query.all()
    customers = list(map(lambda item: item.serialize(), customers))
    return jsonify(customers)


@api.route('/customers/<int:customer_id>', methods=['GET'])
def get_one_customer(customer_id=None):
    if customer_id is not None:
        customer = Customer()
        customer = customer.query.get(customer_id)
        if customer is not None:
            return jsonify(customer.serialize()), 200
        else:
            return jsonify({"message": "customer not found"}), 404
    else:
        return jsonify({"message": "bad request"}), 400

# /projects endpoints


@api.route('/projects', methods=['GET'])
def get_projects():
    projects = Project()
    projects = projects.query.all()
    aux_projects = []
    for project in projects:
        aux_projects.append(project.serialize())
    for project in aux_projects:
        manager = User.query.filter_by(
            id=project["account_manager_id"]).first()
        assistant = User.query.filter_by(id=project["assistant_id"]).first()
        customer = User.query.filter_by(id=project["customer_id"]).first()
        project["account_manager_id"] = f"{manager.name} {manager.last_name}"
        project["assistant_id"] = f"{assistant.name} {assistant.last_name}"
        project["customer_id"] = f"{customer.name} {customer.last_name}"
    return jsonify(aux_projects), 200


@api.route('/projects/<int:project_id>', methods=['GET'])
def get_one_project(project_id=None):
    if project_id is not None:
        project = Project()
        project = project.query.get(project_id)
        if project is not None:
            return jsonify(project.serialize()), 200
        else:
            return jsonify({"message": "project not found"}), 404
    else:
        return jsonify({"message": "bad request"}), 400


@api.route('/projects/<int:project_id>', methods=['PUT'])
def edit_project(project_id=None):
    data = request.json
    project = Project.query.get(project_id)

    if data.get("project_name") is not None:
        project.project_name = data["project_name"]
    if data.get("account_manager_id") is not None:
        project.account_manager_id = data["account_manager_id"]
    if data.get("assistant_id") is not None:
        project.assistant_id = data["assistant_id"]
    if data.get("customer_id") is not None:
        project.customer_id = data["customer_id"]
    if data.get("description") is not None:
        project.description = data["description"]
    if data.get("start_date") is not None:
        project.start_date = data["start_date"]
    if data.get("end_date") is not None:
        project.end_date = data["end_date"]

        try:
            db.session.commit()
            return jsonify(data), 201

        except Exception as error:
            print(error)
            return jsonify({"message": error.args}), 500


@api.route('/projects', methods=['POST'])
def add_project():
    data = request.json
    if data.get("project_name") is None:
        return jsonify({"message": "Wrong property"}), 400
    if data.get("account_manager_id") is None:
        return jsonify({"message": "Wrong property"}), 400
    if data.get("assistant_id") is None:
        return jsonify({"message": "Wrong property"}), 400
    if data.get("customer_id") is None:
        return jsonify({"message": "Wrong property"}), 400

    project = Project.query.filter_by(
        project_name=data.get("project_name")).first()

    if project is not None:
        return jsonify({"message": "The user all ready exist"})

    if project is None:
        project = Project(project_name=data["project_name"], account_manager_id=data["account_manager_id"],
                          assistant_id=data["assistant_id"], customer_id=data["customer_id"], description=data["description"])
        db.session.add(project)
        try:
            db.session.commit()
            return jsonify(data), 201

        except Exception as error:
            print(error)
            return jsonify({"message": error.args}), 500
