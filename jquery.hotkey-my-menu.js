jQuery.fn.hotkeyMyMenu = function() {
	// @depends on keymaster (https://github.com/madrobby/keymaster)
	// @todo handle multiple menus on the same page
	// @todo handle items which could have had a shortcut if it had came
	// earlier in the hierarchy
	var menu = $(this);

	var menuItems = menu.find('a:not(:empty)');
	var usedHotkeys = [];
	menuItems.each(function(index, element) {
		var menuItem = $(this);
		var hotkey = menuItem.text().substring(0, 1);
		key(hotkey, function() {
			
		});
	});

	return this;
}
