jQuery.fn.hotkeyMyMenu = function() {
	// @depends on keymaster (https://github.com/madrobby/keymaster)
	// @todo handle multiple menus on the same page
	// @todo handle items which could have had a shortcut if it had came
	// earlier in the hierarchy
	// @todo apply class on hotkey in menuItem
	// @todo 
	var menu = $(this);

	var menuItems = menu.find('a:not(:empty)');
	var usedHotkeys = [];
	menuItems.each(function(index, element) {
		var menuItem = $(this);
		var menuItemText = menuItem.text();
		var lengthOfMenuItemText = menuItemText.length;
		var hotkey = menuItemText.charAt(0);
		console.log(hotkey);
		var nextTry = 1;
		var safety = 0;
		while($.inArray(hotkey, usedHotkeys) && safety++ < 5) {
			hotkey = menuItemText.charAt(nextTry++);
			console.log(hotkey);
			if(nextTry > lengthOfMenuItemText) {
				break;
			}
		}
		if(!hotkey) {
			return;
		}
		key(hotkey, function() {
			alert("You pressed "+menuItem.text());
			//menuItem.trigger("click");
		});
	});

	return this;
}
