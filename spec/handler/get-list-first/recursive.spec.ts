import GetHandler from '../../../dist/handler/get-list-first.js';
import GetOwnPropertyDescriptorListAll from '../../../dist/handler/get-own-property-descriptor-list-all.js';
import MergeAnonymous from '../../../dist/handler/merge-anonymous.js';
import GetPrototypeOfListMerge from '../../../dist/handler/prototype-of-list-merge.js';
import {ReadableParameters} from '@axiona/object/property/boolean/readable.js';
import {ExistsParameters} from '@axiona/object/property/boolean/exists.js';
import {PickParameters} from '@axiona/object/pick.js';


it('enable console log', () => { spyOn(console, 'log').and.callThrough();});

type Type<Value = any> = {data:Value};

const plain = {
    get data() {return 'plain';}
};

class Symbol_ implements Iterable<string> {

    constructor(
        public iterable : string[]
    ) {

    }

    * [Symbol.iterator](): IterableIterator<string> {

        yield * this.iterable;
    }
}

class Getter  {
    get data() {return 'getter';}
}

class Setter  {

    public value : any;

    set data(value) {

        this.value = value;
    }
}

class Property {

    constructor(
        public data : string = 'property'
    ) {

    }

}

class Method {

    data() : string {

        return 'method';
    }
}

const property1 = new Property('property 1');
const property2 = new Symbol_(['1', '2', '2', '3']);

describe('original handler', () => {

    const getter = new GetHandler([property1, property2]);
    const proxy = <Property & Symbol_> new Proxy({}, getter);

    const getter1 = new GetHandler([proxy]);
    const proxy1 = <Property & Symbol_> new Proxy({}, getter1);

    const getter2 = new GetHandler([proxy1]);
    const proxy2 = <Property & Symbol_> new Proxy({}, getter2);

    it('check value', ()=>{

        expect(proxy2.data).toBe('property 1');
        expect(ReadableParameters(proxy2, 'data')).toBe(true);
        expect(ExistsParameters(proxy2, 'data')).toBe(true);
        expect(PickParameters(proxy2, 'data')).toEqual({data:'property 1'});

        expect(typeof proxy2[Symbol.iterator]).toBe('function');

        const values : string[] = [];

        for (const string of proxy2) {

            values.push(string);
        }

        expect(values).toEqual(['1', '2', '2', '3']);

    });

});


describe('minimum working combination', () => {

    const getter = new GetHandler([property1, property2]);
    const prototypeOfListMerge = new GetPrototypeOfListMerge([property1, property2]);
    const descriptor = new GetOwnPropertyDescriptorListAll([property1, property2]);

    const proxy = <Property & Symbol_> new Proxy({}, MergeAnonymous(getter, descriptor,  prototypeOfListMerge));

    const getter1 = new GetHandler([proxy]);
    const prototypeOfListMerge1 = new GetPrototypeOfListMerge([proxy]);
    const descriptor1 = new GetOwnPropertyDescriptorListAll([proxy]);

    const proxy1 = <Property & Symbol_> new Proxy({}, MergeAnonymous(getter1, descriptor1,  prototypeOfListMerge1));

    const getter2 = new GetHandler([proxy1]);
    const proxy2 = <Property & Symbol_> new Proxy({}, getter2);

    it('check value', ()=>{

        let iterated  = false;

        let i = 0;

        for (const string of proxy2) {

            iterated = true;

            expect(proxy2.data).toBe('property 1');

            expect(property2.iterable[i]).toBe(string);

            i++;
        }

        expect(iterated).toBeTrue();

    });

});
