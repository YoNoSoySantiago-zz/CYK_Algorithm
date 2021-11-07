class Controller{ 
    constructor(){
       this.fnc=new FNC();
    }

    validateGrammar(grammar,cadena){
        var belongs=false;
        var validateFormat=validateFormat(grammar);
        if(validateFormat){
            createFNC(grammar);
            var isChomskyNormalForm=this.fnc.checkChomskyNormalForm();
            if(isChomskyNormalForm){
                belongs=this.fnc.checkCadena(cadena);             
            }
        }
        return belongs;
    }

    createFNC(grammar){
        var linesGrammar = grammar.split('\n');
        for(var s=0;s<linesGrammar.length;s++){
            var separate=linesGrammar[s].split("->");
            fnc.addTransition(separate[0],separate[1]);
        }
    }
    validateFormat(grammar){
        var linesGrammar = grammar.split('\n');
        var format=false;
        for(var s=0;s<linesGrammar.length && format==false;s++){
           var separate=linesGrammar[s].split("->");
           if(separate[0].length==1){
               var transitions=separate[1].split("|");
               for(var m=0;m<transitions.length && format==false;m++){
                   if(transitions[m].includes(" "));
                   format=true;
               }
           }
        }
        if(!format){
            return true;
        }else{
            return false;
            }
    }

}
class FNC{
    constructor(){
        this.grammar = {};
        //grammar: represent the grammar in Chomsky normal form, it is a dictionary with the key being the variable and the value being a list of transitions
        this.grammar = {};
        //firstVariable: represent the first variable of the grammar

        this.firstVariable = '';
    }

    // Function that is in charge of adding a transition to the grammar
    // Giving as input a variable and a list of transitions.
    addTransition(variable, transitions){
        this.grammar[variable] = transitions; 
    }

    // Function that checks if the grammar is in Chomsky normal form.
    // Returns a boolean indicating whether the grammar is in Chomsky normal form or not
    checkChomskyNormalForm(){

        let isChomskyNormalForm = true;
        for(let variable in this.grammar){
            let transitions = this.grammar[variable];
            for(let i = 0; i < transitions.length && isChomskyNormalForm; i++){
                let currentTransition = transitions[i];
                let currentVariables = this.getVariables(currentTransition);
                if(currentVariables.length > 2){
                    isChomskyNormalForm = false;
                }
            }
            if(!isChomskyNormalForm){
                break;
            }
        }
        return isChomskyNormalForm;
    }

    // Function that is in charge of checking if a string is accepted by the corresponding grammar
    // Giving as input a string of n terminals
    // Returns a boolean indicating whether the string is accepted or not
    checkCadena(cadena){
        //divide the string in tokens
        let terminales = cadena.split('');

        let matrix = [];
        let firstsVariables = [];
        //Initilization
        for(let i = 0; i < terminales.length; i++){
            let token = terminales[i];
            let currentVariables = this.getVariables(token);
            firstsVariables[i] = currentVariables;
        }
        matrix[0] = firstsVariables;
        // Bucle for the rest of the matrix
        let n = terminales.length;
        for(let j = 2; j <= n; j++){
            for(let i = 0; i <= n - j; i++){
                let currentVariables = [];
                for(let k = 0; k < j; k++){
                    let currentTransition = matrix[i][k] + matrix[i + k + 1][j - k - 1];
                    currentVariables = this.getVariables(currentTransition);
                }
                matrix[j-1][i] = currentVariables;
            }
        }
        return (matrix[n-1][0].includes(this.firstVariable));
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

        let variables = [];
        for(let variable in this.grammar){
            if(this.grammar[variable].includes(transition)){
                variables.push(variable);
            }
        }
        return variables;   
    }
}