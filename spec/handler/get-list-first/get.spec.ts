import GetHandler from '../../../dist/handler/get-list-first.js';


it('enable console log', () => { spyOn(console, 'log').and.callThrough();});

type Type<Value = any> = {data:Value};

class Property {

    constructor(
        public _data : string = 'property'
    ) {
    }

    get data () {
        return this._data;
    }
}


describe('single', () => {

    describe('class', () => {

        const property = new Property('property 1');

        const getter = new GetHandler([property]);
        const proxy = new Proxy<Type<string>>(<Type<string>>{}, getter);

        // repeat test
        for(let i = 0; i < 5; i++) {

            it('check value', ()=>{

                expect(proxy.data).toBe('property 1');

            });
        }
    });

    describe('plain', () => {

        const plain = {
            get data () {return 'property 1';}
        };

        const getter = new GetHandler([plain]);
        const proxy = new Proxy<Type<string>>(<Type<string>>{}, getter);

        // repeat test
        for(let i = 0; i < 5; i++) {

            it('check value', ()=>{

                expect(proxy.data).toBe('property 1');

            });
        }
    });
});

describe('duplicate', () => {

    describe('class', () => {

        const property1 = new Property('property 1');
        const property2 = new Property('property 2');

        const getter = new GetHandler([property1, property2]);
        const proxy = new Proxy<Type<string>>(<Type<string>>{}, getter);

        // repeat test
        for(let i = 0; i < 5; i++) {

            it('check value', ()=>{

                expect(proxy.data).toBe('property 1');

            });
        }
    });

    describe('plain', () => {

        const property1 = { get data () {return 'property 1';}};
        const property2 = { get data () {return 'property 2';}};

        const getter = new GetHandler([property1, property2]);
        const proxy = new Proxy<Type<string>>(<Type<string>>{}, getter);

        // repeat test
        for(let i = 0; i < 5; i++) {

            it('check value', ()=>{

                expect(proxy.data).toBe('property 1');

            });
        }
    });

    describe('mixed', () => {

        const property1 = new Property('property 1');
        const property2 = {get value () {return 'property 2';}};

        const getter = new GetHandler([property1, property2]);
        const proxy = <typeof property1 & typeof property2> new Proxy({}, getter);

        // repeat test
        for(let i = 0; i < 5; i++) {

            it('check value', ()=>{

                expect(proxy.data).toBe('property 1');
                expect(proxy.value).toBe('property 2');

            });
        }
    });

});


