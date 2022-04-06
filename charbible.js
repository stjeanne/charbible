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

	constructor(charData) {

//		console.log("in the constructor for Character. using data as follows: ");
//		console.log(charData);

		this.charName = charData.Name;
		this.charProduct = charData.Product;
		this.charCopy = charData.Copy;
		this.charImage = "res/" + charData.Image;
		this.charAge = charData.Age;
		this.charBody = charData['Body Type'];
		this.charRace = charData.Race;
		this.charGender = charData.Gender;
		this.charLocation = charData.Location;
		this.charAbility = charData.Ability;

	}

	displayChar(loc) {									// takes parameter: what's the name of the part of the screen to put this?
		console.log("called Display Character");
		$(loc).append(
				"<div class=\"char\">" + 

				"<div class=\"leftcol\"><img width=\"100\" src=\"" + this.charImage + "\"></div>" +

				"<div class=\"rightcol\"><p class=\"charname\">" + this.charName + "</p>" +
				"<p class=\"charCopy\">" + this.charCopy + "</p>" +
				"<p>" + 
				"<ul class=\"charMeta\">" +
					"<li>" + this.charGender + "</li>" +
					"<li>" + this.charRace + "</li>" +
					"<li>" + this.charAge + "</li>" +
					"<li>" + this.charBody + "</li>" +
					"<li>" + this.charLocation + "</li>" +
					"<li>" + this.charAbility + "</li>" +
				"</ul>" +

				"</p></div>" +



				"</div>");

	}
}

class Bible { 	// encapsulates the character data

	constructor(file, res) {

		let self = this;
		this.Chars = [];

		/* opens file and builds an array of characters from it. */

		console.log("race: this is in the constructor");

		$.getJSON(file, function(data) {

			console.log("loaded data as follows:");
			console.log(data);

			$.each(data, function(key,val) {
				self.Chars.push(new Character(val));
			});
			res();

		})
	}

	displayProduct(loc, prod, sortrule) {
		console.log("let's show the bible now!");

		// for now, just: go through the bible and display all of it

		this.Chars.forEach((c) => {
			c.displayChar(loc);
		});

	}

};


//