import {List} from 'ts-toolbelt';

export default class MultiHandlers<
    Target extends object,
    Objects extends object[]
> {

    constructor(
        private handlers : Objects,
        private withTarget : boolean = true
    ) {
    }

    protected getHandler(target: Target) : Objects | List.Prepend<Objects, Target> {

        if(this.withTarget) {

            return [target, ...this.handlers] as List.Prepend<Objects, Target>;

        } else {

            return this.handlers;
        }
    }

}
