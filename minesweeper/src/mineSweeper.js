import { Field } from './Classes/field.class'

class mineSweeper {
    constructor(targetEl, defaultCol, defaultRow, defaultMineNum = 10) {
        this.targetEl = targetEl

        this.defaultCol = defaultCol

        this.defaultRow = defaultRow

        this.col = this.defaultCol

        this.row = this.defaultRow

        this.defaultMineNum = defaultMineNum

        this.mineNum = defaultMineNum

        
        this.newGame()
    }


    // SETTERS & GETTERS //

    // SET defaultCol
    set defaultCol(defaultCol) {
        this._defaultCol = defaultCol > 9 ? defaultCol : 9
    }

    // GET defaultCol
    get defaultCol() {
        return this._defaultCol
    }

    // SET col
    set col(newColValue) {
        this._col = newColValue > 9 ? newColValue : 9
    }

    // GET row
    get col() {
        return this._col
    }


    // SET defaultRow
    set defaultRow(defaultRow) {
        this._defaultRow = defaultRow > 9 ? defaultRow : 9
    }

    // GET defaultRow
    get defaultRow() {
        return this._defaultRow
    }


    // SET row
    set row(newRowValue) {
        this._row = newRowValue > 9 ? newRowValue: 9 
    }
    
    //GET row
    get row() {
        return this._row
    }


    // SET defaultMineNum
    set defaultMineNum(defaultMineNum) {
        const fieldCount = this.defaultRow * this.defaultCol
        this._defaultMineNum = Math.min(Math.max(1, defaultMineNum), fieldCount - 1)
    }

    // GET defaultMineNum
    get defaultMineNum() {
        return this._defaultMineNum
    
    
    }
    // SET mineNum
    set mineNum(newMineNum) {
        const fieldCount = this.row * this.col
        this._mineNum = Math.min(Math.max(1, newMineNum), fieldCount - 1)
    }

    // GET mineNum
    get mineNum() {
        return this._mineNum
    }


    // SET target
    set targetEl(newTarget) {
        const target = document.getElementById(newTarget)

        this._targetEl = target ? target : 'mine-zone'
    }
    // GET target
    get targetEl() {
        return this._targetEl
    }


    // SET isGameOver
    set isGameOver(newIsGameOver) {
        this._isGameOver = newIsGameOver
        this._mineZone.classList.toggle('game-over', this._isGameOver)
    }

    // GET isGameOver
    get isGameOver() {
        return this._isGameOver
    }


    // SET markedMines
    set markedMines(newMarkedMines) {
        this._markedMines = newMarkedMines
        this.mineCounterEl.textContent = (this.mineNum - this._markedMines).toString().padStart(3, '0')
    }
    
    // GET markedMines
    get markedMines() {
        return this._markedMines
    }


    // SET gameTime
    set gameTime(newGameTime) {
        this._gameTime = newGameTime
        this._timerEl.textContent = this._gameTime.toString().padStart(3, '0')
    }

    // GET gameTime
    get gameTime() {
        return this._gameTime
    }

    

    // MAP GENERATION //

    // Generate Map
    generateMap() {
        const rows = []
        for (let x = 0; x < this.row; x += 1) {
            const cols = []

            for (let y = 0; y < this.col; y += 1) {

                const field = new Field(x, y, this)
                cols.push(field)
            }
            rows.push(cols)
        }

        this._map = rows
    }

    // Generate Mines
    generateMines() {
        const mines = []
        // Create a temporary field
        const tempField = [].concat(... this._map)
    
        // Splice out the first clicked field
        const startFieldLoc = this.startField.x * this._row + this.startField.y
        tempField.splice(startFieldLoc, 1)
    
        for (let z = 0; z < this.mineNum; z += 1) {
            // Generate random location
            const rndLoc = Math.floor(Math.random() * tempField.length)
    
            // Splice random location from tempField
            const tempTarget = tempField[rndLoc]
            tempField.splice(rndLoc, 1)
    
            // Save mine location
            mines.push(this._map[tempTarget.x][tempTarget.y])
        }

        this._mines = mines
    }

