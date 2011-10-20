quickcheck - Node.js port of the QuickCheck unit test framework

HOMEPAGE

[http://www.yellosoft.us/quickcheck](http://www.yellosoft.us/quickcheck)

EXAMPLE

	$ npm install quickcheck
	$ node
	> var qc = require("quickcheck");
	> function propertyEven(x) { return x % 2 == 0; }
	> qc.forAll(propertyEven, qc.arbByte);
	*** Failed! 27
	false