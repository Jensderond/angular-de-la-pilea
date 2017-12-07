export class User {
  private _id?: string;
  private _name: string;
  private _email: string;

  constructor( _id: string = null, name: string = null, email: string = null) {
    this._id = _id;
    this._name = name;
    this._email = email;
  }

  get id(): string {
    return this._id;
  }

  set id(value: string) {
    this._id = value;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get email(): string {
    return this._email;
  }

  set email(value: string) {
    this._email = value;
  }

}