    // Plant Mines
    plantMines() {
        this._mines.forEach((mine) => {
            this._map[mine.x][mine.y].hasMine = true
        })
    }

    // Count Neighbours
    countNeighbours() {
        this._mines.forEach((mine) => {
            const neighbours = this.getNeighbours(mine)
            neighbours.forEach((n) => n.neighbours += 1)
        })
    }

    // Get Neighbours
    getNeighbours(mine) {
        // Create bounds for iteration
        const startX  = Math.max(mine.x - 1, 0)
        const endX = Math.min(mine.x + 1, this._map.length - 1)
        const startY = Math.max(mine.y - 1, 0)
        const endY = Math.min(mine.y + 1, this._map[mine.x].length - 1)

        const neighbours = []
        // Check field's/mine's neighbours and push it to the "neighbours" array
        for (let x = startX; x <= endX; x += 1) {
            for (let y = startY; y <= endY; y += 1) {
                if (!this._map[x][y].hasMine) {
                    neighbours.push(this._map[x][y])
                }
            }
        }

        // Return array
        return neighbours
    }
    
    // Get Safe Map Locations
    getSafeFields() {
        const tempArray = this._map.map((row) => row.filter((field) => !field.hasMine))
        this._safeFields = [].concat(...tempArray)
    }

    // Initalize Map
    initailizeMap(field) {
        this.startField = field

        this.generateMines()

        this.plantMines()

        this.getSafeFields()

        this.countNeighbours()
    }

    // Check if every safe field has been revealed
    allSafeRevealed() {
        return this._safeFields.every((field) => field.isRevealed === true)
    }


    // DOM ELEMENTS //

    // Generate DOM
    generateGameDOM() {
        this._targetEl.innerHTML = ''

        // Create Game Container
        this._gameContEl = document.createElement('div')
        this._gameContEl.classList.add('game-container')
        
        // Create Top Bar
        this._gameTopBarEl = document.createElement('div')
        this._gameTopBarEl.classList.add('top-bar')

        this._gameTopBarEl.addEventListener('contextmenu', (e) => {
            e.preventDefault()
            this.showContextMenu(e)
        })
        
        // Create Timer Element
        this._timerEl = document.createElement('div')
        this._timerEl.classList.add('timer')
        
        // Create Top Bar Container
        const buttonContEl = document.createElement('div')
        buttonContEl.classList.add('btn-new-game')

        // Create Button Element
        this._startBtnEl = document.createElement('button')
        this._startBtnEl.classList.add('button')
        this._startBtnEl.classList.add('button--new-game')

        this._startBtnEl.addEventListener('click', (e) => { this.newGame() })

        buttonContEl.appendChild(this._startBtnEl)

        // Create Mine Counter Element
        this.mineCounterEl = document.createElement('div')
        this.mineCounterEl.classList.add('mine-counter')

        // Append Top Bar Element
        this._gameTopBarEl.appendChild(this.mineCounterEl)
        this._gameTopBarEl.appendChild(buttonContEl)
        this._gameTopBarEl.appendChild(this._timerEl)

        // Create Play Area Element
        const tableEl = document.createElement('table')
        tableEl.classList.add('mine-container')
        
        this._mineZone = document.createElement('tbody')
        this._mineZone.classList.add('mine-field')
        this._mineZone.addEventListener('mousedown', (e) => {
            if (this._contextMenu) {
                this._contextMenu.remove()
            }

            this.startCounter()
            this._startBtnEl.classList.add('mousedown')
        })

        window.addEventListener('click', (e) =>{
            if (this._contextMenu) {
                this._contextMenu.remove()
            }
        })

        this._mineZone.addEventListener('mouseup', (e) => { this._startBtnEl.classList.remove('mousedown') })

        this._mineZone.addEventListener('mouseleave', (e) => {
            if(this._startBtnEl.classList.contains('mousedown')) {
                this._startBtnEl.classList.remove('mousedown')
            }
        })

        this._mineZone.addEventListener('contextmenu', (e) => {
            this.startCounter()
            e.preventDefault()
        })

        tableEl.appendChild(this._mineZone)

        this._gameContEl.appendChild(this._gameTopBarEl)
        this._gameContEl.appendChild(tableEl)
        
        this._targetEl.appendChild(this._gameContEl)
   }

