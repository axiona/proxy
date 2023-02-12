import PreventExtensibleList from '../../dist/handler/prevent-extensible-list-all.js';

it('enable console log', () => { spyOn(console, 'log').and.callThrough();});

describe('direct set', () => {

    it('delete', ()=>{

        class Class  {
            data  = 'class';
        }

        const object = {
            data : 'plain'
        };

        const class_ = new Class;

        const original = {
            data : 'original'
        };

        const getter = new PreventExtensibleList([object, class_]);
        const proxy = new Proxy(original, getter);

        expect(Object.isExtensible(proxy)).toBe(true);
        Object.preventExtensions(proxy);
        expect(Object.isExtensible(proxy)).toBe(false);
    });
});

describe('bind', () => {

    it('delete', ()=>{

        class Class  {
            data  = 'class';
        }

        const object = {
            data : 'plain'
        };

        const class_ = new Class;

        const original = {
            data : 'original'
        };

        const getter = new PreventExtensibleList([object, class_]);
        const proxy = new Proxy(original, getter.bindTo({}));

        expect(Object.isExtensible(proxy)).toBe(true);
        Object.preventExtensions(proxy);
        expect(Object.isExtensible(proxy)).toBe(false);
    });
});


describe('check each', () => {

    class Class  {
        data  = 'class';
    }

    const object = {
        data : 'plain'
    };

    const class_ = new Class;

    const original = {
        data : 'original'
    };

    const getter = new PreventExtensibleList([object, class_]);
    const proxy = new Proxy(original, getter.bindTo({}));

    Object.preventExtensions(proxy);

    it('class', ()=>{

        try {
            class_['value'] = 1;
            fail('error should be thrown');

        } catch (e) {

            expect(e).toBeInstanceOf(Error);
        }
    });

    it('original', ()=>{

        try {
            original['value'] = 1;
            fail('error should be thrown');

        } catch (e) {

            expect(e).toBeInstanceOf(Error);
        }
    });

    it('object', ()=>{

        try {
            object['value'] = 1;
            fail('error should be thrown');

        } catch (e) {

            expect(e).toBeInstanceOf(Error);
        }
    });
});

describe('check proxy', () => {

    class Class  {
        data  = 'class';
    }

    const object = {
        data : 'plain'
    };

    const class_ = new Class;

    const original = {
        data : 'original'
    };

    const getter = new PreventExtensibleList([object, class_]);
    const proxy = new Proxy(original, getter.bindTo({}));

    Object.preventExtensions(proxy);

    it('proxy', ()=>{

        try {
            proxy['value'] = 1;
            fail('error should be thrown');

        } catch (e) {

            expect(e).toBeInstanceOf(Error);
        }
    });
});

