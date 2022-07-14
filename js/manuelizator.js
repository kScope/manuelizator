import {Randomizer} from './randomizer.js';

export class Manuelizator {

    _canvas;
    _input;
    _template;
    _context;
    _uploadedImage;
    _randomizer = new Randomizer();

    attributi = [
        "potenziato",
        "migliorato",
        "espanso",
        "tirato a lucido",
        "implementato",
        "perfezionato",
        "aggiornato",
        "rivolto",
        "corretto",
        "compilato",
        "sviscerato",
        "centrifugato",
        "targettizato",
        "traghettato",
        "sketchato",
        "hackerato"
    ];


    initialize(options) {
        this._canvas = options.canvas;
        this._input = options.input;
        this._template = options.template;
        this._nuovaImmagine = options.nuovaImmagine;
        this._attributo = options.attributo;

        this._context = this._canvas.getContext('2d');
        this._uploadedImage = document.createElement('img');
        this._uploadedImage.style.display = 'none';

        this._input.addEventListener('change', x => {
            if (this._input.files.length > 0 && this._input.files[0].type.match('image.*')) {
                var fr = new FileReader();

                fr.onload = (e) => {
                    this._uploadedImage.src = e.target.result;
                };

                fr.readAsDataURL(this._input.files[0]);
            }
        });

        this._template.addEventListener('load', x => {
            // Copio l'immagine nel canvas
            this._canvas.width = this._uploadedImage.width;
            this._canvas.height = this._uploadedImage.height;

            this._context.drawImage(this._uploadedImage, 0, 0);

            // copio il template sopra il canvas
            const resizeFactor = this._uploadedImage.width / this._template.width;
            const resized = {
                width: this._template.width * resizeFactor,
                height: this._template.height * resizeFactor
            }
            this._context.drawImage(this._template, 0, this._uploadedImage.height - resized.height, resized.width, resized.height);

            document.getElementsByTagName('body')[0].classList.add('completed');
            this._attributo.innerText = this.attributi[Math.floor(Math.random() * this.attributi.length)].toUpperCase();
        });

        this._uploadedImage.addEventListener('load', x => {

            this._template.src = this._randomizer.getImage();

            
        });


        this._nuovaImmagine.addEventListener('click', x => {
            document.getElementsByTagName('body')[0].classList.remove('completed');
        });
    }

    upload() {
        this._canvas.setAttribute("width", imageSize.width);
        this._canvas.setAttribute("height", imageSize.height);

        this._canvas.drawImage(this._input, 0, 0);
    }


    download() {

        const link = document.createElement('a');
        link.download = 'manuello.png';
        link.href = this._canvas.toDataURL('image/png');
        link.click();
    }
}