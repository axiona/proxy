import {Required} from 'utility-types';
import MultiHandlers from './multi-handlers';

export default class IsExtensibleListAll<
    Target extends object,
    Objects extends object[]
> extends MultiHandlers<Target, Objects> implements Required<ProxyHandler<Target>, 'isExtensible'>  {

    public extensible ?: boolean;

    reset() {

        this.extensible = undefined;
    }

    bindTo<Argument extends Target>(handler : ProxyHandler<Argument>) : Required<ProxyHandler<Argument>, 'isExtensible'> {

        handler.isExtensible = (target: Target) => this.isExtensible(target);

        return handler as Required<ProxyHandler<Argument>, 'isExtensible'>;
    }

    isExtensible(target: Target): boolean {

        if(this.extensible !== undefined) {

            return this.extensible;
        }

        this.extensible = true;

        for(let object of this.getHandler(target)) {

            this.extensible = Object.isExtensible(object) && this.extensible;
        }

        return this.extensible;
    }
}
