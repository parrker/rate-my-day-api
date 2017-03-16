import objection from 'objection';
import moment from 'moment';
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

  authenticate() {
    const accessToken = Math.random().toString(36).substring(2);
    const tokenExpiration = moment().add(10, 'days');

    this.$query().patch({ accessToken, tokenExpiration });

    return accessToken;
  }

  hasValidAccessToken() {
    if (this.accessToken === null) return false;

    if (moment().diff(moment(this.tokenExpiration)) >= 0) return true;

    return false;
  }
}
