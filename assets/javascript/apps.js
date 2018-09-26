// create questions into an array of question, choice array, and correct number per array location
var disneyQuestions = [{
	question: "Who was the lost boy flying in green?",
	answerChoice: ["Michael John", "Peter Pan", "Captain Hook", "Aladdin"],
	answer: 1
},{
	question: "The princess who longed for the sea?",
	answerChoice: ["Moana", "Mulan", "Merida", "Pocahantas"],
	answer: 0
},{
	question: "Which Disney princess let her hair down?",
	answerChoice: ["Repunzel", "Aurora", "Belle", "Ariel"],
	answer: 0
},{
	question: "Can you name the meerkat in Lion King?",
	answerChoice: ["Simba", "Zazu", "Timon", "Banzi"],
	answer: 2
},{
	question: "What was Aladdin's girlfriend's name",
	answerChoice: ["Mulan", "Harem Girl", "Mirada", "Jasmine"],
	answer: 3

}];
// create an array to reference the gifs which will be pulled into the program at the end of each question 
var gifArray = ['question1', 'question2', 'question3', 'question4', 'question5'];
var currentQuestion; //tracks the current question
var correctAnswer; //pulls the right answer to display
var incorrectAnswer; //tracks number of wrong answers
var unanswered; //tracks if they weren't able to answer before timer 
var seconds; //variable to hold the seconds to display decrementing time
var time; //start point
var answered; //tracks number of questions answered
var userSelect; //captures the user's answer
//feedback from each question 
var messages = {
	correct: "Spot On!",
	incorrect: "Better Luck Next Time.",
	endTime: "Sorry out of time!",
	finished: "Final Score."
}
//this is what starts the game
$('#startBtn').on('click', function(){
	$(this).hide();
	newGame();
});
//when the game is over this is displayed
$('#startOverBtn').on('click', function(){
	$(this).hide();
	newGame();
});
//if user wants a new game then arrays and variables are emptied
function newGame(){
	$('#finalMessage').empty();
	$('#correctAnswers').empty();
	$('#incorrectAnswers').empty();
	$('#unanswered').empty();
	currentQuestion = 0;
	correctAnswer = 0;
	incorrectAnswer = 0;
	unanswered = 0;
	newQuestion();
}
//this allows the next question in the array to be displayed
function newQuestion(){
	$('#message').empty();
	$('#correctedAnswer').empty();
	$('#gif').empty();
	answered = true;
	
	//cycles through to grab the next question 
	$('#currentQuestion').html('Question #'+(currentQuestion+1)+'/'+disneyQuestions.length);
	$('.question').html('<h2>' + disneyQuestions[currentQuestion].question + '</h2>');
	for(var i = 0; i < 4; i++){
		var choices = $('<div>');
		choices.text(disneyQuestions[currentQuestion].answerChoice[i]);
		choices.attr({'data-index': i });
		choices.addClass('thisChoice');
		$('.answerChoice').append(choices);
	}
	countdown();
	//when user selects their answer there is a pause to allow the page to display the answer 

	$('.thisChoice').on('click',function(){
		userSelect = $(this).data('index');
		clearInterval(time);
		answerPage();
	});
}
//timer set to 15 seconds when click on start button 
function countdown(){
	seconds = 15;
	$('#timeRemaining').html('<h3>Time Remaining: ' + seconds + '</h3>');
	answered = true;
	//sets timer to go down
	time = setInterval(showCountdown, 1000);
}
//display the count down 
function showCountdown(){
	seconds--;
	$('#timeRemaining').html('<h3>Time Remaining: ' + seconds + '</h3>');
	if(seconds < 1){
		clearInterval(time);
		answered = false;
		answerPage();
	}
}
//the page which shows if the user's answer was correct or not 
function answerPage(){
	$('#currentQuestion').empty();
	$('.thisChoice').empty(); //Clears question page
	$('.question').empty();

	var rightAnswerText = disneyQuestions[currentQuestion].answerChoice[disneyQuestions[currentQuestion].answer];
	var rightAnswerIndex = disneyQuestions[currentQuestion].answer;
	$('#gif').html('<img src = "assets/images/'+ gifArray[currentQuestion] +'.gif" width = "400px">');
	//if statement for  correct, incorrect, or unanswered status
	if((userSelect == rightAnswerIndex) && (answered == true)){
		correctAnswer++;
		$('#message').html(messages.correct);
	} else if((userSelect != rightAnswerIndex) && (answered == true)){
		incorrectAnswer++;
		$('#message').html(messages.incorrect);
		$('#correctedAnswer').html('The right answer was: ' + rightAnswerText);
	} else{
		unanswered++;
		$('#message').html(messages.endTime);
		$('#correctedAnswer').html('The answer you missed was : ' + rightAnswerText);
		answered = true;
	}
	//check to see if at the end of the array 
	if(currentQuestion == (disneyQuestions.length-1)){
		setTimeout(score, 5000)
	} else{
		currentQuestion++;
		setTimeout(newQuestion, 5000);
	}	
}
//at the end of the game the user sees how they did 
function score(){
	$('#timeRemaining').empty();
	$('#message').empty();
	$('#correctedAnswer').empty();
	$('#gif').empty();

	$('#finalMessage').html(messages.finished);
	$('#correctAnswers').html("Correct Answers: " + correctAnswer);
	$('#incorrectAnswers').html("Incorrect Answers: " + incorrectAnswer);
	$('#unanswered').html("Unanswered: " + unanswered);
	$('#startOverBtn').addClass('reset');
	$('#startOverBtn').show();
	$('#startOverBtn').html('Start Over?');
}