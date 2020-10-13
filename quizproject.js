var currentQuestion = 0; //question we are currently go on

// should start with 0
var score = 0; //number of correct question


//set timer
var timeleft = 10;

var stopTimer = false;
var countdownTimer;

// question is an array of question objects
var questions = [
   {
	"question": "In California you can’t legally buy a mousetrap without having what?",
	"a": "a hunting license",
	"b": "a driving license",
	"c": "a teaching license",
	"d": "an animal license",
	"image":"quizimages/mousetrap.jpg",
	"answer": "a"
   },
   {
	"question": "Where were the fortune cookies invented?",
	"a": "Tokyo",
	"b": "Beijing",
	"c": "San Francisco",
	"d": "Paris",
	"image":"quizimages/cookie1.jpg",
	"answer": "c"
   },
   {
	"question": "With how many bricks is the Empire State Building is made of?",
	"a": "5 million",
	"b": "10 million",
	"c": "20 million",
	"d": "30 million",
	"image":"quizimages/building.jpg",
	"answer": "b"
   },
   {
	"question": "According to Russian law, a homeless person must be where after 10pm?",
	"a": "At a park",
	"b": "At a restaurant",
	"c": "At home",
	"d": "At a bus station",
	"image":"quizimages/homeless.jpg",
	"answer": "c"  
   },
   {
	"question": "What is illegal to eat with a cherry pie in Kansas?",
	"a": "Ice cream",
	"b": "Grapes",
	"c": "Whipping cream",
	"d": "Chocolate",
	"image":"quizimages/cherrypie.jpg",
	"answer": "a"  
   },
   {
	"question": "Where do kiwi fruits originally come from?",
	"a": "Germany",
	"b": "Canada",
	"c": "Australia",
	"d": "China",
	"image":"quizimages/kiwi.jpg",
	"answer": "d"  
   },
   {
	"question": "What was the first fruit that was eaten on the moon?",
	"a": "Apple",
	"b": "Peach",
	"c": "Banana",
	"d": "Orange",
	"image":"quizimages/moon.jpg",
	"answer": "b"  
   },
   {
	"question": "How many noses does a slug have?",
	"a": "two",
	"b": "three",
	"c": "four",
	"d": "five",
	"image":"quizimages/slug.jpg",
	"answer": "c"  
   },
   {
	"question": "What is the world record for number of hot dogs eaten in one sitting?",
	"a": "57",
	"b": "63",
	"c": "74",
	"d": "82",
	"image":"quizimages/hotdog.jpg",
	"answer": "c"  
   },
   {
	"question": "What language has the most words?",
	"a": "Italian",
	"b": "Japanese",
	"c": "Arabic",
	"d": "English",
	"image":"quizimages/language.jpg",
	"smallimage":"quizimage/language.jpg",
	"answer": "d"  
   }
 ];
 
// registar the service worker when the js loads
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js');
}
 
// when load the page it always happens
function initialize() {
	document.getElementById("lightbox").style.display = "none";
	loadQuestion();
	
	document.getElementById("menu").style.display = "block";
	document.getElementById("review").style.display = "none";
	
	
}; // initialize
 
 // move from the menu page to trivia quiz page
 function toQuiz() {
	let elem = document.getElementById("menu");
	
	if(elem.style.display == "none") {
		elem.style.display = "block";
	} else {
		elem.style.display = "none";
	} //if else
		
 } //toQuiz

// load the current questio on the page 
//ページとすべての画像などのリソース類を読み込んでから処理を実行する
 function loadQuestion() {
	stopTimer = false;
	startTimer();

	 
	let message = "";
	if(currentQuestion == questions.length) {	
		document.getElementById("lightbox").style.display = "none";
		document.getElementById("review").style.display = "block";
		currentQuestion = 0;
		
		if (score >= 8) {
			message = "Awesome! " + "Your score is " + score + "!";
			document.getElementById("feedback").innerHTML = message;
		} else if (8 > score >= 4) {
			message = "Good Job! " + "Your score is " + score + "!";
			document.getElementById("feedback").innerHTML = message;
		} else {
			message = "Good Try! " + "Your score is " + score + "!";
			document.getElementById("feedback").innerHTML = message;
		}
		
		
	} // if
	
    //preload images
	var img = document.getElementById("image");
	var preLoadImg = new Image();
	preLoadImg.src = questions[currentQuestion].image;
	
	preLoadImg.onLoad = function () {
		img.width = this.width;
	} // preLoadImg
	
	img.style.maxWidth = "500px";
	img.src = preLoadImg.src;
	
	//if(width < "768px"){
		
	//}
		
	//load the question
	document.getElementById("question").innerHTML = questions[currentQuestion].question;
	document.getElementById("a").innerHTML = "A. " + questions[currentQuestion].a;
	document.getElementById("b").innerHTML = "B. " + questions[currentQuestion].b;
	document.getElementById("c").innerHTML = "C. " + questions[currentQuestion].c;
	document.getElementById("d").innerHTML = "D. " + questions[currentQuestion].d;
 } // loadQuestion
 
// mark the qurrent question
 function markIt(ans) {
	//clearInterval(countdownTimer);
	stopTimer = true;
	endTimer();
	
	
	let message = "";
	console.log(ans);
	
	// if the answer is correct, add the score and move to the next question
	if (ans == questions[currentQuestion].answer) {
		score++;
		
		//show the lightbox and feedback
		message = "Correct answer! Your score is " + score + " / " + questions.length;
		document.getElementById("message").innerHTML = message;
	} // if
	
	// otherwise notice user the answer is incorrect
	else {
		message = "Incorrect answer! Your score is " + score + " / " + questions.length
		           + "The Correct answer is " + questions[currentQuestion].answer;
		document.getElementById("message").innerHTML = message;
		
	} // else
		

	document.getElementById("score").innerHTML = score + " / " + questions.length;
	document.getElementById("lightbox").style.display = "block";
    currentQuestion++;
	loadQuestion();
	
		
 } // markIt
   
function nextQuestion() {
	currentQuestion++;
	loadQuestion();
} // nextQuestion

 function nextPage() {
	document.getElementById("lightbox").style.display = "none";
 } // nextPage
 
function retry() {
	document.getElementById("review").style.display = "none";
	
	score = 0;
	document.getElementById("score").innerHTML = score + " / " + questions.length;
} //retry

function startTimer() {
	 console.log("starting timer");
	if(currentQuestion == 0){
		timeleft = 180;
	} else {
		timeleft = 10;
	}
	
	countdownTimer = setInterval(function(){
	document.getElementById("countdown").innerHTML = timeleft + " seconds remaining";
	timeleft -= 1;
	endTimer();
	}, 1000);
} // startTimer

function endTimer() {
	console.log("Ending Timer");
	if(timeleft < 0 || stopTimer){
		clearInterval(countdownTimer);
		currentQuestion++;
		loadQuestion();
	}
} // endTimer