    generateField() {
        this._mineZone.innerHTML = ''
        this._mineZone.classList.add('mine-field')

        this._map.forEach((fields) => {
            const rowEl = document.createElement('tr')
            
            fields.forEach((field) => {
                rowEl.appendChild(field.el)
            })

            this._mineZone.appendChild(rowEl)
        });
    }

    click(field) {
        if (!field.hasMine) {
            // Floodfill
            if (field.neighbours === 0 ) { 
                const neighbours = this.getNeighbours(field)
                
                neighbours.map((el) => {
                    if (!el.isRevealed) {
                        el.isRevealed = true
                        this.click(el)
                    } else if (!el.isRevealed && el.neighbours > 0) {
                        el.isRevealed = true
                    }
                })
            }

            if (this.allSafeRevealed())
                this.gameOver(true)
            
        } else {
            field.isTriggered = true
            this.gameOver(false) 
        }
    }
    

    // GAME STATE  HANDLERS //
    gameOver(isVictory) {
        this.isGameOver = true

        if (isVictory) {
            this._startBtnEl.classList.add('win', isVictory)
        } else {
            this._startBtnEl.classList.add('lose', !isVictory)
        }


        this._mines.map((el) => {
            el.isRevealed = true
        })
        this.stopCounter()
    }

    newGame() {
        this.generateMap()
        this.generateGameDOM()
        this.generateField()
        this.stopCounter()
        
        this.startField = undefined
        this.isGameOver = false
        this.gameTime = 0
        this.markedMines = 0
    }

    changeOptions(newOptions) {
        if (newOptions.col)
            this.col = newOptions.col

        if (newOptions.row)
            this.row = newOptions.row

        if (newOptions.mineNum)
            this.mineNum = newOptions.mineNum
    }


    // COUNTER //
    stopCounter() {
        clearInterval(this._timer)
        this._timer = undefined
    }

    startCounter() {
        if (!this._timer && !this.isGameOver) {
            this._timer = setInterval(() => {
                if (this.gameTime < 999 ) {
                    this.gameTime += 1
                }   
            }, 1000)
        }
    }


    // CONTEXT MENU //

    // Create & Show Context Menu
    showContextMenu(e) {
        if (this._contextMenu) {
            this._contextMenu.remove()
        }

        // Create Context Menu
        this._contextMenu = document.createElement('div')
        this._contextMenu.classList.add('context-menu')
        this._contextMenu.style.left = `${e.layerX}px`
        this._contextMenu.style.top = `${e.layerY}px`
        
        // Create Menu List
        const groupEl = document.createElement('ul')

        // Create Menu Elements
        const optionEl = document.createElement('li')
        optionEl.classList.add('menu-el')
        optionEl.textContent = 'Options'

        const aboutEl = document.createElement('li')
        aboutEl.classList.add('menu-el')
        aboutEl.textContent = 'About'

        // Append Menu
        groupEl.appendChild(optionEl)
        groupEl.appendChild(aboutEl)
        this._contextMenu.appendChild(groupEl)
        // Append Context Menu to DOM
        this._gameTopBarEl.appendChild(this._contextMenu)

        // Add Event Listeners
        optionEl.addEventListener('click', (e) => {
            this._contextMenu.remove()
            this.showOptionsMenu()
        })

        aboutEl.addEventListener('click', (e) => {
            this._contextMenu.remove()
            this.showAboutMenu()
        })
    }

