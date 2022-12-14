class Tablero {
  constructor(tamanioTablero, xEnLinea) {
    this.tablero = new Array(8);
    this.xEnLinea = xEnLinea; // pasar por constructor
    this.cantFilas = tamanioTablero;
  }

  addFicha(columna, ficha) {
    let col = parseInt(columna);
    //dada una columna elegida, la recorro hasta encontrar un lugar libre
    for (let index = 0; index < this.cantFilas - 1; index++) {
      // si el casillero index esta libre y el que le sigue tambien avanzo
      if (
        !this.tablero[index][col].estaOcupado() &&
        !this.tablero[index + 1][col].estaOcupado()
      ) {
        console.log("avanzar " + index);
      }
      // si el que sigue esta ocupado y el que estoy esta libre asigno la ficha al que estoy (index)
      if (
        this.tablero[index + 1][col].estaOcupado() &&
        !this.tablero[index][col].estaOcupado()
      ) {
        this.tablero[index][col].setOcupado(true);
        this.tablero[index][col].setFicha(ficha);
        let posX = col * 100;
        let posY = index * 100;
        ficha.setPos(posX + 50, posY + 50);
      }
      // si llego al final y esa posicion no esta ocupada
      if (
        index + 1 == this.cantFilas - 1 &&
        !this.tablero[index + 1][col].estaOcupado()
      ) {
        this.tablero[index + 1][col].setOcupado(true);
        this.tablero[index + 1][col].setFicha(ficha);
        let posX = col * 100;
        let posY = (index + 1) * 100;
        ficha.setPos(posX + 50, posY + 50);
      }
    }

    this.drawTablero();
  }

  chequearGanador(ficha) {
    if (this.ganoVertical(ficha)) {
      return true;
    }

    if (this.ganoHorizontal(ficha)) {
      return true;
    }
    if (this.ganoDiagonal(ficha)) {
      return true;
    } else {
      return false;
    }
  }

  ganoVertical(ficha) {
    let col = parseInt(ficha.getPosX() / 100);
    let fil = parseInt(ficha.getPosY() / 100);
   // console.log(col + " " + fil);
    let jugador = ficha.getJugador();

    if (fil + this.xEnLinea <= this.cantFilas) {
      for (let i = 0; i < this.xEnLinea; i++) {
        if (!this.tablero[fil + 1][col].jugadorIgual(jugador)) {
         // console.log("no son todas las fichas iguales");
          return false;
        }
      }
      //console.log("true");
      return true;
    }
    //console.log("false faltan filas");
    return false;
  }

  ganoHorizontal(ficha) {
    //let col = parseInt(ficha.getPosX() / 100);
    let fil = parseInt(ficha.getPosY() / 100);
    let jugador = ficha.getJugador();
    let estado = false;

    for (let i = 0; i < this.cantFilas - this.xEnLinea; i++) {
      let j = 0;
      while (
        this.tablero[fil][i + j].getFicha() != null &&
        this.tablero[fil][i + j].jugadorIgual(jugador)
      ) {
        j++;
        //console.log(j);
        //console.log(i);
        if (j == this.xEnLinea) {
          estado = true;
          console.log(estado);
        }
      }
    }
    //console.log("return " + estado);
    return estado;
  }

  ganoDiagonal(ficha) {
    let col = parseInt(ficha.getPosX() / 100);
    let fil = parseInt(ficha.getPosY() / 100);
    let jugador = ficha.getJugador();


    let i = col - this.xEnLinea ;
    let j = fil - this.xEnLinea;

     while (i < col && j < fil) {
      i++;
      j++;
      console.log('fil: '+ j + ' col: '+ i );
      let index = 0;
      console.log('index:'+ index);
      while (
        i >= 0 &&
        j >= 0 &&
        index < this.xEnLinea &&
        j + index < this.cantFilas -1 &&
        i + index < this.cantFilas -1 &&
        this.tablero[j + index][i + index].noEstaVacio()&&
        this.tablero[j + index][i + index].jugadorIgual(jugador) 
      ){
        index++;
        if (index == this.xEnLinea){
          console.log('hay 4 en diagonal')
          return true;
        }
      }
     }
     console.log('no hay 4 en diagonal')

     i = col + this.xEnLinea;
     j = fil - this.xEnLinea;

     while (i > col && j < fil) {
      i--;
      j++;
      console.log('fil: '+ j + ' col: '+ i );
      let index = 0;
      console.log('index:'+ index);
      while (
        i < this.cantFilas &&
        j >= 0 &&
        index < this.xEnLinea &&
        j + index < this.cantFilas -1 &&
        i - index > 0 &&
        this.tablero[j + index][i - index].noEstaVacio()&&
        this.tablero[j + index][i - index].jugadorIgual(jugador) 
      ){
        index++;
        if (index == this.xEnLinea){
          console.log('hay 4 en anti-diagonal')
          return true;
        }
      }
     }


     console.log('false no hay 4 en anti-diagonal')
     return false;
     


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

  dibujarTablero() {
    for (let x = 0; x < this.tablero.length; x++) {
      for (let y = 0; y < this.tablero.length; y++) {
        this.tablero[x][y].draw();
      }
    }
  }
}


/*
    for (let i = col - this.xEnLinea + 1; i < col; i++) {
    for (let j = fil - this.xEnLinea + 1; j < fil; j++) {
    let index = 0;
        while (
          i >= 0 &&
          j >= 0 &&
          j + index < this.cantFilas -1 &&
          i + index < this.cantFilas -1 &&
          this.tablero[j + index][i + index].noEstaVacio()&&
          this.tablero[i + index][j + index].jugadorIgual(jugador) &&
          index < this.xEnLinea 
        ) {
          index++;
          console.log('index diagonal: ' + index)
          if (index == this.xEnLinea) {
            console.log('true diagonal');
            return true;
            
          }
        }
      }
    }
    console.log('false diagonal');
    return false;
    
*/