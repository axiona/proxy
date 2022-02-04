import GetMemoizeKeys from '../../../dist/proxy/handler/get-memoize-keys';

describe('class', () => {

    class Test {

        get data () : string {

            return Math.random().toString();
        }
    }

    let property = new Test();

    let getter = new GetMemoizeKeys(['data']);
    let proxy = new Proxy<Test>(property, getter);

    let value = proxy.data;

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

    let getter = new GetMemoizeKeys(['data']);
    let proxy = new Proxy<typeof plain>(plain, getter);

    let value = proxy.data;

    // repeat test
    for(let i = 0; i < 5; i++) {

        it('check value', ()=>{

            expect(proxy.data).toBe(value);

        });
    }
});

