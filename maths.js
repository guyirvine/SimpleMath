var firstValue = 4;
var operator = "+";
var secondValue = 2;
var answer = '';
var count=1;

function randomFromTo(from, to){
       return Math.floor(Math.random() * (to - from + 1) + from);
}

function setOperator() {
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

	index = randomFromTo( 0, myArray.length-1);
	operator = myArray[index];
}

function poseQuestion() {
setOperator();
firstValue = randomFromTo( 0, 9 );	
secondValue = randomFromTo( 0, 9 );
if ( operator == "-" ) {
	if ( firstValue < secondValue ) {
		tmp = firstValue;
		firstValue = secondValue;
		secondValue = tmp;
	}
}
	
	$( '#firstValue' ).html( firstValue );
	$( '#operator' ).html( operator );
	$( '#secondValue' ).html( secondValue );
	$( '#answer' ).disabled = false;
	$( '#answer' ).val('');
	$( '#answer' ).focus();
	$( '#showAnswer' ).html( 'Answer' );
	$( '#finalAnswer' ).html(  '' );

	$( '#answer' ).removeClass( "correct" );
	$( '#finalAnswer' ).removeClass( "correct" );
	$( '#answer' ).removeClass( "incorrect" );
	$( '#finalAnswer' ).removeClass( "incorrect" );

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

function showAnswer() {
	if ( $( '#answer' ).disabled ) {
//		poseQuestion();
		return;
	}

	$( '#finalAnswer' ).html( answer );
	$( '#answer' ).disabled = true;
	$( '#showAnswer' ).html( 'Next' );	
	$( '#showAnswer' ).focus();

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

