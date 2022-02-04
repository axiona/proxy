import GetListFirst from '../../dist/proxy/handler/get-list-first';
import List from '../../dist/proxy/list';

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

