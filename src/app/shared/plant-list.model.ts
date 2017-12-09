export class PlantList {
  private _id: string;
  private _userId: string;
  private _room: string;
  private _plants: {
              type: [ {
                type: Date,
              }],
            };

  constructor( id: string = null, userId: string = null, room: string = null, plants: { type: [{ type: Date }] } = null ) {
    this._id = id;
    this._userId = userId;
    this._room = room;
    this._plants = plants;
  }

  get id(): string {
    return this._id;
  }

  set id(value: string) {
    this._id = value;
  }

  get userId(): string {
    return this._userId;
  }

  set userId(value: string) {
    this._userId = value;
  }

  get room(): string {
    return this._room;
  }

  set room(value: string) {
    this._room = value;
  }

  get plants(): { type: [{ type: Date }] } {
    return this._plants;
  }

  set plants(value: { type: [{ type: Date }] }) {
    this._plants = value;
  }
}
