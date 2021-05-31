class Virykle {
    constructor(selector, elementsCount, id) {
        this.selector = selector;
        this.elementsCount = elementsCount;         // kaitlentes pavirsiai / kaitvietes
        this.id = id;

        this.DOM = null;
        this.rangesDOM = null;
        this.allElementsDOM = null;     // []
        this.allSwitchesDOM = null;     // []
        this.price = 1000;
        this.proportion = {
            x: 1,
            y: 1
        }

        this.init();
    }

    init() {
        if (!this.isValidSelector() ||
            !this.findElementBySelector() ||
            !this.isValidElementsCount() ||
            !this.isValidID()) {
            return false;
        }

        this.calcProportions();
        this.render();
        this.addEvents();
    }

    isValidSelector() {
        if (typeof this.selector !== 'string' ||
            this.selector === '') {
            return false;
        }
        return true;
    }

    findElementBySelector() {
        // https://discord.com/channels/571393319201144843/833468929020133416/848961821809705041
        this.DOM = document.querySelector(this.selector);
        return !!this.DOM;
    }

    isValidElementsCount() {
        if (typeof this.elementsCount !== 'number' ||
            !isFinite(this.elementsCount) ||
            this.elementsCount <= 0 ||
            this.elementsCount % 1 !== 0) {
            return false;
        }
        return true;
    }

    isValidID() {
        if (typeof this.id !== 'string' ||
            this.id === '') {
            return false;
        }
        return true;
    }

    calcProportions() {
        this.proportion.x = Math.ceil(Math.sqrt(this.elementsCount));
        this.proportion.y = Math.ceil(this.elementsCount / this.proportion.x);
    }

    generateElements() {
        let HTML = '';

        for (let i = 0; i < this.elementsCount; i++) {
            HTML += '<div class="kaitlente"></div>';
        }

        return HTML;
    }

    generateSwitches() {
        let HTML = '';

        for (let i = 0; i < this.elementsCount; i++) {
            HTML += '<div class="jungiklis"></div>';
        }

        return HTML;
    }

    render() {
        const elementWidth = 120;
        const elementMargin = 10;
        const fullElementWidth = elementWidth + elementMargin * 2;
        const rangesBorderWidth = 1;
        const width = fullElementWidth * this.proportion.x + rangesBorderWidth * 2;

        // sukonstruojamas HTML
        const HTML = `<div id="${this.id}" class="virykle" style="width: ${width}px;">
                        <div class="kaitlentes">
                            ${this.generateElements()}
                        </div>
                        <div class="jungikliai">
                            ${this.generateSwitches()}
                        </div>
                    </div>`;

        // istatome i NARSYKLE
        this.DOM.insertAdjacentHTML('beforeend', HTML);

        // susirandame tai ka katik sukureme
        this.rangesDOM = this.DOM.querySelector('#' + this.id);
        this.allElementsDOM = this.rangesDOM.querySelectorAll('.kaitlente');
        this.allSwitchesDOM = this.rangesDOM.querySelectorAll('.jungiklis');
    }

    addEvents() {
        for (let i = 0; i < this.allSwitchesDOM.length; i++) {
            const elementDOM = this.allElementsDOM[i];
            const switchDOM = this.allSwitchesDOM[i];

            switchDOM.addEventListener('click', () => {
                switchDOM.classList.toggle('ijungtas');
                elementDOM.classList.toggle('ijungtas');
            })
        }
    }
}

export { Virykle }







/*

SKYLES  ISDESTYMAS
1       1x1
2       2x1
3       2x2
4       2x2
5       3x2
6       3x2
7       3x3
8       3x3
9       3x3
10      4x3
11      4x3
12      4x3
13      4x4
14      4x4
15      4x4
16      4x4


Pirmasis skaicius:

x = Math.ceil(Math.sqrt(n))
y = Math.ceil(n / x)


*/