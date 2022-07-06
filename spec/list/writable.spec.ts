import List from '../../dist/list.js';
import New from '@alirya/function/new.js';
import {WritableParameters} from '@alirya/object/property/boolean/writable.js';
import GetOwnPropertyDescriptorListAll from '../../dist/handler/get-own-property-descriptor-list-all.js';


it('enable console log', () => { spyOn(console, 'log').and.callThrough();});


describe('plain', function (){

    describe('simple', function (){

        let mutator = {value:1};
        let mixin = List([mutator], [New(GetOwnPropertyDescriptorListAll)]);

        it('test', () => {

            expect(WritableParameters(mixin, 'value')).toBeTrue();

        });
    });


    describe('recursive', function (){

        let mutator = {value:1};
        let mixin = List([mutator], [New(GetOwnPropertyDescriptorListAll)]);
        let mixin1 = List([mixin], [New(GetOwnPropertyDescriptorListAll)]);
        let mixin2 = List([mixin1], [New(GetOwnPropertyDescriptorListAll)]);

        it('test', () => {

            expect(WritableParameters(mixin2, 'value')).toBeTrue();

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

            expect(WritableParameters(mixin, 'value')).toBeTrue();

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

            expect(WritableParameters(mixin2, 'value')).toBeTrue();

        });
    });
});

