import GetHandler from '../../../dist/handler/get-list-first.js';


it('enable console log', () => { spyOn(console, 'log').and.callThrough();});

type Type<Value = any> = {data:Value};

class Property {

    set data (value) {

    }
}


describe('single', () => {

    describe('class', () => {

        const property = new Property();

        const getter = new GetHandler([property]);
        const proxy = new Proxy<Type<string>>(<Type<string>>{}, getter);

        // repeat test
        for(let i = 0; i < 5; i++) {

            it('check value', ()=>{

                expect<any>(proxy.data).toBe(undefined);

            });
        }
    });

    describe('plain', () => {

        const plain = {
            set data (value) {}
        };

        const getter = new GetHandler([plain]);
        const proxy = new Proxy<Type<string>>(<Type<string>>{}, getter);

        // repeat test
        for(let i = 0; i < 5; i++) {

            it('check value', ()=>{

                expect<any>(proxy.data).toBe(undefined);

            });
        }
    });
});

describe('duplicate', () => {

    describe('class', () => {

        const property1 = new Property();
        const property2 = new Property();

        const getter = new GetHandler([property1, property2]);
        const proxy = new Proxy<Type<string>>(<Type<string>>{}, getter);

        // repeat test
        for(let i = 0; i < 5; i++) {

            it('check value', ()=>{

                expect<any>(proxy.data).toBe(undefined);

            });
        }
    });

    describe('class', () => {

        const property1 = { set data (value) {}};
        const property2 = { set data (value) {}};

        const getter = new GetHandler([property1, property2]);
        const proxy = new Proxy<Type<string>>(<Type<string>>{}, getter);

        // repeat test
        for(let i = 0; i < 5; i++) {

            it('check value', ()=>{

                expect<any>(proxy.data).toBe(undefined);
            });
        }
    });
});


describe('multi', () => {

    describe('direct set', () => {

        const property1 = new Property();
        const property2 = {set value (value) {}};

        const getter = new GetHandler([property1, property2]);
        const proxy = <typeof property1 & typeof property2> new Proxy({}, getter);

        // repeat test
        for(let i = 0; i < 5; i++) {

            it('check value', ()=>{

                expect(proxy.data).toBe(undefined);
                expect(proxy.value).toBe(undefined);
            });
        }
    });

});
