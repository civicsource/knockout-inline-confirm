#Knockout Inline Confirm Binding

> A simple knockout binding that allows you to get a confirmation of action from the user before executing an action.

Read a [full introduction](http://dev.archoninfosys.com/2014/02/knockout-inline-confirm/) to this component with a small demo.

##Install with [Bower](http://bower.io/)

```
bower install knockout-inline-confirm
```

Then add `knockout-inline-confirm.js` to your project.

##How to Use

Include the script on your page (either via a normal script tag or via an AMD loader). Then bind it to a button or a link.

###Confirm a Link Click

```html
<a href="/remove" data-bind="inlineConfirm: ['Remove', 'Are you sure?', 'Removing']"></a>
```

The browser will not navigate to the `/remove` link until the user confirms the action.

###Confirm a Button Action

```html
<button data-bind="inlineConfirm: ['Execute', 'Are you really sure?', 'Executing'], submitFunction: execute"></button>
```

This would allow the user to confirm their action before calling the `execute` function on the view model.


###Working with promises

in the following example
```html
<button data-bind="inlineConfirm: ['Execute', 'Are you really sure?', 'Executing'], submitFunction: execute"></button>
```
if the submitFunction executes asynchronously (an ajax request for example), 'Executing' will not appear when the function is executing unless the function returns the promise object since it does not know to wait until the promise resolves. Ex:

```javascript
this.executeReturningPromise = function () {
			return $.ajax("http://myApi/items", {
				type: "GET",
			}).then(function (data) {
				//do some stuff with the data
			});
		}
```
```html
<button data-bind="inlineConfirm: ['Execute', 'Are you really sure?', 'Executing'], submitFunction: executeReturningPromise"></button>
```
