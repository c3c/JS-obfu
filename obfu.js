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
	"Boolean": '(![])["constructor"]',
	"Function": '[]["filter"]["constructor"]',
	"Array": '[]["constructor"]',
	"Number": '(0)["constructor"]',

	"atob": '[]["filter"]["constructor"]("return atob")()',
	"btoa": '[]["filter"]["constructor"]("return btoa")()',
	"eval": '[]["filter"]["constructor"]'
}

var baseset = {
	" ": '(NaN+[]["filter"])[11]',
	"a": 'false[1]',
	"b": 'Number[12]', // 3+9
	"c": '([]["filter"]+[])[3]',
	"d": 'undefined[2]',
	"e": 'true[3]',
	"f": 'false[0]',
	"g": 'String[14]', // 5+9
	"h": 'atob("aI")',
	"i": '(false+undefined)[10]',
	"j": 'atob("ag")',
	"k": 'atob("ay")',
	"l": 'false[2]',
	"m": 'Number[11]', // 2+9
	"n": 'undefined[1]',
	"o": '(true+[]["filter"]+[])[10]',
	"p": 'atob("cA")',
	"q": 'atob("ca")',
	"r": 'true[1]',
	"s": 'false[3]',
	"t": 'true[0]',
	"u": 'undefined[0]',
	"v": 'atob("dg")',
	"w": 'atob("dy")',
	"x": 'atob("eA")',
	"y": '(NaN+Infinity)[10]',
	"z": 'atob("eg")',
	"A": 'Array[9]',
	"B": 'Boolean[9]',
	"C": 'atob("Qy")', // slow
	"D": 'atob("RA")', //slow
	"E": 'atob("RQ")', //slow
	"F": 'Function[9]',
	"G": 'btoa(0+"f")[1]',
	"H": 'btoa(true)[1]',
	"I": 'Infinity[0]',
	"J": 'btoa(true)[2]',
	"K": 'atob("Sy")',
	"L": 'atob("S"+(0)+"y")[1]',
	"M": 'btoa(0)[0]',
	"N": 'Number[9]',
	"O": 'btoa(8)[0]',
	"P": 'atob("S"+(19)+"Q")[2]', // slow
	"Q": 'btoa("A")[0]',
	"R": 'btoa("F")[0]',
	"S": 'String[9]',
	"T": 'btoa(NaN)[0]',
	"U": 'btoa(false)[6]',
	"V": 'btoa(undefined)[10]',
	"W": 'btoa(Infinity)[1]',
	"X": 'atob("a"+(1)+"i")[1]',
	"Y": 'btoa("a")[0]',
	"Z": 'btoa(false)[0]'
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
	resolve[r] = resolver((r.length > 1 && !(r=="atob"||r=="btoa"||r=="eval")) ? "("+r+"+[])" : r);
}

function resolver(str) {
	str = str.replace(/"[a-z ]+"/gi, makeString);
	str = str.replace(/[0-9]+/, makeNumber);
	str = str.replace(/["a-z\ ]+/gi, function(m) { return resolver(resolve[m]); });
	return str;
}

function translate(str) {
	var tr = "";
	for (var i = 0; i < str.length; i++) {
		var c = str[i]; 
		c = c.replace(/[\[\]\)\(\+\!]/, makeBase);
		c = c.replace(/[a-z ]/gi, function (m) { return makeString('"'+m+'"'); });
		c = c.replace(/[0-9]/, makeNumber);
		c = c.replace(/[^\[\]\)\(\+\!]/, makeBase);
		c = c.replace(/["a-z\ ]/gi, function(m) { return resolver(resolve[m]); });
		tr += c+"+";
	}
	return tr + "[]";
}

function evilize(str) {
	var str = translate(str);
	return resolve["eval"]+'('+str+')()';
}

function makeBase(m) {
	var bt = btoa(m);
	bt = bt.slice(0, bt.indexOf("="));
	var r= resolve["atob"]+'('+resolver('"'+bt+'"')+')';
	return r;
}

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
