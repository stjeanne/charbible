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

	displayChars(loc, chars, sortrule) {
		console.log("let's try sorting just the chars");

		chars.forEach(c => c.displayChar(loc));
	}

	eraseChars(loc) {
		console.log("ERASING the old characters at " + loc);
		$(loc + ".char").remove();
	}

	eraseAllChars() {
		console.log("ERASING all characters!");
		$(".char").remove();
	}

	selectCharactersFromDropdowns(dropdowns, sortrule) {

		let r = new Set;	// set that is the return value
		let self = this;
		let testChars = this.Chars;	// we'll start with all the characters

		dropdowns.forEach(function(e) {


			let whichProperty = e.replace("Dropdown","");
			console.log("in select Chars from Drops, logging the property we look for as " + whichProperty);

			let currentValue = $("#" + e + " :selected").val();	// get the current value of the dropdown

			console.log("the dropdown is currently " + currentValue);

			if (currentValue != DD_ALL_SELECTOR) {	// if it equals "Show All", it doesn't change value

				testChars = testChars.filter(s => s.allData[whichProperty] == currentValue);
				console.log("the filter made the test array into the following: "); 
				console.log(testChars);
			}

		});

		testChars.forEach(c => r.add(c));
		return r;

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

	updateScreen(loc,dropdowns,rule) {
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