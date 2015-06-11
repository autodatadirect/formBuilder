/**
 * I couldn't find them in the API.
 * https://selenium.googlecode.com/git/docs/api/py/webdriver/selenium.webdriver.common.keys.html#selenium.webdriver.common.keys.Keys.F4
 */

module.exports = function(app){
	app.Keys = {
		ADD: "u'\ue025'",
		ALT: "u'\ue00a'",
		ARROW_DOWN: "u'\ue015'",
		ARROW_LEFT: "u'\ue012'",
		ARROW_RIGHT: "u'\ue014'",
		ARROW_UP: "u'\ue013'",
		BACKSPACE: "u'\ue003'",
		BACK_SPACE: "u'\ue003'",
		CANCEL: "u'\ue001'",
		CLEAR: "u'\ue005'",
		COMMAND: "u'\ue03d'",
		CONTROL: "u'\ue009'",
		DECIMAL: "u'\ue028'",
		DELETE: "u'\ue017'",
		DIVIDE: "u'\ue029'",
		DOWN: "u'\ue015'",
		END: "u'\ue010'",
		ENTER: "u'\ue007'",
		EQUALS: "u'\ue019'",
		ESCAPE: "u'\ue00c'",
		F1: "u'\ue031'",
		F10: "u'\ue03a'",
		F11: "u'\ue03b'",
		F12: "u'\ue03c'",
		F2: "u'\ue032'",
		F3: "u'\ue033'",
		F4: "u'\ue034'",
		F5: "u'\ue035'",
		F6: "u'\ue036'",
		F7: "u'\ue037'",
		F8: "u'\ue038'",
		F9: "u'\ue039'",
		HELP: "u'\ue002'",
		HOME: "u'\ue011'",
		INSERT: "u'\ue016'",
		LEFT: "u'\ue012'",
		LEFT_ALT: "u'\ue00a'",
		LEFT_CONTROL: "u'\ue009'",
		LEFT_SHIFT: "u'\ue008'",
		META: "u'\ue03d'",
		MULTIPLY: "u'\ue024'",
		NULL: "u'\ue000'",
		NUMPAD0: "u'\ue01a'",
		NUMPAD1: "u'\ue01b'",
		NUMPAD2: "u'\ue01c'",
		NUMPAD3: "u'\ue01d'",
		NUMPAD4: "u'\ue01e'",
		NUMPAD5: "u'\ue01f'",
		NUMPAD6: "u'\ue020'",
		NUMPAD7: "u'\ue021'",
		NUMPAD8: "u'\ue022'",
		NUMPAD9: "u'\ue023'",
		PAGE_DOWN: "u'\ue00f'",
		PAGE_UP: "u'\ue00e'",
		PAUSE: "u'\ue00b'",
		RETURN: "u'\ue006'",
		RIGHT: "u'\ue014'",
		SEMICOLON: "u'\ue018'",
		SEPARATOR: "u'\ue026'",
		SHIFT: "u'\ue008'",
		SPACE: "u'\ue00d'",
		SUBTRACT: "u'\ue027'",
		TAB: "u'\ue004'",
		UP: "u'\ue013'"
	};

	// Mouse buttons
	app.Buttons = {
		LEFT: 0,
		MIDDLE: 1,
		RIGHT: 2
	};

};