import {Required} from 'utility-types';
import MultiHandlers from './multi-handlers.js';

export default class DefinePropertyListAll<
    Target extends object,
    Objects extends object[]
>  extends MultiHandlers<Target, Objects> implements Required<ProxyHandler<Target>, 'defineProperty'> {


    bindTo<Argument extends Target>(handler : ProxyHandler<Argument>) : Required<ProxyHandler<Argument>, 'defineProperty'> {

        handler.defineProperty = (target: Target, property: PropertyKey, attributes: PropertyDescriptor) => this.defineProperty(target, property, attributes);
        return handler as Required<ProxyHandler<Argument>, 'defineProperty'>;
    }

    defineProperty(target: Target, property: PropertyKey, attributes: PropertyDescriptor): boolean {

        let result : boolean = true;

        for (let object of this.getHandler(target)) {

            result = Reflect.defineProperty(object, property , attributes) && result;
        }

        return result;

    }
}
