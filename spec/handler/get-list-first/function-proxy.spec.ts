import GetHandler from '../../../dist/handler/get-list-first.js';


it('enable console log', () => { spyOn(console, 'log').and.callThrough();});


class Property {

    constructor(
        public data : string = 'property'
    ) {
    }
}

const property1 = new Property('property 1');

describe('direct set', () => {

    const getter = new GetHandler([property1]);
    const proxy = <Property & Function>new Proxy(function (value : number){ return value + value;}, getter);

    it('check value', ()=>{
        expect(proxy.data).toBe('property 1');
    });

    it('check callback', ()=>{
        expect(proxy(5)).toBe(10);
    });
});
