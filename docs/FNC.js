class FNC{
    constructor(){
        this.grammar = {};
        //grammar: represent the grammar in Chomsky normal form, it is a dictionary with the key being the variable and the value being a list of transitions
        this.grammar = {};
        //firstVariable: represent the first variable of the grammar

        this.firstVariable = '';
    }

    /**
     * this method add a transition to the grammar, using the variable as key and the list of transitions as value
     * @param {String} variable  the variable that will be added to the grammar
     * @param {Array} transitions the list of transitions that will be added to the grammar
     */
    addTransition(variable, transitions){
        this.grammar[variable] = transitions; //#TODO: Check necessary conditions before adding
    }

    /**
     * This method check if the current grammar is in Chomsky normal form
     * @returns this method returns a boolean indicating whether the grammar is in Chomsky normal form or not
     */
    checkChomskyNormalForm(){

        let isChomskyNormalForm = true;
        for(let variable in this.grammar){
            let transitions = this.grammar[variable];
            for(let i = 0; i < transitions.length && isChomskyNormalForm; i++){
                let currentTransition = transitions[i];
                if(currentTransition.length > 2){
                    isChomskyNormalForm = false;
                }else if(currentTransition.length == 2){
                    if(currentTransition !== currentTransition.toUpperCase()){
                        isChomskyNormalForm = false;
                    }
                }else{
                    if(currentTransition !== currentTransition.toLowerCase()){
                        isChomskyNormalForm = false;
                    }
                }
            }
            if(!isChomskyNormalForm){
                break;
            }
        }
        return isChomskyNormalForm;
    }

    /**
     * this method check if a string is accepted by the corresponding grammar
     * @param {String} cadena  the string that will be checked 
     * @returns {boolean}  a boolean indicating whether the string is accepted or not   
     */
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
        console.log(cadena.length);
        if(cadena.length == 0){
            if(this.getVariables("*").length > 0){
                accepted = true;
            }
        }else{
            if(matrix[0][terminales.length-1].includes(this.firstVariable)){
                accepted = true;
            }
        }
        return accepted;
    }

    // Function that is in charge of return all varibles that contains a especific transition
    // Giving as input a transition
    // Returns a list of variables
    /**
     * Ths method return all the variables that contains a specific transition
     * @param {String} transition the transition that will be checked
     * @returns {Array} the list of variables that contains the transition
     */
    getVariables(transition){
        let variables = [];
        for(let variable in this.grammar){
            if(this.grammar[variable].includes(transition)){
                variables.push(variable);
            }
        }
        return variables;   
    }

 
    /**
     * this method set the value to the first variable of the grammar
     * @param {string} firstVariable 
     */
    setFirstVariable(firstVariable){
        this.firstVariable = firstVariable;
    }
}
