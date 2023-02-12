import HasList from '../../dist/handler/has-list-any.js';

it('enable console log', () => { spyOn(console, 'log').and.callThrough();});

const Plain = {
    plain : 1
};

class Getter  {
    get getter() {return 'getter';}
}

class Setter  {

    set setter(value) {}
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
        const getter_ = new Getter();
        const setter = new Setter();
        const property = new Property();
        const method = new Method();
        const original = {};

        const handlers = [plain, getter_, setter, property, method];
        const getter = new HasList(handlers);
        const proxy = new Proxy(original, getter);

        expect('plain' in proxy).toBe(true);
        expect('getter' in proxy).toBe(true);
        expect('setter' in proxy).toBe(true);
        expect('property' in proxy).toBe(true);
        expect('method' in proxy).toBe(true);
    });
});

describe('bind', () => {

    it('test', ()=>{

        const plain = Plain;
        const getter_ = new Getter();
        const setter = new Setter();
        const property = new Property();
        const method = new Method();
        const original = {};

        const handlers = [plain, getter_, setter, property, method];
        const getter = new HasList(handlers);
        const proxy = new Proxy(original, getter.bindTo({}));

        expect('plain' in proxy).toBe(true);
        expect('getter' in proxy).toBe(true);
        expect('setter' in proxy).toBe(true);
        expect('property' in proxy).toBe(true);
        expect('method' in proxy).toBe(true);
    });
});

describe('non exists', () => {

    it('test', ()=>{

        const plain = Plain;
        const getter_ = new Getter();
        const setter = new Setter();
        const property = new Property();
        const method = new Method();
        const original = {};

        const handlers = [plain, getter_, setter, property, method];
        const getter = new HasList(handlers);
        const proxy = new Proxy(original, getter.bindTo({}));

        expect('nonExists' in proxy).toBe(false);
    });
});

