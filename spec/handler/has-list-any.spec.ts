import HasList from '@alirya/object/proxy/handler/has-list-any';

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
        let getter_ = new Getter();
        let setter = new Setter();
        let property = new Property();
        let method = new Method();
        let original = {};

        let handlers = [plain, getter_, setter, property, method];
        let getter = new HasList(handlers);
        let proxy = new Proxy(original, getter);

        expect('plain' in proxy).toBe(true);
        expect('getter' in proxy).toBe(true);
        expect('setter' in proxy).toBe(true);
        expect('property' in proxy).toBe(true);
        expect('method' in proxy).toBe(true);
    });
});

describe('bind', () => {

    it('test', ()=>{

        let plain = Plain;
        let getter_ = new Getter();
        let setter = new Setter();
        let property = new Property();
        let method = new Method();
        let original = {};

        let handlers = [plain, getter_, setter, property, method];
        let getter = new HasList(handlers);
        let proxy = new Proxy(original, getter.bindTo({}));

        expect('plain' in proxy).toBe(true);
        expect('getter' in proxy).toBe(true);
        expect('setter' in proxy).toBe(true);
        expect('property' in proxy).toBe(true);
        expect('method' in proxy).toBe(true);
    });
});

describe('non exists', () => {

    it('test', ()=>{

        let plain = Plain;
        let getter_ = new Getter();
        let setter = new Setter();
        let property = new Property();
        let method = new Method();
        let original = {};

        let handlers = [plain, getter_, setter, property, method];
        let getter = new HasList(handlers);
        let proxy = new Proxy(original, getter.bindTo({}));

        expect('nonExists' in proxy).toBe(false);
    });
});

