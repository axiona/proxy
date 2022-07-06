import PreventExtensibleList from '../../dist/handler/prevent-extensible-list-all.js';

it('enable console log', () => { spyOn(console, 'log').and.callThrough();});

describe('direct set', () => {

    it('delete', ()=>{

        class Class  {
            data : string = 'class';
        }

        let object = {
            data : 'plain'
        };

        let class_ = new Class;

        let original = {
            data : 'original'
        };

        let getter = new PreventExtensibleList([object, class_]);
        let proxy = new Proxy(original, getter);

        expect(Object.isExtensible(proxy)).toBe(true);
        Object.preventExtensions(proxy);
        expect(Object.isExtensible(proxy)).toBe(false);
    });
});

describe('bind', () => {

    it('delete', ()=>{

        class Class  {
            data : string = 'class';
        }

        let object = {
            data : 'plain'
        };

        let class_ = new Class;

        let original = {
            data : 'original'
        };

        let getter = new PreventExtensibleList([object, class_]);
        let proxy = new Proxy(original, getter.bindTo({}));

        expect(Object.isExtensible(proxy)).toBe(true);
        Object.preventExtensions(proxy);
        expect(Object.isExtensible(proxy)).toBe(false);
    });
});


describe('check each', () => {

    class Class  {
        data : string = 'class';
    }

    let object = {
        data : 'plain'
    };

    let class_ = new Class;

    let original = {
        data : 'original'
    };

    let getter = new PreventExtensibleList([object, class_]);
    let proxy = new Proxy(original, getter.bindTo({}));

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
        data : string = 'class';
    }

    let object = {
        data : 'plain'
    };

    let class_ = new Class;

    let original = {
        data : 'original'
    };

    let getter = new PreventExtensibleList([object, class_]);
    let proxy = new Proxy(original, getter.bindTo({}));

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

