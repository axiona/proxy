import Merge from '@alirya/array/intersect.js';
import MergeAnonymous from './handler/merge-anonymous.js';

export default function List<Objects extends object[]>(
    object : Objects,
    factories : ((argument:Objects)=>ProxyHandler<Partial<Merge<Objects>>>)[]
) : Merge<Objects> {

    let handlers : ProxyHandler<Partial<Merge<Objects>>>[] = [];

    for (let factory of factories) {

        handlers.push(factory(object));
    }

    let handler = MergeAnonymous(...handlers);

    return new Proxy({}, handler) as Merge<Objects>;
}
