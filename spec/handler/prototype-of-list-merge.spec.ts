import GetPrototypeOfListMerge from '../../dist/handler/prototype-of-list-merge.js';

it('enable console log', () => { spyOn(console, 'log').and.callThrough();});

describe('direct set', () => {

    class Class  {
        data  = 'class';
    }

    class Getter  {
        get value () {return 'class';}
    }

    class Setter  {
        set value (data) {}
    }

    const class_ = new Class;
    const getter = new Getter;
    const setter = new Setter;

    it('descriptor', ()=>{


        const prototype = new GetPrototypeOfListMerge([getter, class_, setter]);
        const proxy = new Proxy({}, prototype);


        const value = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(proxy), 'value');

        if(value) {

            expect(typeof value.configurable).toBe('boolean');
            expect(typeof value.enumerable).toBe('boolean');
            expect(typeof value.get).toBe('function');
            expect(typeof value.set).toBe('function');

        } else {

            fail('descriptor should exists');
        }

        expect(Object.getOwnPropertyDescriptor(Object.getPrototypeOf(proxy), 'data')).toBeUndefined();
        expect(Object.getOwnPropertyDescriptor(Object.getPrototypeOf(class_), 'data')).toBeUndefined();
    });
});

