from flask import Blueprint, request, jsonify
from app import db
from app.models.user import User, PhysicalResource
from datetime import datetime
from flask_jwt_extended import get_jwt_identity, jwt_required

phy_upload = Blueprint('phy_upload', __name__)

@phy_upload.route('/upload', methods=['POST'])
@jwt_required()
def upload():
    try:
        upload_header = request.headers.get('Authorization')
        data = request.get_json()
        # Validate required fields
        required_fields = ['title', 'from_date', 'to_date', 'upload_item']
        for field in required_fields:
            if field not in data:
                return jsonify({'error': f"'{field}' is required"}), 400

        # Parse dates
        try:
            from_date = datetime.strptime(data['from_date'], '%Y-%m-%d')
            to_date = datetime.strptime(data['to_date'], '%Y-%m-%d')

            # Ensure from_date is before to_date
            if from_date >= to_date:
                return jsonify({'error': "'from_date' must be earlier than 'to_date'"}), 400
        except ValueError:
            return jsonify({'error': "Invalid date format. Use 'YYYY-MM-DD'."}), 400

        user_id=get_jwt_identity()  # Get the user ID from the JWT token
        user = User.query.filter_by(id=user_id).first()

        if not user:
            return jsonify({'error': 'User not found'}), 404

        # Create a new PhysicalResource instance
        new_resource = PhysicalResource(
            user_id=user.id,
            title=data['title'],
            description=data.get('description'),
            condition=data.get('condition'),
            from_date=from_date,
            to_date=to_date,
            upload_item=data['upload_item']
        )

        # Add to the database

        db.session.add(new_resource)


        db.session.commit()

        return jsonify({'message': 'Physical resource created successfully', 'id': new_resource.id}), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500
    

    
@phy_upload.route('/physical-resources', methods=['GET'])
def list():
    try:
        request_header = request.headers.get('Authorization')
        resources = PhysicalResource.query.all()
        resource_list = []
        for resource in resources:
            resource_list.append({
                'id': resource.id,
                'title': resource.title,
                'condition': resource.condition,
                'description': resource.description,
                'uploader': resource.user_id
            })

        return jsonify(resource_list), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500
