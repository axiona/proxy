import List from '../../dist/proxy/list';
import New from '@alirya/function/new';
import Writable from '../../../dist/property/boolean/writable-parameters';
import GetOwnPropertyDescriptorListAll from '../../dist/proxy/handler/get-own-property-descriptor-list-all';


it('enable console log', () => { spyOn(console, 'log').and.callThrough();});


describe('plain', function (){

    describe('simple', function (){

        let mutator = {value:1};
        let mixin = List([mutator], [New(GetOwnPropertyDescriptorListAll)]);

        it('test', () => {

            expect(Writable(mixin, 'value')).toBeTrue();

        });
    });


    describe('recursive', function (){

        let mutator = {value:1};
        let mixin = List([mutator], [New(GetOwnPropertyDescriptorListAll)]);
        let mixin1 = List([mixin], [New(GetOwnPropertyDescriptorListAll)]);
        let mixin2 = List([mixin1], [New(GetOwnPropertyDescriptorListAll)]);

        it('test', () => {

            expect(Writable(mixin2, 'value')).toBeTrue();

        });
    });
});


describe('plaint setter', function (){


    describe('simple', function (){

        let mutator = {
            set value(value) {}
        };
        let mixin = List([mutator], [New(GetOwnPropertyDescriptorListAll)]);

        it('test', () => {

            expect(Writable(mixin, 'value')).toBeTrue();

        });
    });


    describe('recursive', function (){

        let mutator = {
            set value(value) {}
        };
        let mixin = List([mutator], [New(GetOwnPropertyDescriptorListAll)]);
        let mixin1 = List([mixin], [New(GetOwnPropertyDescriptorListAll)]);
        let mixin2 = List([mixin1], [New(GetOwnPropertyDescriptorListAll)]);

        it('test', () => {

            expect(Writable(mixin2, 'value')).toBeTrue();

        });
    });
});

