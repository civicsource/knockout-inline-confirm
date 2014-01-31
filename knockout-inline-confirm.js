(function (root, factory) {
	if (typeof define === 'function' && define.amd) {
		// AMD. Register as an anonymous module.
		define(["jquery", "knockout"], factory);
	} else {
		// Browser globals
		root.amdWeb = factory(jQuery, ko);
	}
}(this, function ($, ko) {
	ko.bindingHandlers.inlineConfirm = {
		init: function (element, valueAccessor, allBindingsAccessor, viewModel) {
			var span = $('<span></span>').addClass('button__text');
			span.appendTo($(element));

			$(element).click(function () {
				var textValues = ko.utils.unwrapObservable(valueAccessor());
				var submitFunction = ko.utils.unwrapObservable(allBindingsAccessor().submitFunction);
				var timeOut = ko.utils.unwrapObservable(allBindingsAccessor().confirmTimeout) || 3000;
				var disabled = ko.utils.unwrapObservable(allBindingsAccessor().disable);

				if (!disabled) {
					var stepIndex = textValues.indexOf(span.text());
					if (stepIndex < textValues.length - 2) {
						element.resetTimer = setTimeout(function () {
							span.text(textValues[stepIndex]);
						}, timeOut);

						span.text(textValues[stepIndex + 1]);
					}
					else if (stepIndex === textValues.length - 2) {

						if (element.resetTimer) {
							clearTimeout(element.resetTimer);
							element.resetTimer = null;
						}

						$(element).addClass("is-busy");
						span.text(textValues[textValues.length - 1]);

						if (submitFunction) {
							if (typeof (submitFunction) !== 'function') {
								throw new typeError('expected typeof "submitFunction" to be "function"');
							}
							submitFunction.call(ko.dataFor(this));
						}
					}
				}

				//let the click continue
				return !submitFunction && !disabled;
			});
		},
		update: function (element, valueAccessor, allBindingsAccessor, viewModel) {
			var span = $(element).find('.button__text');
			span.text(ko.utils.unwrapObservable(valueAccessor())[0]);
			$(element).removeClass("is-busy");
		}
	};
}));