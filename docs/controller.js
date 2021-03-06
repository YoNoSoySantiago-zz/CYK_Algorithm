class Controller{ 
    constructor(){
       this.fnc=new FNC();
    }
	 /*validateGrammar
	 * Method that validates all the conditions to validate if the string belongs to the grammar using the cyk algorithm
     * @return int njmber of validation grammar
     */
    validateGrammar(){
        var belongs=false;
        var grammar = document.getElementById("inputTextArea").value;
        var cadena = document.getElementById("idSentence").value;
        var validateFormat= this.validateGrammarFormat(grammar);
        var validateCadena= this.validateCadena(cadena);
        if(validateCadena){
         	if(validateFormat){
            	this.createFNC(grammar);
            	var isChomskyNormalForm=this.fnc.checkChomskyNormalForm();
            	if(isChomskyNormalForm){
                	return 0;        
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
		console.log("gasd");
    }
	 /*validateCadena
	 * Method that validates if the string that is entered belongs to the grammar has the correct format
     * @return boolean format
     */
    validateCadena(cadena){ 
        var format=true;
        for(var s=0;s<cadena.length && format==true;s++){
             if(cadena.charCodeAt(s)<97 || cadena.charCodeAt(s)>122){
                format=false;
            }
        }
		return format;
    }
	/* createFNC
	 * Method to create the FNC with the correct variables and transitions
     * @param grammar !=null
     */
    createFNC(grammar){
        var linesGrammar = grammar.split('\n');
        for(var s=0;s<linesGrammar.length;s++){
            var separate=linesGrammar[s].split("->");
            this.fnc.addTransition(separate[0],separate[1].split("|"));
			if(s==0){
				this.fnc.setFirstVariable(separate[0]);
			}
        }
    }
	 /* validateIfExist
	 * Method that validates if there are two repeated data in an array
     * @param array !=null
	 * @return boolean exist
     */
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
	 /* validateIfExist
	 * Method that validates if the variables and transitions to be added to the FNC have a suitable format
     * @param grammar!=null
	 * @return boolean format
     */
    validateGrammarFormat(grammar){
        var linesGrammar = grammar.split("\n");
		var format = true;
		for (var s = 0; s < linesGrammar.length && format; s++)
		{
			if(linesGrammar[s].charAt(1)!='-' || linesGrammar[s].charAt(2)!='>') {
				format=false;
			}
			if(format) {
				var separate = linesGrammar[s].split("->");
				if(separate[1].charAt(0)=='|' || separate[1].charAt(separate[1].length-1)=='|') {
					format=false;
				}
				var transitions = separate[1].split('|'); 
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
						var letter = separate[0].charCodeAt(0);
						if ((letter) > 64 && (letter) < 91)
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
					var letter = separate[0].charCodeAt(0);
					if (!(letter > 64 && letter < 91)){
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
			if (this.validateIfExist(variables))
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
	 /* checkCadena
	 * Method that check if the sentence belongs to the grammar
	 * @return boolean check
     */
	checkCadena(cadena){
		return this.fnc.checkCadena(cadena);
	}
}

