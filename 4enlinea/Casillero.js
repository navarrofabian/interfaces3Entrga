class Casillero{
    constructor(){
       this.ocupado = false; 
       this.ficha;
    }

    estaOcupado(){
        return this.ocupado;
    }

    setOcupado(estado){
        this.ocupado = estado;
    }

    getFicha(){
        return this.ficha;
    }
    
    setFicha(ficha){
        this.ficha = ficha;
    }


}