import GetHandler from '@alirya/object/proxy/handler/get-list-first';


it('enable console log', () => { spyOn(console, 'log').and.callThrough();});

type Type<Value = any> = {data:Value};

class Property {

    constructor(
        public data : string = 'property'
    ) {
    }
}

let property1 = new Property('property 1');
let property2 = new Property('property 2');

describe('direct set', () => {

    let getter = new GetHandler([property1, property2]);
    let proxy = new Proxy<Type<string>>(<Type<string>>{}, getter);

    it('check value', ()=>{

        expect(proxy.data).toBe('property 1');

    });
});

describe('bind set', () => {

    let handler : ProxyHandler<object> = {};
    let getter = new GetHandler([property1, property2]);
    getter.bindTo(handler);

    let proxy = new Proxy<Type<string>>(<Type<string>>{}, handler);

    it('check handler', ()=>{
        expect(handler.get).toBeInstanceOf(Function);
    });

    it('check value', () => {

        expect(proxy.data).toBe('property 1');

    });

});

