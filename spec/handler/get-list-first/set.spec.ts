import GetHandler from '../../../dist/proxy/handler/get-list-first';


it('enable console log', () => { spyOn(console, 'log').and.callThrough();});

type Type<Value = any> = {data:Value};

class Property {

    set data (value) {

    }
}


describe('single', () => {

    describe('class', () => {

        let property = new Property();

        let getter = new GetHandler([property]);
        let proxy = new Proxy<Type<string>>(<Type<string>>{}, getter);

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

        let getter = new GetHandler([plain]);
        let proxy = new Proxy<Type<string>>(<Type<string>>{}, getter);

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

        let property1 = new Property();
        let property2 = new Property();

        let getter = new GetHandler([property1, property2]);
        let proxy = new Proxy<Type<string>>(<Type<string>>{}, getter);

        // repeat test
        for(let i = 0; i < 5; i++) {

            it('check value', ()=>{

                expect<any>(proxy.data).toBe(undefined);

            });
        }
    });

    describe('class', () => {

        let property1 = { set data (value) {}};
        let property2 = { set data (value) {}};

        let getter = new GetHandler([property1, property2]);
        let proxy = new Proxy<Type<string>>(<Type<string>>{}, getter);

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

        let property1 = new Property();
        let property2 = {set value (value) {}};

        let getter = new GetHandler([property1, property2]);
        let proxy = <typeof property1 & typeof property2> new Proxy({}, getter);

        // repeat test
        for(let i = 0; i < 5; i++) {

            it('check value', ()=>{

                expect(proxy.data).toBe(undefined);
                expect(proxy.value).toBe(undefined);
            });
        }
    });

});
