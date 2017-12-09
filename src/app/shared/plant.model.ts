export class Plant {
  _id?: string;
  private _name: string;
  private _description: string;
  private _type: string;
  private _origin: string;
  private _genus: string;
  private _imagePath: string;
  private _sunLevel: number;
  private _waterLevel: number;
  private _nicknames: {
                  type: [ {
                    type: string,
                  }],
                };

  constructor(_id: string = null, name: string = null, description: string = null,
              type: string = null, origin: string = null, genus: string = null, imagePath: string = null,
              sunLevel: number = null, waterLevel: number = null, nicknames: { type: [{ type: string }] } = null ) {
    this.id = _id;
    this.name = name;
    this.description = description;
    this.type = type;
    this.origin = origin;
    this.genus = genus;
    this.imagePath = imagePath;
    this.sunLevel = sunLevel;
    this.waterLevel = waterLevel;
    this.nicknames = nicknames;
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

  get description(): string {
    return this._description;
  }

  set description(value: string) {
    this._description = value;
  }

  get type(): string {
    return this._type;
  }

  set type(value: string) {
    this._type = value;
  }

  get origin(): string {
    return this._origin;
  }

  set origin(value: string) {
    this._origin = value;
  }

  get genus(): string {
    return this._genus;
  }

  set genus(value: string) {
    this._genus = value;
  }

  get imagePath(): string {
    return this._imagePath;
  }

  set imagePath(value: string) {
    this._imagePath = value;
  }

  get sunLevel(): number {
    return this._sunLevel;
  }

  set sunLevel(value: number) {
    this._sunLevel = value;
  }

  get waterLevel(): number {
    return this._waterLevel;
  }

  set waterLevel(value: number) {
    this._waterLevel = value;
  }

  get nicknames(): { type: [{ type: string }] } {
    return this._nicknames;
  }

  set nicknames(value: { type: [{ type: string }] }) {
    this._nicknames = value;
  }

  public isValidPlant(): Boolean {
    return this.name !== '' || this.name !== null ||
      this.imagePath !== '' || this.imagePath !== null ||
      this.description !== '' || this.description !== null ||
      this.genus !== '' || this.genus !== null ||
      this.type !== '' || this.type !== null ||
      this.waterLevel !== null || this.sunLevel !== null;
  }
}
