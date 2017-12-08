export class User {
  private _id?: string;
  private _name: string;
  private _email: string;
  private _password: string;
  private _age: number;

  constructor( _id: string = null, name: string = null, email: string = null, password: string = null, age: number = null) {
    this._id = _id;
    this._name = name;
    this._email = email;
    this._password = password;
    this._age = age;
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

  get password(): string {
    return this._password;
  }

  set password(value: string) {
    this._password = value;
  }

  get age(): number {
    return this._age;
  }

  set age(value: number) {
    this._age = value;
  }
}
