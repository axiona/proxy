import List from '../../dist/list.js';
import New from '@alirya/function/new.js';
import {WritableParameters} from '@alirya/object/property/boolean/writable.js';
import GetOwnPropertyDescriptorListAll from '../../dist/handler/get-own-property-descriptor-list-all.js';


it('enable console log', () => { spyOn(console, 'log').and.callThrough();});


describe('plain', function (){

    describe('simple', function (){

        const mutator = {value:1};
        const mixin = List([mutator], [New(GetOwnPropertyDescriptorListAll)]);

        it('test', () => {

            expect(WritableParameters(mixin, 'value')).toBeTrue();

        });
    });


    describe('recursive', function (){

        const mutator = {value:1};
        const mixin = List([mutator], [New(GetOwnPropertyDescriptorListAll)]);
        const mixin1 = List([mixin], [New(GetOwnPropertyDescriptorListAll)]);
        const mixin2 = List([mixin1], [New(GetOwnPropertyDescriptorListAll)]);

        it('test', () => {

            expect(WritableParameters(mixin2, 'value')).toBeTrue();

        });
    });
});


describe('plaint setter', function (){


    describe('simple', function (){

        const mutator = {
            set value(value) {}
        };
        const mixin = List([mutator], [New(GetOwnPropertyDescriptorListAll)]);

        it('test', () => {

            expect(WritableParameters(mixin, 'value')).toBeTrue();

        });
    });


    describe('recursive', function (){

        const mutator = {
            set value(value) {}
        };
        const mixin = List([mutator], [New(GetOwnPropertyDescriptorListAll)]);
        const mixin1 = List([mixin], [New(GetOwnPropertyDescriptorListAll)]);
        const mixin2 = List([mixin1], [New(GetOwnPropertyDescriptorListAll)]);

        it('test', () => {

            expect(WritableParameters(mixin2, 'value')).toBeTrue();

        });
    });
});

