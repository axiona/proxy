import {Required} from 'utility-types';
import MultiHandlers from './multi-handlers.js';

export default class DeletePropertyListAll<
    Target extends object,
    Objects extends object[]
>  extends MultiHandlers<Target, Objects> implements Required<ProxyHandler<Target>, 'deleteProperty'> {

    bindTo<Argument extends Target>(handler : ProxyHandler<Argument>) : Required<ProxyHandler<Argument>, 'deleteProperty'> {

        handler.deleteProperty = (target: Target, property: PropertyKey) => this.deleteProperty(target, property);
        return handler as Required<ProxyHandler<Argument>, 'deleteProperty'>;
    }

    deleteProperty(target: Target, property: PropertyKey): boolean {

        let deleted = false;

        for (let handler of this.getHandler(target)) {

            deleted = (delete handler[property]) || deleted;
        }

        return deleted;

    }
}
