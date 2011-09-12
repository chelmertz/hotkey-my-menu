# hotkey-my-menu

Generates and listens to hotkeys for your menu.

## dependencies

- `key()`, see https://github.com/madrobby/keymaster

## usage

```javascript
$('#my_menu').hotkeyMyMenu();
```

See the bundled demo.html

## API options

Pass in options like this

```javascript
$('#my_menu').hotkeyMyMenu({
	callback: function() {},
	highlightClass: string,
        keyFunction: function() {},
});
```

- `callback(jqueryAElement, event)`
  - defaults to following a link via setting `window.location`, but it can listen to sliding in content etc. See demo2.html
- `highlightClass`
  - defaults to *hotkeyed*. Applied to the letter which indicates the hotkey
- `keyFunction`
  - defaults to `window.key`, needs to point to the keymaster library
