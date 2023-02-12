import Merge from '@alirya/array/intersect.js';
import Exists from '@alirya/object/property/boolean/exists.js';

export default function MergeAnonymous<
    Target extends object,
    Handlers extends ProxyHandler<Target>[]
>(... handlers : Handlers) : Merge<Handlers>  {

    const result : Merge<Handlers> = <Merge<Handlers>>{};

    const properties = [
        'getPrototypeOf', 'setPrototypeOf', 'isExtensible', 'preventExtensions', 'getOwnPropertyDescriptor', 'has',
        'get', 'set', 'deleteProperty', 'defineProperty', 'enumerate', 'ownKeys', 'apply', 'construct',
    ];

    for (const handler of handlers) {

        for(const property of properties) {

            if(Exists.Parameters(handler, property)) {

                result[property] = (... argument : any[]) => handler[property](...argument);
            }

        }
    }

    return result;
}
