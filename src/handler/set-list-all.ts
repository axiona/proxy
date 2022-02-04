import Exists from '@alirya/object/property/boolean/exists';
import Writable from '@alirya/object/property/boolean/writable-parameters';
import {List} from 'ts-toolbelt';
import {Required} from 'utility-types';
import MultiHandlers from './multi-handlers';

export default class SetListAll<
    Target extends object,
    Objects extends object[] = object[]
> extends MultiHandlers<Target, Objects> implements Required<ProxyHandler<Target>, 'set'> {

    private settable : Partial<Record<PropertyKey, Partial<List.UnionOf<Objects>>[]>> = {};

    reset() {

        this.settable = {};
    }

    bindTo<Argument extends Target>(handler : ProxyHandler<Argument>) : Required<ProxyHandler<Argument>, 'set'> {

        handler.set = (target: Target, property: PropertyKey, value: any, receiver: any) => this.set(target, property, value, receiver);

        return handler as Required<ProxyHandler<Argument>, 'set'>;
    }

    set(target: Target, property: PropertyKey, value: any, receiver: any): boolean {

        if(Exists(this.settable, property)) {

            let list = this.settable[<string|number>property] as Partial<List.UnionOf<Objects>>[];

            for(let object of list) {

                object[property] = value;
            }

            return list.length !== 0;
        }

        const list : Partial<List.UnionOf<Objects>>[] = [];

        for (let handler of this.getHandler(target)) {

            if(Writable(handler, property)) {

                list.push(handler);
            }
        }

        (this.settable as Partial<Record<PropertyKey, Partial<List.UnionOf<Objects>>[]>>)[<string|number>property] = list;

        return this.set(target, property, value, receiver);

    }
}
