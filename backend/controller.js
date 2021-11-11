class Controller{ 
    constructor(){
       this.fnc=new FNC();
    }
//Method that validates all the conditions to validate if the string belongs 
//to the grammar using the cyk algorithm
    validateGrammar(){
        var belongs=false;
        var grammar = document.getElementById("inputTextArea").value;
        var cadena = document.getElementById("idSentence").value;
        var validateFormat=validateFormat(grammar);
        var validateCadena=validateCadena(cadena);
        if(validateCadena){
         if(validateFormat){
            createFNC(grammar);
            var isChomskyNormalForm=this.fnc.checkChomskyNormalForm();
            if(isChomskyNormalForm){
                belongs=this.fnc.checkCadena(cadena);   
                if(belongs){
                    return 0;//The string belongs to the grammar
                }          
            }
        }
    }
        if(!validateCadena){
            return -2;//The format of the cadena that the user entered is not correct
        }
        if(!validateFormat){
            return -1; //The format of the grammar that the user entered is not correct
        }
        if(!isChomskyNormalForm){
            return 1;// Grammar is not in normal chunsky form
        }
    }
    //Method that validates if the string that is entered belongs to the 
    //grammar has the correct format
    validateCadena(cadena){
        var format=true;
        for(var s=0;s<grammar.length && format==true;s++){
             if(grammar.charCodeAt(s)<97 || grammar.charCodeAt(s)>122){
                format=false;
            }
        }
    }
    //Method to create the FNC with the correct variables and transitions
    createFNC(grammar){
        var linesGrammar = grammar.split('\n');
        for(var s=0;s<linesGrammar.length;s++){
            var separate=linesGrammar[s].split("->");
            fnc.addTransition(separate[0],separate[1]);
        }
    }
    //Method that validates if there are two repeated data in an array
    validateIfExist(array){
        for (var t=0; t<array.length; t++) {
			for (var i=t+1; i<array.length; i++) {
				if (array[t]==array[i]) {
					return false;
				}
			}
		}
		return true;
    }
    //Method that validates if the variables and transitions to
    // be added to the FNC have a suitable format
    validateFormat(grammar){
        var linesGrammar = grammar.split("\n");
		var format = true;
		for (var s = 0; s < linesGrammar.length && format; s++)
		{
			var separate = linesGrammar[s].split("->");
			var transitions = separate[1].split("\\|");
			for (var m = 0; m < transitions.length && format; m++)
			{
				if (transitions[m].includes(" ") == false)
				{
					for (var i = 0; i < transitions[m].length && format; i++)
					{
						var letter = transitions[m].charAt(i);
						console.log(parseInt(letter));
						if (parseInt(letter) < 65 || parseInt(letter) > 122)
						{
							if (parseInt(letter) == 42)
							{
								format = true;
							}
							else
							{
								format = false;
							}
						}
					}
				}
				else
				{
					format = false;
				}
			}
		}
		var variables = Array(linesGrammar.length).fill(null);
		var exist = false;
		for (var s = 0; s < linesGrammar.length && format; s++)
		{
			var separate = linesGrammar[s].split("->");
			variables[s] = separate[0];
			if (s > 0)
			{
				if (separate[1].includes("*"))
				{
					format = false;
				}
				else
				{
					if (separate[0].length == 1)
					{
						var letter = separate[0].charAt(0);
						if (parseInt(letter) > 64 && parseInt(letter) < 91)
						{}
						else
						{
							format = false;
						}
					}
					else
					{
						format = false;
					}
				}
			}
			else
			{
				if (separate[0].length == 1)
				{
					var letter = separate[0].charAt(0);
					if (parseInt(letter) > 64 && parseInt(letter) < 91)
					{}
					else
					{
						format = false;
					}
				}
				else
				{
					format = false;
				}
			}
		}
        if (format == true)
		{
			if (JavaCode.existeEnArreglo(variables))
			{
				return true;
			}
			else
			{
				return false;
			}
		}
		else
		{
			if (format)
			{
				return true;
			}
			else
			{
				return false;
			}
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