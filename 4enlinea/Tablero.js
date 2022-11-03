class Tablero {
  constructor() {
    this.tablero = new Array(8);
    this.cantFilas = 8;
  }

  addFicha(columna, ficha) {

    let fil = this.cantFilas - 1;
    let col = parseInt(columna)
    
    //console.log(this.tablero[fil][col])
    //console.log('fila: '+ fil, 'columna: '+ col, 'ficha: '+  f);
    for (let index = 0; index < this.cantFilas; index++) {
      if (this.tablero[index][col].estaOcupado()){
        if (index == 0) {
          return;
        }
        this.tablero[index-1][col].setOcupado(true);
        this.tablero[index-1][col].setFicha(ficha)
        let posX = col * 100;
        let posY = index * 100;   
        ficha.setPos(posX, posY);
      } else {
        if (index = this.cantFilas - 1) {
          this.tablero[index][col].setOcupado(true);
          this.tablero[index][col].setFicha(ficha)
          let posX = col * 100;
          let posY = index * 100;    
          ficha.setPos(posX, posY);
        }
      }  
    }
    
  }

  drawTablero() {
    //this.clearCanvas();
    for (let x = 0; x < this.tablero.length; x++) {
      for (let y = 0; y < this.tablero[x].length; y++) {
        let casillero = this.tablero[x][y];
        if(casillero.estaOcupado()){
          let ficha = casillero.getFicha();
            console.log(ficha);
            ficha.draw();
        }
      }
    }
  }


  crearArray() {
    for (var i = 0; i < 8; i++) {
      this.tablero[i] = new Array(8);
    }
   this.inicializarTablero();
  }

  inicializarTablero() {
    for (let x = 0; x < this.tablero.length; x++) {
        for ( let y = 0; y < this.tablero.length; y++) {
            this.tablero[x][y] = new Casillero();
        }
    }
  }


}
