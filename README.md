#Knockout Inline Confirm Binding

This is a simple knockout binding that allows you to get a confirmation of action from the user before executing an action.

##Install with [Bower](http://bower.io/)

```
bower install knockout-inline-confirm
```

Then add `knockout-inline-confirm.js` to your project.

##How to Use

Include the script on your page (either via a normal script tag or via an AMD loader). Then bind it to a button or a link.

###Confirm a Link Click

```html
<a href="/remove" title="Remove" data-bind="inlineConfirm: ['Remove', 'Are you sure?', 'Removing…']"></a>
```

The browser will not navigate to the `/remove` link until the user confirms the action.

###Confirm a Button Action

```html
<button title="Execute" data-bind="inlineConfirm: ['Execute', 'Are you really sure?', 'Executing…'], submitFunction: execute"></button>
```

This would allow the user to confirm their action before calling the `execute` function on the view model.