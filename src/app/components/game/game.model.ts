import { Review } from './review.model';
import { Developer } from './../developer/developer.model';
export class Game {

    public reviews:Review[]
    
    constructor(public title:string, public description:string, public developer: Developer){
        this.reviews = []
    }


}
