  		// what will we construct the charset from
		var ops = {
			"true": "!![]",
			"false": "![]",
			"NaN": "+[![]]",
			"undefined": "[][[]]",
			"Infinity": "+(+!+[]+(!+[]+[])[!+[]+!+[]+!+[]]+[+!+[]]+[+[]]+[+[]]+[+[]])"
		}

		var classes = {
			"String": '([]+[])["constructor"]',
			"Boolean": 'false["constructor"]',
			"Function": '[]["filter"]["constructor"]',
			"Array": '[]["constructor"]',
			"Number": '(0)["constructor"]',
			"atob": '[]["filter"]["constructor"]("return atob")()',
			"btoa": '[]["filter"]["constructor"]("return btoa")()'
			/*"Date": "window[Date]",
			"Object": "(window[constructor])[constructor]",
			"window": "[][filter][constructor](return this)()"*/
		}

		var baseset = {
			" ": '(NaN+["filter"])[11]',
			"a": 'false[1]',
			"b": 'Number[12]', // 3+9
			"c": '([]["filter"]+[])[3]',
			"d": 'undefined[2]',
			"e": 'true[3]',
			"f": 'false[0]',
			"g": 'String[14]', // 5+9
			"h": 'atob("aI")',
			"i": '(false+undefined)[10]',
			"j": '',
			"k": '',
			"l": 'false[2]',
			"m": 'Number[11]', // 2+9
			"n": 'undefined[1]',
			"o": '(true+[]["filter"]+[])[10]',
			"p": '',
			"q": '',
			"r": 'true[1]',
			"s": 'false[3]',
			"t": 'true[0]',
			"u": 'undefined[0]',
			"v": '',
			"w": '',
			"x": '',
			"y": '(NaN+Infinity)[10]',
			"z": '',
			"I": 'Infinity[0]',
			"N": "Number[9]"
		}

		// We're going to build the charset dynamically by resolving everything against everything (..?)
		// We'll just see if that works

		var resolve = {};
		for (var c in ops) resolve[c] = ops[c];
		for (var c in classes) resolve[c] = classes[c];
		for (var c in baseset) resolve[c] = baseset[c];

		var toresolve = [];
		for (var r in resolve)
			toresolve.push(r);

		for (var r in resolve) {
			resolve[r] = resolver((r.length > 1) ? "("+r+"+[])" : r);
		}

		function resolver(str) {
			str = str.replace(/"[a-z ]+"/gi, makeString);
			str = str.replace(/[0-9]+/, makeNumber);
			str = str.replace(/["a-z\ ]+/gi, function(m) { return resolver(resolve[m]); });
			return str;
		}

		console.log(":"+resolve[" "]+":")
		console.log(resolve["h"]);
		console.log(eval(resolve["h"]));

/*
		var translations = {};
		for (var char in baseset){
			var trans = baseset[char];
			trans = trans.replace(/"[a-z]+"/i, function (m) { var o = []; for (var i = 1; i < m.length-1; i++) { o.push(m[i]); } return o.join('+'); });

			for (var cl in classes) {
				trans = trans.replace(cl, "(" + classes[cl] + "+[])");
			}
			for (var op in ops) {
				trans = trans.replace(op, "(" + ops[op] + "+[])");
			}
			translations[char] = trans.replace(/\d+/g, makeNumber);
		}
		for (var char in baseset){
			var trans = translations[char];
			
			while (/[a-z]/i.test(trans)) {
				trans = trans.replace(/[a-z]/gi, function(m) { return translations[m]; });
				translations[char] = trans;
			}
			
			try {

			console.log(char + " -> " + trans + " -> " + eval(trans));
			} catch(dd) {
				console.log(char + " -> "+ trans)
			}
		}*/

		function makeNumber(num) {
			// if bigger than ...
			var output = "";
			var str = ""+num;
			for (var i = 0; i < str.length; i++) {
				output += "+(+[]";
				for (var j = 0; j < 0+str[i]; j++) {
					output += "+!+[]"
				}
				output += ")"
			}
			return "+([]"+output+")";
		}


		function makeString(m) {
			var o = []; 
			for (var i = 1; i < m.length-1; i++) { 
				o.push(m[i]); 
			} 
			return "(" + o.join('+') + "+[])";
		}


		// This is the base character set that we can use for our funstuff:
		var base = {
			"a": "(![]+[])[+!+[]]",
			"b": "((+[])[([][(![]+[])[+[]]+([![]]+[][[]])[+!+[]+[+[]]]+(![]+[])[!+[]+!+[]]+(!+[]+[])[+[]]+(!+[]+[])[!+[]+!+[]+!+[]]+(!+[]+[])[+!+[]]]+[])[!+[]+!+[]+!+[]]+(!+[]+[][(![]+[])[+[]]+([![]]+[][[]])[+!+[]+[+[]]]+(![]+[])[!+[]+!+[]]+(!+[]+[])[+[]]+(!+[]+[])[!+[]+!+[]+!+[]]+(!+[]+[])[+!+[]]])[+!+[]+[+[]]]+([][[]]+[])[+!+[]]+(![]+[])[!+[]+!+[]+!+[]]+(!![]+[])[+[]]+(!![]+[])[+!+[]]+([][[]]+[])[+[]]+([][(![]+[])[+[]]+([![]]+[][[]])[+!+[]+[+[]]]+(![]+[])[!+[]+!+[]]+(!+[]+[])[+[]]+(!+[]+[])[!+[]+!+[]+!+[]]+(!+[]+[])[+!+[]]]+[])[!+[]+!+[]+!+[]]+(!![]+[])[+[]]+(!+[]+[][(![]+[])[+[]]+([![]]+[][[]])[+!+[]+[+[]]]+(![]+[])[!+[]+!+[]]+(!+[]+[])[+[]]+(!+[]+[])[!+[]+!+[]+!+[]]+(!+[]+[])[+!+[]]])[+!+[]+[+[]]]+(!![]+[])[+!+[]]]+[])[+!+[]+[+!+[]+!+[]]]",
			"c": "([][(![]+[])[+[]]+([![]]+[][[]])[+!+[]+[+[]]]+(![]+[])[!+[]+!+[]]+(!+[]+[])[+[]]+(!+[]+[])[!+[]+!+[]+!+[]]+(!+[]+[])[+!+[]]]+[])[!+[]+!+[]+!+[]]",
			"d": "([][[]]+[])[!+[]+!+[]]",
			"e": "(!+[]+[])[!+[]+!+[]+!+[]]",
			"f": "(![]+[])[+[]]",
			"g": "(![]+[]+(+[])+([]+(!![]+[]))[([][(![]+[])[+[]]+([![]]+[][[]])[+!+[]+[+[]]]+(![]+[])[!+[]+!+[]]+(!+[]+[])[+[]]+(!+[]+[])[!+[]+!+[]+!+[]]+(!+[]+[])[+!+[]]]+[])[!+[]+!+[]+!+[]]+(!+[]+[][(![]+[])[+[]]+([![]]+[][[]])[+!+[]+[+[]]]+(![]+[])[!+[]+!+[]]+(!+[]+[])[+[]]+(!+[]+[])[!+[]+!+[]+!+[]]+(!+[]+[])[+!+[]]])[+!+[]+[+[]]]+([][[]]+[])[+!+[]]+(![]+[])[!+[]+!+[]+!+[]]+(!![]+[])[+[]]+(!![]+[])[+!+[]]+([][[]]+[])[+[]]+([][(![]+[])[+[]]+([![]]+[][[]])[+!+[]+[+[]]]+(![]+[])[!+[]+!+[]]+(!+[]+[])[+[]]+(!+[]+[])[!+[]+!+[]+!+[]]+(!+[]+[])[+!+[]]]+[])[!+[]+!+[]+!+[]]+(!![]+[])[+[]]+(!+[]+[][(![]+[])[+[]]+([![]]+[][[]])[+!+[]+[+[]]]+(![]+[])[!+[]+!+[]]+(!+[]+[])[+[]]+(!+[]+[])[!+[]+!+[]+!+[]]+(!+[]+[])[+!+[]]])[+!+[]+[+[]]]+(!![]+[])[+!+[]]]+[])[(+(+!+[]+[+[]]))+(+(+!+[]+[+[]]))]", /* false0function String */
			"i": "([![]]+[][[]])[+!+[]+[+[]]]",
			"l": "(![]+[])[!+[]+!+[]]",
			"m": "((+[])[([][(![]+[])[+[]]+([![]]+[][[]])[+!+[]+[+[]]]+(![]+[])[!+[]+!+[]]+(!+[]+[])[+[]]+(!+[]+[])[!+[]+!+[]+!+[]]+(!+[]+[])[+!+[]]]+[])[!+[]+!+[]+!+[]]+(!+[]+[][(![]+[])[+[]]+([![]]+[][[]])[+!+[]+[+[]]]+(![]+[])[!+[]+!+[]]+(!+[]+[])[+[]]+(!+[]+[])[!+[]+!+[]+!+[]]+(!+[]+[])[+!+[]]])[+!+[]+[+[]]]+([][[]]+[])[+!+[]]+(![]+[])[!+[]+!+[]+!+[]]+(!![]+[])[+[]]+(!![]+[])[+!+[]]+([][[]]+[])[+[]]+([][(![]+[])[+[]]+([![]]+[][[]])[+!+[]+[+[]]]+(![]+[])[!+[]+!+[]]+(!+[]+[])[+[]]+(!+[]+[])[!+[]+!+[]+!+[]]+(!+[]+[])[+!+[]]]+[])[!+[]+!+[]+!+[]]+(!![]+[])[+[]]+(!+[]+[][(![]+[])[+[]]+([![]]+[][[]])[+!+[]+[+[]]]+(![]+[])[!+[]+!+[]]+(!+[]+[])[+[]]+(!+[]+[])[!+[]+!+[]+!+[]]+(!+[]+[])[+!+[]]])[+!+[]+[+[]]]+(!![]+[])[+!+[]]]+[])[+!+[]+[+!+[]]]",
			"n": "([][[]]+[])[+!+[]]",
			"o": "(!+[]+[][(![]+[])[+[]]+([![]]+[][[]])[+!+[]+[+[]]]+(![]+[])[!+[]+!+[]]+(!+[]+[])[+[]]+(!+[]+[])[!+[]+!+[]+!+[]]+(!+[]+[])[+!+[]]])[+!+[]+[+[]]]",
			"r": "(!![]+[])[+!+[]]",
			"s": "(![]+[])[!+[]+!+[]+!+[]]",
			"t": "(!![]+[])[+[]]",
			"u": "([][[]]+[])[+[]]",
			"y": "(+[![]]+[+(+!+[]+(!+[]+[])[!+[]+!+[]+!+[]]+[+!+[]]+[+[]]+[+[]]+[+[]])])[+!+[]+[+[]]]",
		}
