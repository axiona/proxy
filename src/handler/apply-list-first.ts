import {Required} from 'utility-types';
import IsFunction from '@alirya/function/boolean/function';
import MultiHandlers from './multi-handlers';

export default class ApplyListFirst<
    Target extends object,
    Objects extends object[]
> extends MultiHandlers<Target, Objects> implements Required<ProxyHandler<Target>, 'apply'> {

    private callback ?: Function|null;


    reset() {

        this.callback = undefined;
    }

    bindTo<Argument extends Target>(handler : ProxyHandler<Argument>) : Required<ProxyHandler<Argument>, 'apply'> {

        handler.apply = (target: Target, thisArg: any, argArray ?: any) => this.apply(target, thisArg, argArray);

        return handler as Required<ProxyHandler<Argument>, 'apply'>;
    }

    apply(target: Target, thisArg: any, argArray ?: any) : any {

        if(this.callback !== undefined) {

            if(this.callback) {

                return this.callback(...argArray);

            } else {

                throw new Error('Callable is not found');
            }
        }

        this.callback = null;

        for (let handler of this.getHandler(target)) {

            if(IsFunction(handler)) {

                this.callback = (... args : any[]) => (<Function>handler)(...args);
                break;
            }
        }

        return this.apply(target, thisArg, argArray);
    }

}
