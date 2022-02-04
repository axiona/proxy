import SetHandler from '../../dist/handler/set-list-all';
import Shuffle from '@alirya/array/shuffle-parameters';

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

    let property1 = new Property('property 1');
    let property2 = new Property('property 2');

    let handler = new SetHandler<Type<string>>([property1, property2]);
    let proxy = new Proxy<Type<string>>(<Type<string>>{}, handler);

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

    let handler = {};
    let property1 = new Property('property 1');
    let property2 = new Property('property 2');

    let setter = new SetHandler<Type<string>>([property1, property2]);
    setter.bindTo(handler);

    let proxy = new Proxy<Type<string>>(<Type<string>>{}, handler);

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

        let list = [
            plain,
            new Property,
            new Setter
        ];

        Shuffle(list);

        let getter = new SetHandler(list);
        let proxy = new Proxy<Type<string>>(<Type<string>>{}, getter);

        // retest
        for(let i = 0; i < 5; i++) {

            it('compare instance', ()=> {

                proxy.data = 'value' + i;

                for (let object of list) {

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
