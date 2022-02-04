import GetHandler from '../../../dist/proxy/handler/get-list-first';


it('enable console log', () => { spyOn(console, 'log').and.callThrough();});


class Property {

    constructor(
        public data : string = 'property'
    ) {
    }
}

let property1 = new Property('property 1');

describe('direct set', () => {

    let getter = new GetHandler([property1]);
    let proxy = <Property & Function>new Proxy(function (value : number){ return value + value;}, getter);

    it('check value', ()=>{
        expect(proxy.data).toBe('property 1');
    });

    it('check callback', ()=>{
        expect(proxy(5)).toBe(10);
    });
});
