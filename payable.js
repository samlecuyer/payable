/*
 *  Copyright 2012 Sam L'Ecuyer
 */

var contexts = ["editable"];

function insertStringValue(cardNum, editable) {
	// TODO: figure out how to insert the text into the 
	// input box, prompting if necessary
	prompt("Card Number:",cardNum);
}

var visaMenuItem = chrome.contextMenus.create({
	"title": "Generate random VISA", 
	"contexts":contexts, 
	"onclick":  function(info, tab) {
  		var cardNum = generateCC("V");
  		insertStringValue(cardNum, info.editable);
	}
});
	
var discoverMenuItem = chrome.contextMenus.create({
	"title": "Generate random Discover", 
	"contexts":contexts, 
	"onclick":  function(info, tab) {
  		var cardNum = generateCC("D");
  		insertStringValue(cardNum, info.editable);
	}
});
	
var masterCardMenuItem = chrome.contextMenus.create({
	"title": "Generate random MasterCard", 
	"contexts":contexts, 
	"onclick":  function(info, tab) {
  		var cardNum = generateCC("M");
  		insertStringValue(cardNum, info.editable);
	}
});

var amexMenuItem = chrome.contextMenus.create({
	"title": "Generate random AMEX", 
	"contexts":contexts, 
	"onclick": function(info, tab) {
  		var cardNum = generateCC("A");
  		insertStringValue(cardNum, info.editable);
	}
});

var dinersMenuItem = chrome.contextMenus.create({
	"title": "Generate random Diner's Club", 
	"contexts":contexts, 
	"onclick": function(info, tab) {
  		var cardNum = generateCC("DC");
  		insertStringValue(cardNum, info.editable);
	}
});

function generateCC(creditCardType){
	var ccLen = 16,
		ccDigits = new Array(ccLen),
		start = 0;

	switch(creditCardType) {
		case "V":
			ccDigits[start++] = 4;
			break;
		case "D":
			ccDigits[start++] = 6;
			ccDigits[start++] = 0;
			ccDigits[start++] = 1;
			ccDigits[start++] = 1;
			break;
		case "M":
			ccDigits[start++] = 5;
			ccDigits[start++] = Math.floor(Math.random() * 5) + 1;
			break;
		case "DC":
			ccDigits[start++] = 3;
			ccDigits[start++] = 0;
			ccDigits[start++] = Math.floor(Math.random() * 6);
			ccLen = 14;
			break;
		case "A":
			ccDigits[start++] = 3;
			ccDigits[start++] = Math.round(Math.random()) ? 7 : 4 ;
			ccLen = 15;
			break;
    }
    
    ccDigits = ccDigits.slice(0, ccLen-1);
	for (var i = start; i < (ccLen - 1); i++) {
		ccDigits[i] = Math.floor(Math.random() * 10);
	}

	var sum = ccDigits.reduceRight(
			function(p,c,i,a) {
					var digit = c;
					if ((i & 1) == (ccLen & 1)) 
						digit *= 2;
					if (digit > 9) 
						digit -= 9;
					return p + digit;	
			}, 0);

	ccDigits[ccLen - 1] = 10 - (sum % 10);
	return ccDigits.join("");
}