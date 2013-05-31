
Problems with Polymer:

I haven't found a way to separate HTML and JavaScript within the element:

* Loading an external stylesheet does not work
* Loading it in JavaScript will probably ruin the Shadow DOM

So this is a major drawback to "big" components.

CORS stylesheet lookup only works when using CSS @import directives inline.