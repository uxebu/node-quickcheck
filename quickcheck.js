/*jslint nodejs:true */

function arbBool() {
	return Math.random() > 0.5 ? true : false;
}

exports.arbBool = arbBool;

function arbDouble() {
	var sign = Math.random() > 0.5 ? 1 : -1;
	return sign * Math.random() * Number.MAX_VALUE;
}

exports.arbDouble = arbDouble;

function arbInt() {
	var sign = Math.random() > 0.5 ? 1 : -1;
	return sign * Math.floor(Math.random() * Number.MAX_VALUE);
}

exports.arbInt = arbInt;

function arbByte() {
	return Math.floor(Math.random() * 256);
}

exports.arbByte = arbByte;

function arbChar() {
	return String.fromCharCode(arbByte());
}

exports.arbChar = arbChar;

function arbArray(generator) {
	var
		len = Math.floor(Math.random() * 100),
		array = [],
		i;

	for (i = 0; i < len; i++) {
		array.push(generator());
	}

	return array;
}

exports.arbArray = arbArray;

function arbString() {
	return arbArray(arbChar).join("");
}

exports.arbString = arbString;

function forAll(property) {
	var
		generators = Array.prototype.slice.call(arguments, 1),
		fn = function (f) { return f(); },
		i,
		values;

	for (i = 0; i < 100; i ++) {
		values = generators.map(fn);

		if (!property.apply(null, values)) {
			console.log("*** Failed!\n" + values);
			return;
		}
	}

	console.log("+++ OK, passed 100 tests.");
}

exports.forAll = forAll;

function forAllSilent() {
	console.oldLog = console.log;
	console.log = function () {};

	var result = forAll.apply(null, arguments);

	console.log = console.oldLog;

	return result;
}

exports.forAllSilent = forAllSilent;

// Test quickcheck itself
function test() {
	var
		propertyEven,
		propertyNumber,
		propertyTrue;

	propertyEven = function (x) { return x % 2 === 0; };
	console.assert(!forAllSilent(propertyEven, arbByte));

	propertyNumber = function (x) { return typeof(x) === "number"; };
	console.assert(forAllSilent(propertyNumber, arbInt));

	propertyTrue = function (x) { return x; };
	console.assert(!forAllSilent(propertyTrue, arbBool));

	return true;
}

exports.test = test;