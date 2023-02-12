import OwnKeyList from '../../dist/handler/own-key-list-all.js';

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
    public property  = 'property';
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

        const plain = Plain;
        const plainSymbol = PlainSymbol;
        const getter_ = new Getter();
        const setter = new Setter();
        const property = new Property();
        const method = new Method();
        const symbols = new Symbols();
        const original = {};

        const handlers = [plain, getter_, setter, property, method, symbols, plainSymbol];
        const getter = new OwnKeyList(handlers);
        const proxy = new Proxy(original, getter);


        for(const property of ['plain','property']) {

            expect(Object.getOwnPropertyNames(proxy).includes(property)).toBe(true);
        }

        for(const property of [Symbol('plainSymbol')]) {

            expect(Object.getOwnPropertySymbols(proxy).map(sym=>sym.toString()).includes(property.toString())).toBe(true);
        }


    });
});
