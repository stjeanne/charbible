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

const DD_ALL_SELECTOR = "Show All";


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

	displayChar(loc) {									

		// writes HTML to display this character at a given screen location.

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

		// takes a property. if this character's allData has that property, will return its value. (right now it's super lazy and not error proof)

		console.log("in getPropertyofChar, looking at " + prop);

		return this.allData[prop];
	}
}

class Bible { 	// encapsulates the character data

	constructor(file, res) {

		let self = this;
		this.Chars = [];


		$.getJSON(file, function(data) {

			console.log("loaded data as follows:");
			console.log(data);

			$.each(data, function(key,val) {
				self.Chars.push(new Character(val));
			});
			res();

		})
	}

	displayItAll(loc, prod, sortrule) {

		// displays all characters at a location

		console.log("let's show the whole bible!");

		$(loc).html("");


		this.Chars.forEach((c) => {
			c.displayChar(loc);
		});

	}

	displayChars(loc, chars, sortrule) {

		// displays a set of chars at a location.

		console.log("let's try showing just the chars we send it");

		chars.forEach(c => c.displayChar(loc));
	}

	eraseAllChars() {

		// erases any character data from the entire page!

		console.log("ERASING all characters!");
		$(".char").remove();
	}

	selectCharactersFromDropdowns(dropdowns, sortrule) {

		// based on the current state of the dropdowns, selects just the characters that meet the criterion

		let r = new Set;	// set that is the return value
		let self = this;
		let testChars = this.Chars;	// we'll start with all the characters

		dropdowns.forEach(function(e) {


			let whichProperty = e.replace("Dropdown","");
			let currentValue = $("#" + e + " :selected").val();	// get the current value of the dropdown

			if (currentValue != DD_ALL_SELECTOR) {	// if it equals "Show All", it doesn't change value
				testChars = testChars.filter(s => s.allData[whichProperty] == currentValue);
			}

		});

		testChars.forEach(c => r.add(c));
		return r;
	}

	selectProduct(prod) {

		// selects only the characters from a given product. (probably this is kinda legacy now)

		return this.Chars.filter((c) => c.charProduct == prod);
	}

	getAllValuesForKey(key) {

		// goes into the character array and pulls out all the properties for the given dropdown key. used to populate dropdown options.

		let r = new Set;

		for (const c in this.Chars) { r.add(this.Chars[c].getPropertyofChar(key)); }

		return r;
	}

	updateScreen(loc,dropdowns,rule) {

		// implementation of the updateScreen method from controller for the event handler. removes all existing characters + displays the current ones.

		this.eraseAllChars();
		this.displayChars(loc, this.selectCharactersFromDropdowns(dropdowns, rule));
	}

};

class Controller {

	constructor() {

		this.dropdowns = new Array;

	}

	getDropdowns() {
		return this.dropdowns;
	}

	getDropdownValueByName(name) {
		return $("#" + name + " :selected").val();
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

		s += "<option value=\"" + DD_ALL_SELECTOR + "\">" + DD_ALL_SELECTOR + "</option>";

		dropVals.forEach(v => s += "<option value=\"" + v + "\">" + v + "</option>");


		$(loc).append(s + "</select>");

		this.dropdowns.push(elementName);

		$("#" + elementName).on("change", () => {

			let d = $("#" + elementName + " :selected").val();
			console.log("the dropdown at " + elementName + " changed to " + d + "!");
			ref.updateScreen("#charlist",this.dropdowns);									// THIS WILL MAKE A BUG if this is ever applied to another div; sorry I'm not a good programmer!
		});


	}

	addCheckbox(loc, criterion, label) {

		// currently this doesn't work at all. one day it might!

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