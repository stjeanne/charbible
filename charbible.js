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

		$.getJSON(file, function(data) {

			console.log("loaded data as follows:");
			console.log(data);

			$.each(data, function(key,val) {
				self.Chars.push(new Character(val));
			});
			res();

		})
	}


/*
		Viable options for sort rule: alphabetical
*/

	displayItAll(loc, prod, sortrule) {
		console.log("let's show the whole bible!");
		console.log("prod is " + prod);

		$(loc).html("");


		this.Chars.forEach((c) => {
			c.displayChar(loc);
		});

	}

	selectProduct(prod) {
		return this.Chars.filter((c) => c.charProduct == prod);
	}

};

class Controller {

	constructor() {

	}

	addDropdown(loc, criterion) {

		// adds a dropdown control at loc, sets it to test for criterion, and creates an event listener to see if it's changed

		$(loc).append("<select name=\"" + criterion + "Dropdown\"><option value=\"" + criterion + "Value\">" + criterion + "</option>");
		console.log("adding a dropdown at " + loc + " that tests for " + criterion);
	}

	addCheckbox(loc, criterion, label) {

		console.log("adding a checkbox at " + loc + " that tests for " + criterion);


		$(loc).append("<input type=\"checkbox\" name=\"" + criterion + "Checkbox\">" +

			"<label for=\"" + criterion + "Checkbox\">" + label + "</label>");
		$("" + criterion + "Checkbox").change(() => {
			console.log("the checkbox at " + criterion + "Label changed!");
		});
	}
}

//