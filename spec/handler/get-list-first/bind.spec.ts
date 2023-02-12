import GetHandler from '../../../dist/handler/get-list-first.js';


it('enable console log', () => { spyOn(console, 'log').and.callThrough();});

type Type<Value = any> = {data:Value};

class Property {

    constructor(
        public data : string = 'property'
    ) {
    }
}

const property1 = new Property('property 1');
const property2 = new Property('property 2');

describe('direct set', () => {

    const getter = new GetHandler([property1, property2]);
    const proxy = new Proxy<Type<string>>(<Type<string>>{}, getter);

    it('check value', ()=>{

        expect(proxy.data).toBe('property 1');

    });
});

describe('bind set', () => {

    const handler : ProxyHandler<object> = {};
    const getter = new GetHandler([property1, property2]);
    getter.bindTo(handler);

    const proxy = new Proxy<Type<string>>(<Type<string>>{}, handler);

    it('check handler', ()=>{
        expect(handler.get).toBeInstanceOf(Function);
    });

    it('check value', () => {

        expect(proxy.data).toBe('property 1');

    });

});

