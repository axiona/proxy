import GetListFirst from '../../../dist/proxy/handler/get-list-first';

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
        ancestor : string = 'ancestor',
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
        ancestor : string = 'ancestor',
        parent : string = 'parent',
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

        let property = new Child();

        let getter = new GetListFirst([property]);
        let proxy = new Proxy<Child>(<Child>{}, getter);

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


