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
					"<li>Gender: " + this.charGender + "</li>" +
					"<li>Race: " + this.charRace + "</li>" +
					"<li>Age: " + this.charAge + "</li>" +
					"<li>Body Type: " + this.charBody + "</li>" +
					"<li>Location: " + this.charLocation + "</li>" +
					"<li>Ability: " + this.charAbility + "</li>" +
				"</ul>" +

				"</p></div>" +



				"</div>");

	}

	getPropertyofChar(prop) {

		// takes a property. if allData has that property, will return its value.

		console.log("in getPropertyofChar, looking at " + prop);

		return this.allData[prop];
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

	selectCharactersFromDropdowns(dropdowns, sortrule) {

		let r = new Array;

		dropdowns.forEach(function(e) {
/*
			let dropName = 
			let 

			r.push(this.Chars.filter(s => )
*/
		});


/*
		
		iterate through the passed list of dropdowns
		get the current selector from dropdowns. (with special rules for all)
		
		// take all the characters: this.Chars
			// so for each dropdown in the set:
				get the current value of the dropdown
				pull out only the characters that match that value
				push them onto the final display stack

		// sort alphabetically by name
		// then display what's left as in displayItAll above

*/
	}

	selectProduct(prod) {
		return this.Chars.filter((c) => c.charProduct == prod);
	}

	getAllValuesForKey(key) {

		let r = new Set;

		for (const c in this.Chars) { r.add(this.Chars[c].getPropertyofChar(key)); }

		return r;
	}

};

class Controller {

	constructor() {

		this.dropdowns = new Array;

	}

	getDropdowns() {
		return this.dropdowns;
	}

	addDropdown(loc, criterion, ref) {

		// adds a dropdown control at loc, sets it to test for criterion, and creates an event listener to see if it's changed
		// ref can be passed in as a source for options

		console.log("adding a dropdown at " + loc + " that tests for " + criterion);

		let elementName = criterion + "Dropdown";
		let s = "<select id=\"" + elementName + "\">";
		let dropVals = ref.getAllValuesForKey(criterion);

		console.log(dropVals);

		// scroll through the possible options in the bible for that criterion

		dropVals.forEach(v => s += "<option value=\"" + v + "\">" + v + "</option>");

		s += "<option value=\"All\">Show All</option>";

		$(loc).append(s + "</select>");
		$("#" + elementName).on("change", () => {

			let d = $("#" + elementName + " :selected").val();
			console.log("the dropdown at " + elementName + " changed to " + d + "!");
		});

		this.dropdowns.push(elementName);
	}

	addCheckbox(loc, criterion, label) {

		console.log("adding a checkbox at " + loc + " that tests for " + criterion);

		let elementName = criterion + "Checkbox";

		$(loc).append("<input type=\"checkbox\" id=\"" + elementName + "\">" +

			"<label for=\"" + criterion + "Checkbox\">" + label + "</label>");
		$("#" + elementName).on("change", () => {
			console.log("the checkbox at " + elementName + " changed!");
		});
	}
}

//