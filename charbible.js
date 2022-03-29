// character bible maker

/*

	create an array or w/e of Chracter objects

	Import the CSV file (or convert it to json)

	for each row in the file

		- create a new character
		- populate a character's information
		- populate the image

	now generate a website

	add header information

	add selectors/search

	create the div for characters
		for each character
			create a div

			show the portrait
			show the name
			show all other info
			show the copy
			tag wth metadata

			close the div

	close the div for characters

	add footer information

*/

class Character {

	constructor(obj) {
		this.charName = null;
		this.charProduct = null;
		this.charAge = null;
		this.charBody = null;
		this.charRace = null;
		this.charGender = null;
		this.charLocation = null;
		this.charAbility = null;
		this.charImage = null;
	}

	displayChar(loc) {									// takes parameter: what's the name of the part of the screen to put this?
		console.log("called Display Character");
		$("charlist").html("<div class=\"char\">Show a character here!</div>");
	}
}

let c = new Character;

class BibleManager {

	// encapsulates the character data.


};


//