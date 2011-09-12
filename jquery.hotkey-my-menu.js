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
			menuItem.html(newHtml);
		} else {
			// We need to traverse some HTML to find a text node, since
			// we do not want to accidentaly emphase html elements,
			// for example "s" in "<span>Shoutbox</span>"
			var mainNode = menuItem.get(0);
			var parentNode;
			while(3 !== mainNode.nodeType) {
				parentNode = mainNode;
				mainNode = mainNode.childNodes[0];
			}
			var span = document.createElement('span');
			span.className = highlightClass;
			span.innerHTML = hotkey;
			parentNode.insertBefore(span, mainNode);
			mainNode.nodeValue = mainNode.nodeValue.substring(1);
		}
		keyFunction(hotkey, function() {
			menuItem.click();
		});
		usedHotkeys.push(hotkey.toLowerCase());
	}

	$('a').bind('click', function(ev) {
		callback($(this), ev);
	});

	// Menu items must have a href and a text content to parse for hotkeys
	var menuItems = menu.find('a').not(':empty');
	menuItems.each(function(index, element) {
		var menuItem = $(this);
		var menuItemText = menuItem.text().trim();
		var lengthOfMenuItemText = menuItemText.length;
		var hotkey = menuItemText.charAt(0);
		var nextTry = 1;
		while($.inArray(hotkey.toLowerCase(), usedHotkeys) != '-1') {
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
