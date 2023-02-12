import {Required} from 'utility-types';
import MultiHandlers from './multi-handlers.js';

export default class PreventExtensibleListAll<
    Target extends object,
    Objects extends object[]
> extends MultiHandlers<Target, Objects> implements Required<ProxyHandler<Target>, 'preventExtensions'>  {

    private extensible ?: boolean;

    reset() {

        this.extensible = undefined;
    }

    bindTo<Argument extends Target>(handler : ProxyHandler<Argument>) : Required<ProxyHandler<Argument>, 'preventExtensions'>  {

        handler.preventExtensions = (target: Target) => this.preventExtensions(target);

        return handler as Required<ProxyHandler<Argument>, 'preventExtensions'>;
    }

    preventExtensions(target: Target): boolean {

        let result  = true;

        for(const object of this.getHandler(target)) {

            result = Reflect.preventExtensions(object) && result;
        }

        return result;
    }
}
