import Exists from '@axiona/object/property/boolean/exists.js';
import Writable from '@axiona/object/property/boolean/writable.js';
import {List} from 'ts-toolbelt';
import {Required} from 'utility-types';
import MultiHandlers from './multi-handlers.js';

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

        if(Exists.Parameters(this.settable, property)) {

            const list = this.settable[<string|number>property] as Partial<List.UnionOf<Objects>>[];

            for(const object of list) {

                object[property] = value;
            }

            return list.length !== 0;
        }

        const list : Partial<List.UnionOf<Objects>>[] = [];

        for (const handler of this.getHandler(target)) {

            if(Writable.Parameters(handler, property)) {

                list.push(handler);
            }
        }

        (this.settable as Partial<Record<PropertyKey, Partial<List.UnionOf<Objects>>[]>>)[<string|number>property] = list;

        return this.set(target, property, value, receiver);

    }
}
