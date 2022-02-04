

export default class Debug<ObjectType extends object> implements Required<ProxyHandler<ObjectType>> {

    constructor(
        public  handler :(handler:string, args:any[])=>void = (name : string, args : any[]) => console.log([name, args])
    ) {
    }

    getPrototypeOf (target: ObjectType): object | null {

        return Object.getPrototypeOf(target);
    }
    setPrototypeOf (target: ObjectType, v: any): boolean {

        return Reflect.setPrototypeOf(target, v);
    }

    apply(target: ObjectType, thisArg: any, argArray: any): any {

        this.handler('apply', [...arguments]);
    }

    construct(target: ObjectType, argArray: any, newTarget: any): Object {

        this.handler('construct', [...arguments]);

        return target;
    }

    defineProperty(target: ObjectType, p: PropertyKey, attributes: PropertyDescriptor): boolean {

        this.handler('defineProperty', [...arguments]);
        return false;
    }

    deleteProperty(target: ObjectType, p: PropertyKey): boolean {

        this.handler('deleteProperty', [...arguments]);
        return false;
    }

    enumerate(target: ObjectType): PropertyKey[] {

        this.handler('enumerate', [...arguments]);
        return [];
    }

    get(target: ObjectType, p: PropertyKey, receiver: any): any {

        this.handler('get', [...arguments]);
    }

    getOwnPropertyDescriptor(target: ObjectType, p: PropertyKey): PropertyDescriptor | undefined {

        this.handler('getOwnPropertyDescriptor', [...arguments]);
        return undefined;
    }

    has(target: ObjectType, p: PropertyKey): boolean {

        this.handler('has', [...arguments]);
        return false;
    }

    isExtensible(target: ObjectType): boolean {

        this.handler('isExtensible', [...arguments]);
        return false;
    }

    ownKeys(target: ObjectType): (string|symbol)[] {

        this.handler('ownKeys', [...arguments]);
        return [];
    }

    preventExtensions(target: ObjectType): boolean {

        this.handler('preventExtensions', [...arguments]);
        return true;
    }

    set(target: ObjectType, p: PropertyKey, value: any, receiver: any): boolean {

        this.handler('set', [...arguments]);
        return true;
    }


}
