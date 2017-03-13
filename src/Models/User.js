import objection from 'objection';
import BaseModel from './BaseModel';

export default class User extends BaseModel {
  static get tableName() {
    return 'users';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['email', 'password', 'name'],

      properties: {
        id: { type: 'integer' },
        email: { type: 'string' },
        password: { type: 'string' },
        name: { type: 'string' },
        created_at: { type: 'string', format: 'date-time' },
        updated_at: { type: 'string', format: 'date-time' },
      }
    }
  }

  async $beforeInsert() {
    const emailAlreadyExists = await User.query()
      .where('email', this.email)
      .first();

    if (emailAlreadyExists) {
      throw objection.ValidationError('User with this email already exists');
    }

    super.$beforeInsert();
  }
}
