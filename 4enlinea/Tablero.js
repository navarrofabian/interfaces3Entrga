class Tablero {
  constructor() {
    this.tablero = new Array(8);
    this.cantFilas = 8;
  }

  addFicha(columna, ficha) {
    let col = parseInt(columna);
    //dada una columna elegida, la recorro hasta encontrar un lugar libre
    for (let index = 0; index < this.cantFilas - 1; index++) {
      // si el casillero index esta libre y el que le sigue tambien avanzo
      if ((!this.tablero[index][col].estaOcupado() && !this.tablero[index + 1][col].estaOcupado())) {
          console.log('avanzar ' + index)
      }
      // si el que sigue esta ocupado y el que estoy esta libre asigno la ficha al que estoy (index)
      if(this.tablero[index + 1][col].estaOcupado() && !this.tablero[index][col].estaOcupado()){
        this.tablero[index][col].setOcupado(true);
        this.tablero[index][col].setFicha(ficha);
        let posX = col * 100;
        let posY = index * 100;   
        ficha.setPos((posX + 50), (posY + 50));
      }
      // si llego al final y esa posicion no esta ocupada
      if(index + 1 == this.cantFilas - 1 && !this.tablero[index + 1][col].estaOcupado()){
        this.tablero[index + 1][col].setOcupado(true);
        this.tablero[index + 1][col].setFicha(ficha);
        let posX = col * 100;
        let posY = (index + 1) * 100;   
        ficha.setPos((posX + 50), (posY + 50));
      }
    }

    this.drawTablero()
  }



  drawTablero() {
    //this.clearCanvas();
    for (let x = 0; x < this.tablero.length; x++) {
      for (let y = 0; y < this.tablero[x].length; y++) {
        console.log(this.tablero[x][y]);
        if (this.tablero[x][y].estaOcupado()) {
            this.tablero[x][y].draw();
        }
      }
    }
  }

  crearArray(canvas, ctx) {
    for (var i = 0; i < 8; i++) {
      this.tablero[i] = new Array(8);
    }
    this.inicializarTablero(canvas, ctx);
  }

  inicializarTablero(canvas, ctx) {
    for (let x = 0; x < this.tablero.length; x++) {
      for (let y = 0; y < this.tablero.length; y++) {
        let casillero = new Casillero(x, y, canvas, ctx);
        //casillero.draw();
        this.tablero[x][y] = casillero;
      }
    }
  }

  dibujarTablero(){
    for (let x = 0; x < this.tablero.length; x++) {
      for (let y = 0; y < this.tablero.length; y++) {
        this.tablero[x][y].draw();
      }
    }
  }
}
