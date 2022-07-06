import ApplyListFirst from '../../../dist/handler/apply-list-first.js';


it('enable console log', () => { spyOn(console, 'log').and.callThrough();});

type Type<Value = any> = {data:Value};

class Property {

    constructor(
        public data : string = 'property'
    ) {
    }
}

let property1 = function (... argument : any[]){ return ['property 1', ...argument];};
let property2 = function (... argument : any[]){ return ['property 2', ...argument];};

describe('direct set', () => {

    let getter = new ApplyListFirst([property1, property2], false);
    let proxy = <Function> new Proxy(function () {}, getter);

    it('check value', ()=>{

        expect(proxy()).toEqual(['property 1']);
        expect(proxy(1)).toEqual(['property 1', 1]);

    });
});

describe('bind set', () => {

    let handler : ProxyHandler<object> = {};
    let getter = new ApplyListFirst([property1, property2], false);
    getter.bindTo(handler);

    let proxy = <Function> new Proxy(()=>undefined, handler);

    it('check handler', ()=>{
        expect(handler.apply).toBeInstanceOf(Function);
    });

    it('check value', () => {

        expect(proxy()).toEqual(['property 1']);
        expect(proxy(1)).toEqual(['property 1', 1]);

    });

});

