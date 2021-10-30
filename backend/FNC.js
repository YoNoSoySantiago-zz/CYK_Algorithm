class FNC{
    constructor(){
        this.grammar = {};
        this.firstVariable = '';
    }

    // Function that is in charge of adding a transition to the grammar
    // Giving as input a variable and a list of transitions.
    addTransition(variable, transitions){
        //this.grammar[variable] = transitions; #TODO: Check necessary conditions before adding
    }

    // Function that checks if the grammar is in Chomsky normal form.
    // Returns a boolean indicating whether the grammar is in Chomsky normal form or not
    checkChomskyNormalForm(){

    }

    // Function that is in charge of checking if a string is accepted by the corresponding grammar
    // Giving as input a string of n terminals
    // Returns a boolean indicating whether the string is accepted or not
    checkCadena(cadena){
        //dividir cadena en un arreglo de terminales
        let terminales = cadena.split('');
        //
    }

    // Function that is in charge of return all varibles that contains a especific transition
    // Giving as input a transition
    // Returns a list of variables
    getVariables(transition){
        //
    }
}