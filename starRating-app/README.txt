// Star Rating //
-----------------

Initialize:
----------
1. - Add "main.js" to the HTML file:
	<script type="text/javascript" src="js/main.js"></script>

2. - Call "StarRating.create()" function passing the arguments:
	<script> 
		StarRating.create(args)
	<\script>
	
// First argument is required, the rest are optional //


Arguments:
----------
1. - targetDiv: String | HTMLElement - Required,
- Only required arugment
- It can be a string or an already selected HTML Element


2. - backgroundColor: string = '#ef7d22' - Optional
- Default color is VideoSmart Orange
- It takes a string - use any hexcolor code or default css color name


3. - fontColor: string = '#fff' - Optional
- Default color is White
- It takes a string - use any hexcolor code or default css color name


4. - initialValue: number - Optional
- Default value is -1 means stars are not selected
- Range 0 - 4


5. - isEnabled: boolean = true - Optional
- Default value is true
- It takes a bollean value


6. - callback: Function = undefined - Optional
- Callback takes an argument that is the selected star's index
- Range 0 -4


Examples:
-------
// Create Rating using "Default Setup" //
StarRating.create('targetDiv-1');


// Create Rating with "Green Background Color" //
StarRating.create('targetDiv-2', '#0f0');


// Create Rating with "Purple Font Color" //
StarRating.create('targetDiv-3', undefined, purple);


// Create Rating with "Default Color and the 3. Star Selected" //
StarRating.create('targetDiv-4', undefined, undefined, 2);


// Create Rating with "Default colors and a Disabled Rating" //
StarRating.create('targetDiv-5', undefined, undefined, undefined, false);


// Create Rating with "Callback Function only" //
StarRating.create('targetDiv-6', undefined, undefined, undefined, undefined, (e) => { console.log('Show index:', e)});


// Create Rating with "Blue Blackground Color, Black Font Color, 3 Stars Selcted, Disabled and a Callback Function" //
StarRating.create('targetDiv-7', blue, black, 2, false, (e) => { console.log('Show index:', e)});