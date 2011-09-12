// @depends on keymaster (https://github.com/madrobby/keymaster)
jQuery.fn.hotkeyMyMenu = function(options) {
	// @todo handle multiple menus on the same page
	// @todo handle items which could have had a shortcut if it had came
	// earlier in the hierarchy
	// @todo apply class on hotkey in menuItem
	// @todo pass in exceptions which can't be hotkeyed (since they're already defined by something else, etc)
	// @todo 
	var menu = $(this);

	// Default callback, follow a links href attribute
	var callback = function(jqueryAElement, event) {
		window.location = jqueryAElement.attr('href');
	}
	if(options && 'function' === typeof options.callback) {
		callback = options.callback;
	}

	var highlightClass = 'hotkeyed';
	if(options && 'string' === typeof options.highlightClass) {
		highlightClass = options.highlightClass;
	}

	var keyFunction;
	if(options && 'function' === typeof options.keyFunction) {
		keyFunction = options.keyFunction;
	} else if('function' === typeof window.key) {
		console.log(window.key);
		keyFunction = window.key;
	} else {
		throw "hotkeyMyMenu depends on keymaster (github.com/madrobby/keymaster). If it's not in window.key, pass it in as an option with {keyFunction: key(){}}"
	}

	var usedHotkeys = [];
	var applyHotkey = function(menuItem, hotkey) {
		var oldHtmlContent = menuItem.html();
		var oldTextContent = menuItem.text();
		var template = '<span class="'+highlightClass+'">%content</span>';
		if(oldTextContent == oldHtmlContent) {
			// The menuItem does not contain html
			var newHtml = oldTextContent.replace(hotkey, template.replace('%content', hotkey));
		} else {
			throw "not yet implemented";
			// Do not accidentaly emphase html elements, for example "s" in "<span>Shoutbox</span>"
		}
		menuItem.html(newHtml);
		keyFunction(hotkey, function() {
			menuItem.click();
		});
		usedHotkeys.push(hotkey.toLowerCase());
	}

	$('a').bind('click', function(ev) {
		callback($(this), ev);
	});

	// Menu items must have a href and a text content to parse for hotkeys
	var menuItems = menu.find('a[href!=""]:not(:empty)');
	menuItems.each(function(index, element) {
		var menuItem = $(this);
		var menuItemText = menuItem.text().trim();
		var lengthOfMenuItemText = menuItemText.length;
		var hotkey = menuItemText.charAt(0);
		var nextTry = 1;
		var safety = 0;
		while($.inArray(hotkey.toLowerCase(), usedHotkeys) != '-1' && safety++ < 5) {
			hotkey = menuItemText.charAt(nextTry++);
			if(nextTry > lengthOfMenuItemText) {
				console.log("Skipping "+menuItemText+" since all letters are already used");
				return;
			}
		}
		applyHotkey(menuItem, hotkey);
	});

	return this;
}
