import {UniqueParameters} from '@axiona/array/unique.js';
import {Required} from 'utility-types';
import MultiHandlers from './multi-handlers.js';

export default class OwnKeyListAll<
    Target extends object,
    Objects extends object[]
> extends MultiHandlers<Target, Objects> implements Required<ProxyHandler<Target>, 'ownKeys'> {

    private keys ?: (string|symbol)[];

    reset() {

        this.keys = undefined;
    }

    bindTo<Argument extends Target>(handler : ProxyHandler<Argument>) : Required<ProxyHandler<Argument>, 'ownKeys'>  {

        handler.ownKeys = (target: Target) => this.ownKeys(target);

        return <Required<ProxyHandler<Argument>, 'ownKeys'>> handler;
    }

    ownKeys(target: Target): (string|symbol)[] {

        if(this.keys) {

            return this.keys;
        }

        this.keys = [];

        for(const object of this.getHandler(target)) {

            this.keys.push(...Object.getOwnPropertySymbols(object));
            this.keys.push(...Object.getOwnPropertyNames(object));
        }
        this.keys = UniqueParameters(this.keys);

        return this.keys;
    }
}
