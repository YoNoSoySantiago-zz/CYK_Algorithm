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
        var validateFormat= this.validateGrammarFormat(grammar);
        var validateCadena= this.validateCadena(cadena);
		console.log(validateFormat);
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
        for(var s=0;s<cadena.length && format==true;s++){
             if(cadena.charCodeAt(s)<97 || cadena.charCodeAt(s)>122){
                format=false;
            }
        }
		return format;
    }
    //Method to create the FNC with the correct variables and transitions
    createFNC(grammar){
        var linesGrammar = grammar.split('\n');
        for(var s=0;s<linesGrammar.length;s++){
            var separate=linesGrammar[s].split("->");
            this.fnc.addTransition(separate[0],separate[1].split("|"));
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
    validateGrammarFormat(grammar){
        var linesGrammar = grammar.split("\n");
		var format = true;
		for (var s = 0; s < linesGrammar.length && format; s++)
		{
			var separate = linesGrammar[s].split("->");
			var transitions = separate[1].split("|"); 
			for (var m = 0; m < transitions.length && format; m++)
			{
				if (transitions[m].includes(" ") == false)
				{
					for (var i = 0; i < transitions[m].length && format; i++)
					{
						var charCode = transitions[m].charCodeAt(i);
						if (charCode < 65 || charCode > 122)
						{
							if (charCode == 42)
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
		console.log(variables);
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
	//Method that check if the sentence belongs to the grammar
	checkCadena(cadena){
		return this.fnc.checkCadena(cadena);
	}
}

