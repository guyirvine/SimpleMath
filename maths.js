var firstValue = 4;
var operator = "+";
var secondValue = 2;
var answer = '';
var count=1;

function randomFromTo(from, to){
       return Math.floor(Math.random() * (to - from + 1) + from);
}


function chooseOperator() {
	var myArray = [];
	
	if ( $('#addition:checked').val() ) {
		myArray.push("+");
	}

	if ( $('#subtraction:checked').val() ) {
		myArray.push("-");
	}

	if ( $('#multiplication:checked').val() ) {
		myArray.push("*");
	}

	if ( $('#division:checked').val() ) {
		myArray.push("/");
	}

	index = randomFromTo( 0, myArray.length-1);
	operator = myArray[index];
}


function processForOperator() {
	switch ( operator ) {
		case '+':
			firstValue = randomFromTo( 0, $("#addition-max").html() );	
			secondValue = randomFromTo( 0, $("#addition-max").html() );
			break;
		
		case '-':
			firstValue = randomFromTo( 0, $("#subtraction-max").html() );	
			secondValue = randomFromTo( 0, $("#subtraction-max").html() );
			if ( firstValue < secondValue ) {
				tmp = firstValue;
				firstValue = secondValue;
				secondValue = tmp;
			}
			break;

		case '*':
			firstValue = randomFromTo( 0, $("#multiplication-max").html() );	
			secondValue = randomFromTo( 0, 9 );
			break;

		case '/':
			firstValue = randomFromTo( 0, $("#division-max").html() );	
			secondValue = randomFromTo( 1, 9 );
			answer = firstValue * secondValue;
			firstValue = answer;
			break;
	
	}
		
}


function resetForm() {
	$( '#showNext' ).disabled = true;
	$( '#answer' ).disabled = false;
	$( '#answer' ).val('');
	$( '#answer' ).focus();

	$( '#showAnswer' ).html( 'Answer' );
	$( '#finalAnswer' ).html(  '&nbsp;&nbsp;' );

	$( '#answer' ).removeClass( "correct" );
	$( '#finalAnswer' ).removeClass( "correct" );
	$( '#answer' ).removeClass( "incorrect" );
	$( '#finalAnswer' ).removeClass( "incorrect" );

}
	
function populateForm() {
	$( '#firstValue' ).html( firstValue );
	$( '#operator' ).html( operator );
	$( '#secondValue' ).html( secondValue );
	$( '#showAnswer' ).html( 'Answer' );
	$( '#finalAnswer' ).html(  '&nbsp;&nbsp;' );
}


function poseQuestion() {
	chooseOperator();
	processForOperator();

	resetForm();
	populateForm();

	var buffer = "answer = " + 
				firstValue + " " +
				operator + " " +
				secondValue + 
				"";
	
	eval( buffer );
	
}

function showAnswerKey(evt) {
	var charCode = (evt.which) ? evt.which : event.keyCode
	if ( charCode == 39 || charCode == 32 ) {
		poseQuestion();
	}
	return false;

}

function showNextKey(evt) {
	var charCode = (evt.which) ? evt.which : event.keyCode
	if ( charCode == 39 || charCode == 32 ) {
		poseQuestion();
	}
	return false;

}


function showAnswer() {
	$( '#finalAnswer' ).html( answer );
	$( '#answer' ).disabled = true;
	$( '#showAnswer' ).disabled = true;
	$( '#showNext' ).disabled = false;
	$( '#showNext' ).focus();

	className = '';
	if ( answer == $( '#answer' ).val() ) {
		$( '#answer' ).addClass( "correct" );
		$( '#finalAnswer' ).addClass( "correct" );
		className = 'correct';
	} else {
		$( '#answer' ).addClass( "incorrect" );
		$( '#finalAnswer' ).addClass( "incorrect" );
		className = 'incorrect';
	}

	$( '#output' ).html( $( '#output' ).html() +
				"<span class='" + className + "'> " +
				count++ + ") " +
				firstValue + " " +
				operator + " " +
				secondValue + " = " +
				answer + " " +
				"<br></span>\n" );
	
}

function isNumberKey(evt) {
	var charCode = (evt.which) ? evt.which : event.keyCode
	if (charCode > 31 && (charCode < 48 || charCode > 57))
		return false;

	return true;
}

function validateAnswerKeyInput(evt) {
	var charCode = (evt.which) ? evt.which : event.keyCode
	if ( charCode == 13 ) {
		showAnswer();
		return false;
	}
	return isNumberKey(event)
}


function trapTab(evt) {
	var charCode = (evt.which) ? evt.which : event.keyCode
	if ( charCode == 9 ) {
		return false;
	}
}


function emme() {
	$('#addition').prop( "checked", true );
	$('#subtraction').prop( "checked", true );
	$('#multiplication').prop( "checked", true );
	$('#division').prop( "checked", true );

	$('#addition-range').prop( "value", 9 );
	$('#subtraction-range').prop( "value", 9 );
	$('#multiplication-range').prop( "value", 5 );
	$('#division-range').prop( "value", 3 );

	$('#addition-range').change();
	$('#subtraction-range').change();
	$('#multiplication-range').change();
	$('#division-range').change();

	$('#answer').focus();

	return false;
}

function tom() {
	$('#addition').prop( "checked", true );
	$('#subtraction').prop( "checked", true );
	$('#multiplication').prop( "checked", true );
	$('#division').prop( "checked", false );

	$('#addition-range').prop( "value", 9 );
	$('#subtraction-range').prop( "value", 9 );
	$('#multiplication-range').prop( "value", 2 );
	$('#division-range').prop( "value", 3 );

	$('#addition-range').change();
	$('#subtraction-range').change();
	$('#multiplication-range').change();
	$('#division-range').change();
	
	$('#answer').focus();

	return false;
}
