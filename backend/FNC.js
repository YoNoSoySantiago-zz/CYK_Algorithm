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
        this.grammar[variable] = transitions; //#TODO: Check necessary conditions before adding
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
       
        //Initilization
        for(let i = 0; i < terminales.length; i++){
            var aux = [];
            for(let j = 0; j < terminales.length; j++){
               aux[j] = [];
            }
            matrix[i] = aux;
        }
        
        //Firsts variables
        for(let i = 0; i < terminales.length; i++){
            matrix[i][i] = this.getVariables(terminales[i]);
        }
        // for(let i = 0; i < terminales.length; i++){
        //     let string = "";
        //     for(let j = i; j < terminales.length; j++){
        //         string+=(matrix[i][j].toString())+ " ";
        //     }
        //     console.log(string);
        // }
        for(let l = 1; l <= terminales.length-1; l++){
            for(let r = 0; r <= terminales.length - l - 1; r++){
                for(let t =0; t <= l -1; t++){
                    let left = matrix[r][r+t];
                    let right = matrix[r+t+1][r+l];
                    let allVariables = [];
                    // console.log("left:",r,r+t,left);
                    // console.log("right",r+t+1,r+l,right);
                    for(let b of left){
                        for(let a of right){
                            let transition = b + a;
                            let variables = this.getVariables(transition);
                            for(let v of variables){
                                if(!allVariables.includes(v)){
                                    allVariables.push(v);
                                }
                            }
                        }
                    }
                    for(let variable of allVariables){
                        if(!matrix[r][r+l].includes(variable)){
                            matrix[r][r+l].push(variable);
                        }
                    }
                }
            }
        }
        let accepted = false;
        if(matrix[0][terminales.length-1].includes(this.firstVariable)){
            accepted = true;
        }
        return accepted;
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

    // Function that set the value to the first variable of the grammar
    // Giving as input a string
    setFirstVariable(firstVariable){
        this.firstVariable = firstVariable;
    }
}
