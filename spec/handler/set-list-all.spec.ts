import SetHandler from '../../dist/handler/set-list-all.js';
import {ShuffleParameters} from '@alirya/array/shuffle.js';

it('enable console log', () => { spyOn(console, 'log').and.callThrough();});


type Type<Value = any> = {data:Value};

const plain = {
    value : 'null',
    set data(value) {
        this.value = value;
    }
};

class Getter  {
    get data() {return 'getter';}
}

class Setter  {

    public value : any;

    set data(value) {

        this.value = value;
    }
}

class Property {

    constructor(
        public data : string = 'property'
    ) {
    }

}

class Method {

    data() : string {

        return 'method';
    }
}

describe('direct set', () => {

    const property1 = new Property('property 1');
    const property2 = new Property('property 2');

    const handler = new SetHandler<Type<string>>([property1, property2]);
    const proxy = new Proxy<Type<string>>(<Type<string>>{}, handler);

    it('check value', ()=>{

        expect(property1.data).toBe('property 1');
        expect(property2.data).toBe('property 2');

        for(let i = 0; i < 5; i++) {

            proxy.data = 'value' + i;
            expect(property1.data).toBe('value' + i);
            expect(property2.data).toBe('value' + i);

        }

    });
});

describe('bind set', () => {

    const handler = {};
    const property1 = new Property('property 1');
    const property2 = new Property('property 2');

    const setter = new SetHandler<Type<string>>([property1, property2]);
    setter.bindTo(handler);

    const proxy = new Proxy<Type<string>>(<Type<string>>{}, handler);

    for(let i = 0; i < 5; i++) {

        it('check & recheck value', () => {

            proxy.data = 'value' + i;
            expect(property1.data).toBe('value' + i);
            expect(property2.data).toBe('value' + i);

        });
    }

});


for(let i = 0; i < 5; i++) {

    describe('order', () => {

        const list = [
            plain,
            new Property,
            new Setter
        ];

        ShuffleParameters(list);

        const getter = new SetHandler(list);
        const proxy = new Proxy<Type<string>>(<Type<string>>{}, getter);

        // retest
        for(let i = 0; i < 5; i++) {

            it('compare instance', ()=> {

                proxy.data = 'value' + i;

                for (const object of list) {

                    if(object === plain) {

                        expect(plain.value).toBe('value' + i);

                    } else if(object instanceof Property) {

                        expect(object.data).toBe('value' + i);

                    } else if(object instanceof Setter) {

                        expect(object.value).toBe('value' + i);

                    } else {

                        fail('container list is not assigned ho handler');
                    }

                }
            });
        }
    });
}
