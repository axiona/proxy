import GetListFirst from '../../dist/handler/get-list-first.js';
import List from '../../dist/list.js';

export class Parent {

    constructor(
        public entity : {parent:string}
    ) {

    }

    get parent () : string {

        return this.entity.parent;
    }

}

export default class Children extends Parent {

    constructor(
        public entity : {parent:string, children:string}
    ) {
        super(entity);
    }

    get children () : string {

        return this.entity.children;
    }
}


describe('simple', function (){

    const merges = List([
        new Children({parent:'parent', children:'children'}),
    ], [
        (objects)=>new GetListFirst(objects)
    ]);


    it('test', () => {

        expect(merges.children).toBe('children');
        expect(merges.parent).toBe('parent');

    });
});

