class Field {
    constructor(x, y, parent) {

        this.el = document.createElement('td')

        this.hasMine = false

        this._isTriggered = false

        this._isRevealed = false

        this._isMarked = false
        
        this.x = x

        this.y = y
        
        this.parent = parent

        this.neighbours = 0

        this._text = ''

        
        this.el.addEventListener('click', this.clickEventHandler)

        this.el.addEventListener('contextmenu', this.contextMenuEventHandler)
    }


    // SETTERS & GETTERS //

    // SET Neighneighboursbours
    set neighbours(value) {
        this._text = value > 0 ? value : ''
        this._neighbours = value
    }

    // GET neighbours
    get neighbours() {
        return this._neighbours
    }


    // SET isRevealed
    set isRevealed(newIsRevealed) {
        this._isRevealed = newIsRevealed
        this.el.classList.add('revealed')

        if (this.isMarked) {
            this.isMarked = false;
        };

        if (this.hasMine) {
            this.el.classList.add('mine')
        } else {
            this.el.textContent = this._text
            this.el.classList.add(`color-${this.neighbours}`)
        }

        this.el.removeEventListener('click', this.clickEventHandler)
        this.el.removeEventListener('contextmenu', this.contextMenuEventHandler)
    }

    // GET isRevealed
    get isRevealed() {
        return this._isRevealed
    }

    
    // SET isTriggered
    set isTriggered(newIsTriggered) {
        this._isTriggered = newIsTriggered
        this.el.classList.add('triggered')
    }

    // GET isTriggered
    get isTriggered() {
        return this._isTriggered
    }


    // SET isMarked
    set isMarked(newIsMarked) {
        this._isMarked = newIsMarked
        this.el.classList.toggle('marked', this._isMarked)

        if (this._isMarked) {
            this.parent.markedMines += 1
        } else {
            this.parent.markedMines -= 1
        }
    }

    // GET isMarked
    get isMarked() {
        return this._isMarked
    }
    

    // EVENT HANDLERS //
    
    // Reveal the field
    clickEventHandler = (e) => {
        if (!this.parent.isGameOver) {
            
            if (!this.parent.startField) {
                this.parent.initailizeMap(this)
            }
            
            this.isRevealed = true
            this.parent.click(this)
        }
    }

    // Mark the field
    contextMenuEventHandler = (e) => {
        if (!this.parent.isGameOver) {
            if ((this.parent.mineNum - this.parent.markedMines) > 0) {
                if (!this.isMarked) {
                    this.isMarked = true 
                } else {
                    this.isMarked = false
                }
            } else if ((this.parent.mineNum - this.parent.markedMines) === 0) {
                if (this.isMarked) {
                    this.isMarked = false
                }
            }
        }
        
        e.preventDefault()
    }
}

export { Field }