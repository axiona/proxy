import {Required} from 'utility-types';

/**
 * memoize {@template ObjectT} value from keys list
 */
export default class GetMemoizeKeys<
    Target extends object
> implements Required<ProxyHandler<Target>, 'get'>  {

    /**
     * mapping for memoized result
     */
    private memoize : Map<PropertyKey, any> = new Map<PropertyKey, any>();

    /**
     * @param keys
     * keys to be memoized
     */
    constructor(
        readonly keys : PropertyKey[]
    ) {

    }

    /**
     * reset memoize key
     *
     * @param key
     */
    reset(key : PropertyKey) {

        this.memoize.delete(key);
    }

    /**
     * reset all memoize
     */
    resets() {

        this.memoize.clear();
    }

    /**
     * set handler to other {@link ProxyHandler<Argument>}
     * @param handler
     */
    bindTo<Argument extends Target>(handler : ProxyHandler<Argument>) : Required<ProxyHandler<Argument>, 'get'> {

        handler.get = (target: Target, property: PropertyKey, receiver: any) => this.get(target, property, receiver);

        return handler as Required<ProxyHandler<Argument>, 'get'>;
    }

    get(target: Target, property: PropertyKey, receiver: any): any {

        if(this.keys.includes(property)) {

            if(this.memoize.has(property)) {

                return this.memoize.get(property);
            }

            const value = target[property];
            this.memoize.set(property, value);

            return value;
        }

        return target[property];
    }
}
