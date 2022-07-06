import Exists from '@alirya/object/property/boolean/exists.js';
import {Required} from 'utility-types';
import MultiHandlers from './multi-handlers.js';

export default class HasListAny<
    Target extends object,
    Objects extends object[]
> extends MultiHandlers<Target, Objects> implements Required<ProxyHandler<Target>, 'has'>  {

    private handler : Partial<Record<keyof Target, boolean>> = {};

    reset() {

        this.handler = {};
    }

    bindTo<Argument extends Target>(handler : ProxyHandler<Argument>) : Required<ProxyHandler<Argument>, 'has'> {

        handler.has = (target: Target, property: PropertyKey) => this.has(target, property);

        return handler as Required<ProxyHandler<Argument>, 'has'>;
    }

    has(target: Target, property: PropertyKey): boolean {

        if(Exists.Parameters(this.handler, property)) {

            return this.handler[<string|number>property];
        }

        (this.handler as Partial<Record<keyof Target, boolean>>)[<string|number>property] = false;

        for (const handler of this.getHandler(target)) {

            if(Exists.Parameters(handler, property)) {

                (this.handler  as Partial<Record<keyof Target, boolean>>)[<string|number>property] = true;
                break;
            }
        }

        return this.handler[property];

    }
}

