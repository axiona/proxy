import OwnKeyList from '@alirya/object/proxy/handler/own-key-list-all';

it('enable console log', () => { spyOn(console, 'log').and.callThrough();});


const Plain = {
    plain : 1
};

const PlainSymbol  =  {

    [Symbol('plainSymbol')] : () => {}
};

class Getter  {
    get getter() {return 'getter';}
}

class Setter  {

    set setter(value) {}
}

class Symbols  {

    [Symbol('symbols')]() {

    }
}

class Property {
    public property : string = 'property';
    constructor(

    ) {
    }
}

class Method {

    method() : string {
        return 'method';
    }
}


describe('direct set', () => {

    it('test', ()=>{

        let plain = Plain;
        let plainSymbol = PlainSymbol;
        let getter_ = new Getter();
        let setter = new Setter();
        let property = new Property();
        let method = new Method();
        let symbols = new Symbols();
        let original = {};

        let handlers = [plain, getter_, setter, property, method, symbols, plainSymbol];
        let getter = new OwnKeyList(handlers);
        let proxy = new Proxy(original, getter);


        for(let property of ['plain','property']) {

            expect(Object.getOwnPropertyNames(proxy).includes(property)).toBe(true);
        }

        for(let property of [Symbol('plainSymbol')]) {

            expect(Object.getOwnPropertySymbols(proxy).map(sym=>sym.toString()).includes(property.toString())).toBe(true);
        }


    });
});