    // Create & Show Options Menu
    showOptionsMenu() {
        const menuEl = document.createElement('div')
        menuEl.classList.add('menu-page')
        menuEl.textContent = 'Options'

        const options = document.createElement('div')

        const rowsEl = document.createElement('div')
        const rowsLabelEl = document.createElement('label')
        rowsLabelEl.textContent = 'Rows:'

        const rowsInputEl = document.createElement('input')
        rowsInputEl.setAttribute('type', 'number')
        rowsInputEl.setAttribute('max', '100')
        rowsInputEl.setAttribute('value', this._row)

        rowsLabelEl.appendChild(rowsInputEl)
        rowsEl.appendChild(rowsLabelEl)

        const colsEl = document.createElement('div')
        const colsLabelEl = document.createElement('label')
        colsLabelEl.textContent = 'Columns:'

        const colsInputEl = document.createElement('input')
        colsInputEl.setAttribute('type', 'number')
        colsInputEl.setAttribute('max', '100')
        colsInputEl.setAttribute('value', this.col)

        colsLabelEl.appendChild(colsInputEl)
        colsEl.appendChild(colsLabelEl)

        const minesEl = document.createElement('div')
        const minesLabelEl = document.createElement('label')
        minesLabelEl.textContent = 'Mines:'

        const minesInputEl = document.createElement('input')
        minesInputEl.setAttribute('type', 'number')
        minesInputEl.setAttribute('max', '100')
        minesInputEl.setAttribute('value', this._mineNum)

        minesLabelEl.appendChild(minesInputEl)
        minesEl.appendChild(minesLabelEl)

        
        // Create Buttons
        const btnSave = document.createElement('button')
        btnSave.classList.add('button')
        btnSave.textContent = 'Save & Restart'
        
        const btnReset = document.createElement('button')
        btnReset.classList.add('button')
        btnReset.textContent = 'Reset & Restart'
        
        const btnCancel = document.createElement('button')
        btnCancel.classList.add('button')
        btnCancel.textContent = 'Cancel'
        
        // Append Options
        options.appendChild(rowsEl)
        options.appendChild(colsEl)
        options.appendChild(minesEl)
        
        menuEl.appendChild(options)
        menuEl.appendChild(btnSave)
        menuEl.appendChild(btnReset)
        menuEl.appendChild(btnCancel)


        // Add Event Listeners
        btnSave.addEventListener('click', () => {
            const col = rowsInputEl.value
            const row = colsInputEl.value
            const mineNum = minesInputEl.value

            this.changeOptions({col, row, mineNum})
            this.newGame()
            menuEl.remove()
        })

        btnReset.addEventListener('click', () => {
            this.changeOptions({
                col: this.defaultCol,
                row: this.defaultRow,
                mineNum: this.defaultMineNum
            })

            this.newGame()
            menuEl.remove()
        })

        btnCancel.addEventListener('click', () => {
            menuEl.remove()
        })

        this._gameContEl.appendChild(menuEl)
    }

    // Create & Show About Menu
    showAboutMenu() {
        const menuEl = document.createElement('div')
        menuEl.classList.add('menu-page')

        const aboutEl = document.createElement('ul')
        
        aboutEl.innerHTML = `
            <li>About</li>
            <li>You are presented with a board of squares. Some squares contain mines (bombs), others don't.</li>
            <li>If you click on a square containing a bomb, you lose. If you manage to click all the squares (without clicking on any bombs) you win.</li>
            <li>Clicking a square which doesn't have a bomb reveals the number of neighbouring squares containing bombs. Use this information plus some guess work to avoid the bombs.</li>
            <li>To open a square, point at the square and click on it. To mark a square you think is a bomb, point and right-click.</li>
        `

        const btnClose = document.createElement('button')
        btnClose.classList.add('button')
        btnClose.textContent = 'Close'

        btnClose.addEventListener('click', () => {
            menuEl.remove()
        })

        menuEl.appendChild(aboutEl)
        menuEl.appendChild(btnClose)
        this._gameContEl.appendChild(menuEl)
    }
}

export { mineSweeper }