export class Randomizer {

    constructor() {
        this.immagini = [
            {name: 'letizia.png', poss: 5 },
            {name: 'the-boys.png', poss: 10 },
            {name: 'manuello-summer.png', poss: 60 },            
            {name: 'mauello-selfie.png', poss: 100 },
            
        ];
    }

    getImage() {
        const rand = Math.floor(Math.random() * 100); // Un numero da 0 a 100
        console.log(rand);
        return './resources/' + this.immagini.filter(x => x.poss > rand)[0].name;
    }
}