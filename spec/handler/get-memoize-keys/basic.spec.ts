import GetMemoizeKeys from '../../../dist/handler/get-memoize-keys.js';

describe('class', () => {

    class Test {

        get data () : string {

            return Math.random().toString();
        }
    }

    const property = new Test();

    const getter = new GetMemoizeKeys(['data']);
    const proxy = new Proxy<Test>(property, getter);

    const value = proxy.data;

    // repeat test
    for(let i = 0; i < 5; i++) {

        it('check value', ()=>{

            expect(proxy.data).toBe(value);

        });
    }
});

describe('plain', () => {

    const plain = {
        get data () {return Math.random().toString();}
    };

    const getter = new GetMemoizeKeys(['data']);
    const proxy = new Proxy<typeof plain>(plain, getter);

    const value = proxy.data;

    // repeat test
    for(let i = 0; i < 5; i++) {

        it('check value', ()=>{

            expect(proxy.data).toBe(value);

        });
    }
});

