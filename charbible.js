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

		this.allData = charData;					// hopefully simplifies searching and sorting
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

				"<div class=\"leftcol\"><img width=\"200\" src=\"" + this.charImage + "\"></div>" +

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

	getAllValuesForKey(key) {


//		let r = this.Chars.filter(c => key in c.allData);

		let r = key;

		console.log("getAllValues is returning " + r);
		return r;



		/*
			for each character in the bible
				check whether the character has property key
				if yes, get the value of key
				is it unique?
					if so, add it to the return array!
		*/

//		return this.Chars.filter((c) => if key in c);
	}

	buildList(key) {


		// takes a given key, like "Product", and returns an array of all possible values for that key.
		// ...this.Chars = each element in chars
		/* 

		there's a problem though because chars is its own sort of object--
		controls would have to like, know the variable names of the object in ways that Seem Bad.
		What we would want is a way to search the original object.

		*/
	}

};

class Controller {

	constructor() {

	}

	addDropdown(loc, criterion, ref) {

		// adds a dropdown control at loc, sets it to test for criterion, and creates an event listener to see if it's changed
		// ref can be passed in as a source for options

		console.log(ref);

		console.log(ref.getAllValuesForKey(criterion));

		// scroll through the possible options in the bible for that criterion

		$(loc).append("<select name=\"" + criterion + "Dropdown\">" + 
			"<option value=\"" + criterion + "Value\">" + criterion + "</option>");
		console.log("adding a dropdown at " + loc + " that tests for " + criterion);
	}

	addCheckbox(loc, criterion, label) {

		console.log("adding a checkbox at " + loc + " that tests for " + criterion);

		let elementName = criterion + "Checkbox";

		$(loc).append("<input type=\"checkbox\" id=\"" + elementName + "\">" +

			"<label for=\"" + criterion + "Checkbox\">" + label + "</label>");
		$("#" + elementName).on("change", () => {
			console.log("the checkbox at " + elementName + "changed!");
		});
	}
}

//