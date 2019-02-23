// Star Rating //
-----------------

Initialize:
----------
1. - Add "main.js" to the HTML file:
	<script type="text/javascript" src="js/main.js"></script>

2. - Call "StarRating.create()" function passing the arguments:
	<script> 
		StarRating.create(target, options)
	<\script>
	
 First argument is required, options object is optional

Generated Structure:
-------------------
-root
	-wrapper
		-starContainer
			-stars
		-spanContainer
			-span

Arguments:
----------
1. - targetDiv: String | HTMLElement - Required,
- Required argument
- It can be a string or an already selected HTML Element

2. - options: object - optional
	config props: 
		classes: object - Optional
		initialValue: number - Optional - initial selected stars
  		disabled: boolean - Optional - enable/disable the
  		ratingText string[] - Optional - creates stars and labels based on the lengh (min length: 2) 
  		callback: Function - Optional - it gets called everytime the user click on a star
  	
	classes props:
		spanContainer: string - Optional - add a class to the spanContainer element
		span: string - Optional - add a class to the span element
		root: string - Optional - add a class to the root element
		starContainer: string - Optional - add a class to the startContainer element
		wrapper: string - Optional - add a class to the wrapper element

Examples:
--------

// Default:
StarRating.create('targetDiv');

// Customized:
StarRating.create('targetDiv', options);


// Options:
const options = {
	classes: {
		spanContainer: 'spanContainer',
		span: 'span',
		root: 'root',
		starContainer: 'starContainer',
		wrapper: 'wrapper'
	},
	initialValue: -1,
	disabled: false,
	newRatingText: ['1','2','3','4','5'],
	callback: function(id) { console.log(id); }
};