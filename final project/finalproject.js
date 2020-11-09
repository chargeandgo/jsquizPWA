var showCounter = 0;


// initialize variables after page loads
window.onload = function() {
   closeLightBox();
   
   if ('serviceWorker' in navigator) {
	navigator.serviceWorker.register('/sw.js');
   }
} // window.onload



// get data from TV Maze
function fetchData() {
  document.getElementById("main").innerHTML = "";
  
  var search = document.getElementById("search").value;  
    
  fetch('http://api.tvmaze.com/search/shows?q=' + search)
    .then(response => response.json())
    .then(data => updatePage(data) 
    );
} // window.onload 
 
function fetchDataPeople() {
  document.getElementById("main").innerHTML = "";
  
  var search = document.getElementById("search").value;  
    
  fetch('http://api.tvmaze.com/search/people?q=' + search)
    .then(response => response.json())
    .then(data => updatePagePeople(data) 
    );
}

// change the activity displayed 
function updatePage(data) {
  console.log(data); // prints json in console
  var tvshow; 
  for (tvshow in data) {
    
    createTVShow(data[tvshow]);
  } // for


} // updatePage

function updatePagePeople(data) {
  console.log("people json");
  console.log(data); // prints json in console
  var tvactor; 
  for (tvactor in data) {
    
    createTVActor(data[tvactor]);
  } // for


}

// returns a string of formatted genres
function showGenres(genres) {
   var g;
   for (g in genres) {
      output = genres[g] + ", "; 
   } // for       
   return output; 
} // showGenres

// constructs one TV show entry on homepage
function createTVShow (tvshowJSON) {
    var elemMain = document.getElementById("main");
   
    var elemDiv = document.createElement("div");
	elemDiv.classList.add("div");
	
    var elemImage = document.createElement("img");
	elemImage.classList.add("image");
    
    var elemShowTitle = document.createElement("h2");
	// add a class to apply css
    elemShowTitle.classList.add("showtitle"); 
    
    var elemGenre = document.createElement("div");
	elemGenre.classList.add("genre");
	
    var elemRating = document.createElement("div");
	elemRating.classList.add("rating");
	
    var elemSummary = document.createElement("div");
	elemSummary.classList.add("summary");
    
    // add JSON data to elements
    elemImage.src = tvshowJSON.show.image.medium;
    elemShowTitle.innerHTML = tvshowJSON.show.name;
    elemGenre.innerHTML = "Genre : " + showGenres(tvshowJSON.show.genres);
    elemRating.innerHTML = "Rate : " + tvshowJSON.show.rating.average;
    elemSummary.innerHTML = "Summary : " + tvshowJSON.show.summary;
    
    // add 5 elements to the div tag
    elemDiv.appendChild(elemShowTitle);  
    elemDiv.appendChild(elemImage);
    elemDiv.appendChild(elemGenre);
    elemDiv.appendChild(elemRating);
    elemDiv.appendChild(elemSummary);
    
	
	//get id of show and add episodes list
	var showId = tvshowJSON.show.id;
	
	fetchEpisodes(showId, elemDiv);
    
	
    // add this entry to main
    elemMain.appendChild(elemDiv);
    
} // createTVShow

function createTVActor (tvactorJSON) {
    var elemMain = document.getElementById("main");
   
    var elemDiv = document.createElement("div");
	elemDiv.classList.add("div");
	
    var elemImagePeople = document.createElement("img");
	elemImagePeople.classList.add("image");
    
    var elemName = document.createElement("h2");
	// add a class to apply css
    elemName.classList.add("showtitle"); 
    
    var elemCountry = document.createElement("div");
	elemCountry.classList.add("genre");
	
    var elemBirthday = document.createElement("div");
	elemBirthday.classList.add("rating");
	
    var elemGender = document.createElement("div");
	elemGender.classList.add("summary");
    
    // add JSON data to elements
    elemImagePeople.src = tvactorJSON.person.image.medium;
    elemName.innerHTML = tvactorJSON.person.name;
    elemCountry.innerHTML = "Country : " + tvactorJSON.person.country.name;
    elemBirthday.innerHTML = "Birthday : " + tvactorJSON.person.birthday;
    elemGender.innerHTML = "Gender : " + tvactorJSON.person.gender;
    
    // add 5 elements to the div tag
    elemDiv.appendChild(elemName);  
    elemDiv.appendChild(elemImagePeople);
    elemDiv.appendChild(elemCountry);
    elemDiv.appendChild(elemBirthday);
    elemDiv.appendChild(elemGender);
   
      // add this entry to main
    elemMain.appendChild(elemDiv);
    
	
} // createTVActor

// fetch episodes for a given tv show id
function fetchEpisodes(showId, elemDiv) {
    
    
  console.log("fetching " + showId);
  
  fetch('http://api.tvmaze.com/shows/' + showId + '/episodes')
    .then(response => response.json())
    .then(data => showEpisodes(data, elemDiv));
    
} // fetch episodes


// show episodes
function showEpisodes (data, elemDiv) {
    //console.log("episodes");
    //console.log(data); 
    showCounter ++;
    
    var elemEpisodes = document.createElement("div");
	elemEpisodes.classList.add("episodes");
    
    
    
    var output = "<ul>";
	
    for (episode in data) {
		if(data[episode].image) {
			var image = data[episode].image.medium;
			var name = (data[episode].name).replaceAll("'","&apos:").replaceAll('"', '\\"');
			var season = data[episode].season;
			var number = data[episode].number;
            var episodesummary = (data[episode].summary).replaceAll("'","&apos:").replaceAll('"', '\\"');
            
			output += "<div class='episode'><a class='epi' href='javascript:showLightBox(\"";
			output += name + "\",\"";
            output += image + "\",\"";
			output += number + "\",\"";
            output += season + "\",\"";
            output += episode + "\",\"";
            output += episodesummary;
			output += "\")'>";
			output += name;
			output += "</a></div>";
		} //if
	} // for
    
   
	
    console.log(output);
    output += "</ul><hr>";
    elemEpisodes.innerHTML = " Episodes :" + "<br>" + output;
    elemDiv.appendChild(elemEpisodes);
        
} // showEpisodes



function showLightBox(name, img, number,season, episode, episodesummary){
        
    
		document.getElementById("lightbox").style.display="block";
    
		document.getElementById("message").innerHTML = "<p class='picture'><img src='" + img + "' alt='episode image'></p>";
    
        document.getElementById("message").innerHTML += "<div class='name'>" + name + "</div>";
    
		document.getElementById("message").innerHTML += "<div class='season'> Season : " + season + "</div>";
    
		document.getElementById("message").innerHTML += "<div class='number'> Episode Number : " + number + "</div>";
    
        document.getElementById("message").innerHTML += "<div class='summary'> Summary : " + episodesummary + "</div>";
    
        
        
        //elemDiv.appendChild(elemEpisodeImage);
        //elemDiv.appendChild(elemEpisodeTitle);
        //elemDiv.appendChild(elemSeason);
        //elemDiv.appendChild(elemNumber);
        //elemDiv.appendChild(elemEpisodeSummary);
    
}

 // close the lightbox
 function closeLightBox(){
     document.getElementById("lightbox").style.display="none";
 } // closeLightBox


