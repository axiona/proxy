import GetListFirst from '../../../dist/handler/get-list-first.js';

it('enable console log', () => { spyOn(console, 'log').and.callThrough();});

type Type<Value = any> = {data:Value};

class Ancestor {

    constructor(
        public _ancestor : string = 'ancestor'
    ) {
    }

    get ancestor () : string {

        return this._ancestor;
    }

    set ancestor (ancestor : string) {

        this._ancestor = ancestor;
    }

}

class Parent extends Ancestor {

    constructor(
        ancestor  = 'ancestor',
        public _parent : string = 'parent'
    ) {
        super(ancestor);
    }

    get parent () : string {

        return this._parent;
    }

    set parent (parent : string) {

        this._parent = parent;
    }
}

class Child extends Parent {

    constructor(
        ancestor  = 'ancestor',
        parent  = 'parent',
        public _children : string = 'children'
    ) {
        super(ancestor, parent);
    }

    get children () : string {

        return this._children;
    }

    set children (children : string) {

        this._children = children;
    }
}


describe('single', () => {

    describe('class', () => {

        const property = new Child();

        const getter = new GetListFirst([property]);
        const proxy = new Proxy<Child>(<Child>{}, getter);

        // repeat test
        for(let i = 0; i < 5; i++) {

            it('check value', ()=>{

                expect(proxy.ancestor).toBe('ancestor');
                expect(proxy.parent).toBe('parent');
                expect(proxy.children).toBe('children');

            });
        }
    });

});


