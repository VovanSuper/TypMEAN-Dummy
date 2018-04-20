import { IEvent, IUser } from "../src/models/interfaces/";

type CoreObj = { [key: string]: string | string[] | number | Date | object | Array<object> };
type PlainObj = { [key: string]: string | string[] | number | object | Array<object> };
type NamedObj<T> = { [key in keyof T]: T[key] };

type IEventObj = NamedObj<IEvent>;
type IUserObj = NamedObj<IUser>;

type Ctor<T = CoreObj> = new (...args: any[]) => T;

type DeepPartial<T> = { [P in keyof T]?: DeepPartial<T[P]> };
type ObjectType<T> = { new(): T } | Function;
interface ObjectLiteral {
  [key: string]: any;
}

function coreObjFieldToJson<T extends CoreObj, K extends keyof T>(obj: T, key: K) {
  if (Array.isArray(obj[key])) {
    return { [key]: <Array<string>>obj[key] }
  } else if (obj[key] instanceof Date) {
    return { [key]: (<Date>(obj[key])).toJSON() }
  } else if (typeof obj[key] === 'number') {
    return { [key]: <number>obj[key] }
  } else {
    return { [key]: (obj[key]).toString() }
  }
}

function jsonToCoreObjField<T extends PlainObj, K extends keyof T>(obj: T, key: K) {
  if (Array.isArray(obj[key])) {
    return { [key]: <Array<string>>(obj[key]) }

  } else if (typeof obj[key] === 'number') {
    return { [key]: <number>obj[key] }
  } else if (key === ('registered' || 'createdAt' || 'startDate' || 'endDate')) {
    let dateVal = (obj[key] && obj[key] !== undefined) ?
      ((typeof obj[key] === 'string') ? new Date(<string>obj[key]) : obj[key])
      : new Date();

    return { [key]: dateVal }
  } else {
    return { [key]: obj[key] }
  }
}

function coreObjFieldToCoreObjField<T extends CoreObj, K extends keyof T>(obj: T, key: K) {
  if (Array.isArray(obj[key])) {
    return { [key]: <Array<string>>obj[key] }
  } else if (obj[key] instanceof Date) {
    return { [key]: <Date>(obj[key]) }
  } else if (typeof obj[key] === 'number') {
    return { [key]: <number>obj[key] }
  } else {
    return { [key]: obj[key] }
  }
}

function serializeObjToJson(proto: any, Type: CoreObj): PlainObj {
  let protoBase = Object.create(proto);
  let arr = [];
  Object.keys(Type).forEach(key => arr.push(coreObjFieldToJson(Type, key)));
  return Object.assign({}, protoBase, ...arr);
}

function serializeObjFromJson(proto: any, Type: PlainObj): CoreObj {
  let protoBase = Object.create(proto);
  let arr = [];
  Object.keys(Type).forEach(key => arr.push(jsonToCoreObjField(Type, key)));
  return Object.assign({}, protoBase, ...arr);
}

function serializeToCoreObj(proto: any, Type: CoreObj) {
  let protoBase = Object.create(proto);
  let arr = [];
  Object.keys(Type).forEach(key => arr.push(coreObjFieldToCoreObjField(Type, key)));

  return Object.assign({}, protoBase, ...arr);
}

let a = [1, 44, 3, 10, 0, 100, 987];
Array.isArray(a)
// function serializeEntityToEntity(proto: any, Type: CoreObj | PlainObj, predicate: Function): PlainObj | CoreObj {
//   let protoBase = Object.create(proto);
//   let arr = [];
//   Object.keys(Type).forEach(key => arr.push(predicate(Type, key)));

//   return Object.assign({}, protoBase, ...arr);
// }

export {
  CoreObj,
  PlainObj,
  jsonToCoreObjField,
  coreObjFieldToJson,
  Ctor,
  serializeObjToJson,
  serializeObjFromJson,
  serializeToCoreObj,
  DeepPartial,
  ObjectType,
  ObjectLiteral
}