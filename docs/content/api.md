# Widgets
All widgets are created using jQuery UI's [Widget Factory](http://api.jqueryui.com/jQuery.widget/) and they inherit all of the options, methods, and events of the base widget.

## formBuilder
Base form widget. For many applications, this is the only widget needing direct use. Other field widgets are created automatically and handled inside of this widget.

* Options
    - **ignoreHidden** *(boolean)* Ignore fields that are not `$(:visible)`. They will not be validated nor will any data be retrieved from them. **Default:** `false`
    - **defaultRequired** *(boolean)* Sets the default required option for all fields. Does not override field required statuses set with the data-required attribute.**Default:** `false`
    - **loadHidden** *(boolean)* Hides the form while it is being setup, then shows it. **Default:** `true`
    - **converter** *(object)*
        + **fromForm(*object* data)** Form data is passed through this method when retrieving it from the form. Returns data by default.
        + **toForm(*object* data)** Form data is passed through this method when passing it to the form. Returns data by default. 
* Methods (public)
    - **scanForNewFields()** Checks inside of the form container for new fields and constructs them. Called once automatically when initialized. 
    - **isDirty()** Runs dirty checks and returns boolean result.
    - **clearDirty()** Clears all dirty field states. Use this after saving dirty field data. 
    - **flashDirty(*integer* numberOfTimes)** *Deprecated.* Use `flashError(numberOfTimes)` instead.
    - **flashError(*integer* numberOfTimes)** Filters fields and calls the `inputField.flash(numberOfTimes)` on each incorrect one.
    - **disable()** Disables the status. Calls the `inputField.status(disable, true)` on the current calling object. 
    - **enable()** Enables the status. Calls the `inputField.status(disable, true)` on the current calling object.
    - **get()** Returns converted form data from all fields. 
    - **clear()** Runs inputField.clear() for each field. Empties the form.
    - **conflicts(*object* data, *boolean* ignoreKeys)** TODO
    - **set(*object* data, setOptions)** Replaces the values in the DOM with the given data. Triggers `beforeset` and `afterset` events.
    - **get()** Returns converted form data from all fields. 
    - **validate()** Runs all enabled field validations. Returns true/false for valid/invalid.
    - **getFields()** Returns all the fields of the calling object.
* Methods (private)
    - **_create()** Creates a new formBuilder object and initializes attributes.  
    - **_convertFormData(*object* data)** Clones the data object so that the method can not change the original data and then formats the data by calling `toForm()`` and returning the converted data.
    - **_destroy()** Breaks down the fields by either calling `inputField.destroy()` method or `_proxyCommandToWidget($(this), destroy)` depending on whether the current object is an inputField or a widget.
    - **_writeDataToDom(*object* data, setOptions)** Writes data to the Dom by either calling `inputField.set(util.selectPath(data, $(this).attr('name')), setOptions)` method or `_proxyCommandToWidget($(this), 'set', util.selectPath(data, $(this).attr('name')), setOptions)`.
    - **_readDataFromDom()** Reads data from the Dom and returns it.
* Events
    - **beforeset(*object* formData)** *Optional* Called before `set(data, setOptions)` replaced the form values. **Default:** undefined
    - **afterset(*object* formData)** *Optional* Called after `set(data, setOptions)` replaces the form values. **Default:** undefined

## inputField
Builds a base input object that is able to get, set, and modify data based on what the type of the input is.

* Options
    - **type** *(string)* Field type from `types[]`. **Default:** `'text'`
    - **label** *(string)* Label that will go above the inputField.
    - **require**, **required** *(boolean)* Whether or not the field is required for submission. **Default:** `false`
    - **placeholder** *(string)* Text displayed inside of an empty inputField. **Default** ' ' 
    - **min** *(integer)* Minimum amount of input required.
    - **max** *(integer)* Maximum amount of input allowed.
    - **error** *(string)* Error message that will be displayed if there is an error. **Default** 'error'
* Methods (public)
    - **setLabel(*string* label)** Prepends the given label to the top of the inputField.
    - **setSuffix(*string* t)** Sets text (t) that will be displayed at the end of the inputField once the user has started typing.
    - **setPrefix(*string* t)** Sets text (t) that will be displayed at the front of the inputField once the user has started typing.
    - **setMax(*integer* max)** Sets the maximum size that the input can be.
    - **checkDirty()** Determines whether the data-dirty is supposed to be true or false in that moment of typing.
    - **isDirty()** Returns the value of data-dirty (true/false).
    - **addOn(*integer* weight, *html* HTML, *string* className)** Appends given HTML around form field based on weight. If no input is found, it will be appended to the items layer.
    - **placeholder(*string* s)** If there is no placeholder it will be hidden, otherwise it will dispaly the given text (s) while the inputField is empty. 
    - **clear()** Calls `clearDirty()`. Clears all input. 
    - **clearDirty()** Resets the dirty status to false. 
    - **conflicts(*string* value)** TODO 
    - **set(*string* value, setOptions)** Replaces the values in the DOM with the given data. Triggers `afterset` event.
    - **get()** Returns converted inputField value.
    - **value(*string* value)** If the value passed in is undefined then return the converted form data from all fields, otherwise set the value into the form. 
    - **isEmpty()** If the type declares an isEmpty method then return the result of that method. Otherwise return `$.trim(self.element.val()) === ''`. Determines if the inputField contains any data. 
    - **validate(*boolean* skipRequired)** Validates that the input matches the declared type, but only if the inputField is not empty and skipRequired is true.
    - **flash(*integer* numberOfTimes)** Flashes an error message to the screen according to the 'numberOfTimes' that have been passed into the method.
    - **setError(*string* err)** Sets the error message passed in into the error label overlay. Sets error status to true. 
    - **clearError()** Sets autoValidate to blur. Sets error status to false. 
    - **redraw()** Re-enters all of the previous saved information into the form. 
    - **setType(*string* sType)** If the type doesn't exist, sets it to default of 'text'. If it does exist then run the type's teardown() method. Then set the inputField type and run the type's setup. 
    - **getType()** Returns the type object. 
    - **hide()** Hides the field
    - **show(displayValue)** Displays the value that is passed into the method, or just shows the field.
    - **getField()** Returns the `.input-field` container element.
    - **enable()** Removes the field from the disable status.
    - **disable()** Puts the field in the disable status. The option will become unselectable.
    - **isDisabled()** Returns true/false for if the field is in/out of the disabled state.
    - **status(*string* statusName, *boolean* bool, *boolean* fireEvents)** Sets the status class to the field and runs any updates to the field needed. 
    - **updateStatus(*string* statusName, *boolean* bool, *boolean* fireEvents)** legacy code that calls the **status(statusName,bool,fireEvents)** method.
    - **hasStatus(*string* statusName)** Returns the current object's state for the status name that was passed into the method. 
* Methods (private)
    - **_create()** Creates a new inputField object and initializes attributes. Loads data to the Dom, creates a tooltip if it has been given. Can convert the simple input into the full field format by wrapping it in the appropriate divs. Initializes the different statuses to their appropriate values.   
    - **_onKeydown(*event* ev)** When the keydown event occurs calls `_showLayer('placeholder', false)`.
    - **_onKeyup(*event* ev)**  When the keyup event occurs, will validate if self.autoValidate is equal to 'keyup'. Then calls `checkDirty()` and `redraw()`.
    - **_onBlur(*event* ev)** When the blur event occurs, will validate if self.autoValidate is equal to 'blur'.
    - **_init()** Automatically called when inputField is created. Sets the current element's value attribute. 
    - **_formatToField(*string* value)** If the value is null or undefined, returns the value. If there is no type, no type converter, and no converter method for the type, then returns the value. Otherwise, returns `type.converter.toField.call(type, value, self)`.
    - **_formatFromField(*string* value)** If there is no type, no type converter, and no converter method for the type, then returns the value. Otherwise, returns `type.converter.fromField.call(type, value, self)`.
    - **_showLayer(*string* layer, *boolean* show)** Makes the layer that has been passed in visible. 
    - **_destroy()** If the current type has a tearDown method then call it. 
* Events 
    - **dirty** *Optional* Triggered if the form has been changed but not saved.
    - **clean** *Optional* Triggered if the form's current value equals the previous value, and the form has been correctly saved. 
        + Also triggered in the clearDirty() method.
    - **afterset(null, [val, value])** *Optional.* Called after `set()` replaces the form values **Default:** (undefined).


## inputFilter
Filters through the input in the inputField and, based on the type of the input, validates that it has been entered correctly. If incorrect input is typed it will not allow the input to be entered or displayed. 

* Options
    - **toUpper** *(boolean)* Flag to determine if the type is utext and only uppercase will be displayed. **Default:** 'false'
    - **max** *(integer)* Largest input that is allowed in the form field. **Default:** '0'
    - **pattern** *(regex)* The pattern that the input will be checked against for validity. **Default:** '/[\w\s]/'
* Methods (public)
    - **setMax(*integer* max)** Sets the current object's max variable to the integer that is passed into the method.
    - **setPattern(*regular expression* regex)** Sets the pattern of the current object to the regular expression passed into the method. 
    - **nextArrayFieldId()** Returns the arrayField Id incremented by one. 
* Methods (private)
    - **_create()** Creates an inputFilter and initializes events and statuses.
    - **_onPaste(*event* ev)** Calls `$.proxy(this._clean, this)` with setTimeout.
    - **_onKeyDown(*event* ev)** Detects when the native change event will be fired.
    - **_onKeyPress(*event* ev)** Bypasses command keys, returns false if the correct key is not pressed.
    - **_clean()** Retypes all the characters in the field so that they are passed through the filter.
    - **_type(*string* text)** Manually enters the given text into the input field obeying the regular expression and triggering events when characters are ignored.
    - **_destroy()** removes the inputFilter from the current element
* Events
    - **keyignored** *Optional* Ignore the character that has been entered if it is not valid for the current type
    - **keytyped** *Optional* If the character entered is valid for the current type then enter it into the formfield

## submitButton
Widget that handles the creation of a submit button and the spinner that accompanies it. The submit button can be clicked and the spinner will be displayed while the data is being submitted. 

* Options
    - **color** *(string)* Color of loading spinner. **Default:** '#000'
    - **delay** *(int)* Delay between UI update and submission call, in milliseconds. **Default:** 10
    - **disabled** *(boolean)* Prevents form submission. **Default:** false
    - **waiting** *(boolean)* Prevents default form submission. **Default:** false
    - **preventDefault** *(boolean)* Prevents default form submission. **Default:** true
    - **enterKeyListenerProvider()** *method* Returns `this.parents('form').first()`
    - **onKeyDown(*event* ev)** *method* If the correct key has been pressed in the text area then submit the event on the current calling object. 
* Methods (public)
    - **enable()** Sets `disabled` to false.
    - **disable()** Sets `disabled` to true.
    - **getButtonLabel()** Returns the label of the button.
    - **submit()** Begins submission process as if the button was clicked.
* Methods (private)
    - **_showLoading()** Shows the spinner while the data is submitting.
    - **_hideLoading()** Hides the spinner after the data has completed its submission.
    - **_create()** creates the spinner, appends it to the correct location on the form, and wraps it in the appropriate html.
    - **_destroy()** Removes the submitButton from the current element.
* Events
    - **beforesubmit(*event* ev)** *Optional* Called before a submit, if false it does not submit.
    - **submit(*event* ev)** *Required* Called to submit the code.
        + Not called if in a `disabled` or `waiting` state. 
        + Write your Ajax or other form submission here.
        + Must call `finish()` after completed.
    - **aftersubmit(*event* ev)** *Optional* Called after the submit returns.
        + Clean up form here.

## fieldWidget
Available to be modified in order to accept new types that the user wishes to develop. Many of these methods are intended to perform in a similar way as methods in the inputField widget but they can be overwritten by user if desired to meet specific requirements. This template is stored inside of inputField widget and commented out. 

* Available Methods 
    - **isDirty()** Returns false.
    - **validate()** Returns true.
    - **clearDirty()**
    - **clear()** Calls `set()`.
    - **flash()**
    - **set(data)**
    - **get()** Returns null.


## selectionField
Handles checkboxes and radio buttons, allowing them to be used like inputFields with formBuilder features. Only radio buttons will have a radioGroup attatched to .

* Options
    - **require** || **required** *(boolean)* Whether or not the field is required for submission. **Default:** `false`
    - **label** *(htmlString)* The label to be displayed for the checkbox or radio button. Not required, but recommended.
    - **radioGroup** *(jqueryObject[])* An array of radio inputs jquery objects that have the same name. Only radio buttons need a radioGroup and must contain the widget element. If there no radioGroup is given, a new one will be created soley of the widget element. All other elements in the radioGroup must be initialized as selectionFields either before or after the initialization of the widget element.
* Methods (public)
    - **setLabel(*string* newLabel)** Sets the label html. Creates a new label if one does not exist.
    - **checkDirty()** Updates the dirty/clean status based upon the previous set value. Fires dirty/clean events when the status is changed and updates other selectionFields in the radioGroup if necessary.
    - **isDirty()** Returns current dirty state as a boolean.
    - **clear()** Unchecks the option, clears the dirty state, and resets the previous set value. Applies to all options in the radioGroup.
    - **clearDirty()** Sets the dirty state to false and triggers a `clean` event. Applies to all options in the radioGroup.
    - **conflicts(value)** TODO
    - **set(value)** Unchecks or checks checkboxes based on `!!value`. Unchecks all radios in the radioGroup and then checks the option that has the matching value. If no matching option is found, no option is checked.  The prevous value is then set to the passed value and the `afterset` event triggered.
    - **get()** Returns the true/false for checked/unchecked checkboxes. Returns the value of the checked option in a radioGroup, or undefined if no option is selected.
    - **validate()** Validates the field and returns true/false for valid/invalid. When invalid, the field will enter the error status.
    - **hide()** Hides the field
    - **show()** Shows the field
    - **getField()** Returns the `.selection-field` container element.
    - **enable()** Removes the field from the disable status.
    - **disable()** Puts the field in the disable status. The option will become unselectable.
    - **isDisabled()** Returns true/false for if the field is in/out of the disabled state.
    - **status(*string* statusName, *boolean* newValue, *boolean* fireEvents)** Sets the status with statusName to newValue and update the field if needed. All fields in the radioGroup will be updated. The `statusUpdate` event will be triggered if fireEvents is set to true.
    - **hasStatus(*string* statusName)** Returns whether or not the field has the status with statusName.
* Methods (private)
    - **_create()** Widget constructor.
    - **_updatePreviousValue** Syncs the prevValue with the radioGroup.
    - **_destroy** Widget destructor. Will also destroy any other selectionWidgets in the radioGroup.
* Events
    - **dirty** Triggered when the field enters the dirty state.
    - **clean** Triggered when the field leaves the dirty state.
    - **afterset(null,value)** Triggered after a new value has been set. 
    - **statusUpdate(null,{statusName:*string*, value:*boolean*})** Triggered after a status has been changed.


## arrayField
Creates an array of inputFields and other widgets and can perform methods on the array as a whole, including validation and clear. The array field should contain one type of input field and can have as many or as few inputs as the user desires. The arrayField widget will create an array of the data that is contained within each of the inputFields within it.

* Methods (public)
    - **getId()** Return the id of the current calling object.
    - **isDirty()** Returns current dirty value (true/false).
    - **getFieldInstances()** Returns an array of field instances.
    - **get()** Returns an array of the data in the current arrayField.
    - **validate()** Calls `inputField.validate()` to validate the input in the array field, returns true/false if arrayField is valid or not.
    - **clearDirty()** Resets the current dirty status to false.
    - **clear()** Resets the calling object to an empty array.
    - **flash()** Calls the `inputField.flash()` to flash the error message to the screen. 
    - **set(data)** Appends a new item, set with the data that is passed into the method, to end of the array.
    - **addItem(*integer* index, item)** Adds a new item to the location of the index passed into the method, if no index is defined then append to the end of the array.
    - **drawItem(item)** Draws the item based on its template and whether or not it is a subwidget.
    - **subFieldMarkup()** Returns the subField.
* Methods (private)
    - **_create()** Creates the arrayField based off of the template that the user wishes to apply and fills out the appropriate elements.
    - **_handleAddButtonClick()** If the 'beforeaddnewitem' event has been triggered then call `addItem()`.
    - **_checkDirty()** Determines whether the data-dirty is supposed to be true or false in that moment of typing. 
    - **_onDirty()** Will return if dirty, otherwise will call `_checkDirty()`.
    - **_onClean()** Performs the same function as _onDirty().
    - **_empty()** Clears the array and calls the children's destroy methods.
    - **_drawInternalMarkupItem(item, *template* itemView)** Called when the item is not a subwidget. Triggers 'beforeadd' event. Draws it and wraps it with the appropriate html and parents.
    - **_drawWidgetItem(item, *template* itemView, *widget* subWidget)** Called when the item is a subwidget. Triggers 'beforeadd'. Draws the subwidget inside of the relevant widget.
    - **_destroy()** Removes everything from the array and returns it to its original state. 
* Events
    - **beforeadd** *Optional* Triggered before adding an item that is not a new item.
    - **beforeaddnewitem** *Optional* Triggered before a new item is added to the array, prepares the array for a new item.
    - **afteradd** *Optional* Triggered after adding an item to the array to ensure that the array has handled adding the item correctly.
    - **afterdelete** *Optional* Triggered after deleting an item from array to make sure that array has handled deletion correctly.

## dropDownPanel
Drop down panel widgets may be used to add an extra hovering container to any element. Drop downs are shown when a user clicks on the target element, and/or focuses (if possible) on the focusTarget element. They can be hidden by clicking outside of the drop down, or the target element, or by pressing the escape key. Drop downs are inserted after the target and as a result, will move up and down the page with the element when scrolling.

* Options
    - **target** *(jquery object)* *Required* The element that the panel will be displayed underneath. If the target is an inputField `input` or `.input-field`, the target is set to the `.input-field` and the source is appended to the `.input-field-group`. Otherwise, the source is just inserted after the target in the same container. **Default:** undefined 
    - **focusTarget** *(jquery object)* The element to listen to for clicks and focus events from in order to open/close the dropdown. **Default:** undefined
    - **targetInput** *(boolean)* If true and the target is an `.input-field`, the target will be changed to the `.field-item-input`. This will place the panel only under the input itself, rather than under both the input and any addons it might have. **Default:** true
    - **hideFields** *(string[])* An array of name attributes matching elements in the panel source to remove. This is useful when you are cloning multiple panels from the same source and don't need all of the elements. **Default:** undefined 
    - **offset** *(object)*
        + **top** *(number)* Additional offset spacing, in px, between the bottom of the target and the top of the dropdown. **Default:** 0
        + **left** *(number)* Additional offset spacing, in px, between the left side of the target and the left side of the dropdown. **Default:** 0
* Methods (public)
    - **getClassNames()** Returns the class names for the target and focus elements in a object in the format `{target:(string), focus:(string)}`.
    - **getId()** Returns the drop down panel id integer. Each created panel will have its own unique id.
    - **isOpened()** Returns open status (boolean).
    - **detach()** Disconnects the panel from the target, focusTarget, and DOM. To use the panel again it must be attached to another element.
    - **attach(*jquery object* newTarget, *jquery object* newFocusTarget)** Connects the panel to the newTarget, and inserts the wrapper into the DOM in the correct location. newTarget is the target and newFocusTarget is the focusTarget. This is done when the panel is first created, but can be called afterwards in order to change the targets. If the panel already has targets, it will be detached from those targets first. 
    - **open()** Positions the panel and then makes it visible.
    - **close()** Hides the panel.
* Methods (private)
    - **_create()** Creates the dropDownPanel and its' content. Also includes closeListener and openListener methods to handle the opening and closing of the panel. 
    - **_destroy()** Removes the wrapper and destroys the element.
* Events
    **beforeopen(null, [*jquery object* panel, *object* css])** *Optional* Triggered before the panel is opened. If the default is prevented the panel will not be repositioned or shown.
    **afteropen** *Optional* Triggered after the panel is positioned and shown.
    **beforeclose** *Optional* Triggered before the panel is closed. If the default is prevented the panel will not hidden.
    **afterclose** *Optional* Triggered after the panel is hidden.

## dateRangePicker
Creates two input fields for a beginning and ending date. Allows the user to select different ranges of dates if they wish to. Based off of the date data-type.

* Methods (public)
    - **setRange(*string* range)** Sets the range of the date field to either 'custom', 'day', 'week', 'month', or 'year'. The relevant string will be passed into the method. Will modify the input fields so that the date range reflects this selection.
    - **serialize(*moment* momentDate)** Takes a passed-in moment and returns YYYY-MM-DD string format.
    - **deserialize(*string* sDate)** Takes a passed-in string and returns a moment in the YYYY-MM-DD format.
    - **get()** Returns the value, that is an object, that is currently inside of the dateRangePicker input fields. The from and to fields should be in the 'YYYY-MM-DD' format. The range value should be a string. Calls `formBuilder.get()`.
    - **set(*object* Object)** Sets the input fields of the dateRangePicker to the value of the object that is passed into the method. Calls `formBuilder.set(data)`.
    - **isDirty()** Returns the dirty value of the current calling object. Calls the `formBuilderisDirty()` method.
    - **clearDirty()** Resets the current object's dirty value to false. Calls the `formBuilder.clearDirty()` method.
    - **clear()** Sets the values inside of the dateRangePicker's inputfields to '' and sets the range value to 'custom', effectively clearing the status.
    - **validate()** Validates that the input matches the date-format that it should be. Uses the `formBuilder.validate()` method.
* Methods (private)
    - **_create()** Creates all the relevant fields and buttons and appends them to the form. Handles on 'click' for the buttons.
    - **_moveRange(*integer* number, *string* unit)** Modifies the dates to match the range that has been selected.
    - **_setFromAndTo(*moment* from, *moment* to)** Sets the to and from fields, and will serialize them first if they are not already strings. 

## dateTimeRangePicker
Similar to the dateRangePicker widget in that it creates two input fields for a beginning and ending date, but also has a field for each input that allows the user to include a time range as well which is based off of the dateTime data-type.

* Methods (public)
    - **setRange(*string* range)**  Sets the range of the date field to either 'custom', 'day', 'week', 'month', or 'year'. Will modify the input fields so that the date range reflects this selection. Will set the time fields to 12:00am and 11:59pm if there is nothing in those fields already, otherwise will not modify the time fields. 
    - **serializeDate(*moment* momentDate)** Takes a moment input and returns that input turned into a string in the format of 'YYYY-MM-DD'. 
    - **deserializeDate(*string* stringDate)** Takes a string input and returns that input turned into a moment in the format of 'YYYY-MM-DD'.  
    - **get()** Returns the value, that is an object, that is currently inside of the dateTimeRangePicker input fields. The from and to fields should be in the format 'YYYY-MM-DDTHH:MM:mmZ'. The range value of the object should be a string. 
    - **set(*object* data)** Sets the input fields of the dateTimeRangePicker to the value of the object that is passed into the method.
    - **isDirty()** Returns the dirty value of the current calling object. Calls the formBuilder isDirty() method.
    - **clearDirty()** Resets the current object's dirty value to false. Calls the formBuilder clearDirty() method.
    - **clear()** Sets the values inside of the dateTimeRangePicker's inputfields to '' and sets the range value to 'custom', effectively resetting the data.
    - **validate()** Validates that the input matches the dateTime-format that it should be. Calls `formBuilder('validate')`.
* Methods (private)
    - **_create()** Creates all the relevant fields and buttons and appends them to the form. Handles on 'click' for the buttons.
    - **_moveRange(*integer* number, *string* unit)** Modifies the dates to match the range that has been selected.

## popOver
Creates a popOver that can be appended to the inputField and can have data and links inside of it. Uses the tooltip class and expands upon it. The user can set the title and data of the popOver and it will open on focus.

* Options
    - **target** The element that the panel will be displayed underneath. **Default:** undefined
    - **top** *(number)* Additional offset spacing, in px, between the bottom of the target and the top of the dropdown. **Default:** 0
    - **left** *(number)* Additional offset spacing, in px, between the left side of the target and the left side of the dropdown. **Default:** 0
    - **appendTo** The target that the popOver will be appended to. **Default:** 'body'
* Methods (public)
    - **setAppendTo(el)** Appends the popOver to the element that is passed into the method.
    - **toggle()** If the popOver is showing then it will hide it by calling `hide()`. If it is hidden then it will show it by calling `show()`.
    - **show()** Sets self.showing to true and triggers the 'onShow' event so that the popOver will be visible.
    - **hide()** Sets self.showing to false and triggers the 'onHide' event so that the popOver will not be visible.
    - **position()** Sets the position of the popover using the options 'top' and 'left'.
* Methods (private)
    - **_create()** Creates the popOver. Handles onClick and onResize events.
    - **_init()** Called automatically after the popOver is created. Sets the title attribute of the popOver.
    - **_destroy()** Removes the event handlers for 'mousedown' and 'resize' events. 
* Events
    - **onShow** Called inside of the 'show()' method and causes the addon (in this case the popOver) to be opened.
    - **onHide** Called inside of the 'hide()' method and causes the addon (in this case the popOver) to be closed.

## textSubmitter
Similar to an instant messager box. The user can type text and then hit enter to trigger a submit event with the data and a callback. Once submitted the textbox is cleared and ready for new input. A send instruction message appears when focused.

* Options 
    - **width** Sets the width of the textEntry box. **Default** 300px
    - **placeholder** Placeholder that will be displayed within the textEntry box but will only be visible if the textEntry box is empty. **Default** ''
    - **sendInstruction** Will display instruction to the user. Converted lang.sendInstruction to an option. **Default** dict.defaultSendInstruction ('press enter to submit')
    - **rows** Sets the number of rows in the textEntry box. **Default** undefined
    - **ignoreEmptySubmit** Determines if the textEntry box will allow the user to submit their entry whether or not there is data within it. **Default** false
* Methods(public)
    - **set(*string* text)** Sets the data in the textEntry box. Calls `inputField.set(text)`.
    - **setInstruction(*string* text)** Sets the text (sendInstruction) that will be given as an instruction to the user.
    - **get()** Returns the data within the textEntry box. Calls `inputField.get()`.
    - **clear()** Clears the data that has been entered in the textEntry box. Calls `inputField.clear()`.
    - **disable()** Disables the textEntry box. Calls `inputField.disable()`.
    - **enable()** Enables the textEntry box. Calls `inputField.enable()`.
* Methods(private)
    - **_create()** Creates the textSubmitter and sets all of its default values. Handles events such as 'focus', 'blur', and 'keydown'.
    - **_submit()** Submits the data inside of the textEntry box. Triggers the 'submit' event.
    - **_destroy()** Removes the container from the calling object. Called automatically.

## spin
Creates a spinner that will be displayed when the submit button has been clicked and will spin until the data is properly submitted.

* Options 
    - **lines** The number of lines to draw. **Default** 10
    - **length** The length of each line. **Default** 4
    - **width** The line thickness. **Default** 2
    - **radius** The radius of the inner circle. **Default** 3
    - **rotate** The rotation offset. **Default** 0
    - **color** The color of the spinner. **Default** #000
    - **speed** Rounds per second. **Default** 1.5
    - **trail** Afterglow percentage. **Default** 60
    - **shadow** Whether to render a shadow. **Default** false
    - **hwaccel** Whether to use hardware acceleration. **Default** false
    - **className** The CSS class to assign to the spinner. **Default** 'spinner'
    - **zIndex** The z-index (defaults to 2000000000). **Default** 0
    - **top** Top position relative to parent in px. **Default** '0'
    - **left** Left position relative to parent in px. **Default** '0'
* Methods (public)
    - **start()** Starts the spinner spinning.
    - **stop()** Stops the spinner from spinning.
* Methods (private)
    - **_create()** Creates the spinner and sets its options.
    - **_init()** Initializes the spinner, is called automatically when the spinner is created. 
    - **_destroy()** Stops the spinnner and deletes it.



# Input Types
In order to access a specific type method outside of inputField, you must first access the type instance by calling inputField('getType') on the inputField widget element.

Note: The `ifw` parameter is an instance of the inputField widget a type is attached to.

## standard
There are a general set of methods that every type must contain in order to function properly as a type. They can be modified to suit that type's needs and there can be additional methods, but these ones below are the minimum required.

* Base Type Methods
    - **setUp(ifw)** Used as a type construtor
    - **tearDown(ifw)** Used as a type destructor
    - **converter** *(object)*
        + **toField(value, ifw)**  Used to format values from memory to the display. The passed value is the stored value in memory format. Types may return a value in the desired display format to be set in the source input widget. Types that do not return a value are assumed to have updated it manually in this function. The latter is useful for complex types that do not relay solely on the souce input widget. 
        + **fromField(value, ifw)**  Used to format values from the display to memory. The passed value is the val() of the source input. Types must return a value in the desired memory format.
    - **validate(ifw)** Used to run checks against the type to determine if it is invalid or not. To display an error message, return an object with a message property. For example: `{message: 'invalid'}`.

* All inputField types usable with the `data-type` attribute of input elements.
    - **text** raw text, no validation
    - **utext** auto-capitalization, no validation
    - **integer** integers only, no validation
    - **number** numbers only checking the first decimal, no validat
    - **state** for state abbreviations (two capital letters), validation checks for two letters
    - **zip** for zip codes, validation checks for valid zip code format
    - **email** for emails, validation checks for valid email format
    - **display** for displaying uneditable values. The source input is hidden and a span with the value is in its place.
    - **money** for money format (see [money](#inputTypes-money))
    - **phone** for phone number format (see [phone](#inputTypes-phone))
    - **tmsPhone** for phone number format with a phone type dropdown (see [tmsPhone](#inputTypes-tmsPhone))
    - **date** for date format with a picker dropdown (see [date](#inputTypes-date))
    - **time**for time format with a picker dropdown (see [time](#inputTypes-time))
    - **dateTime** a combination of date and time types (see [dateTime](#inputTypes-dateTime))
    - **select** replacment for `<select>` elements (see [select](#inputTypes-select))



## select
Instead of using the normal select tag, you can use an *input* tag with **data-type="select"**. It has the basic elements of a select tag, but with more functionality. When clicked, a dropdown appears with sorted option labels (which are scrollable vertically and horizontally) for the user to choose from. It also has a search box the user can use to quickly find a label by typing in what they are searching for. 

* Attribute Options 
    - **data-default** *Optional* Can be used to set what the default selection will be in the case that no selection is made. This is available as an alternative to the first non-empty option being selected. 
    - **data-empty-label** *Optional* Can be used to create an option with a label but no value. Will set the label of an option to the value that the user sets the data-empty label to and will set the value to ''
    - **data-no-sort** *Optional* Can be set to true, or 1, by the user to prevent the options from being sorted alphabetically. 
    - **data-filter-min** The minimum amount of options required until the search filter in the dropdown is shown. **Default:** `5`.
    - **data-options** *Required.* String representation of a JSON array of objects each containing a "value" and a "label".
        + Select Option Properties
            * **value** *Required.* The value of the option
            * **label** *Required.* The label of the option which a user will see.
            * **showClass** *(string) Optional* Set the showClass equal to a class that you wish to be able to show or hide based on the user's click on the item where showClass is set. In order for this functionality to work the class must be placed inside of the same formbuilder form that the select input is. *Do not use classes directly on inputFields. Instead, wrap all fields that you wish to be hidden in a div and then apply the showClass option to the outer div*
    
* Methods (public)
    - **setUp(*widget* inputWidget)** Sets up the select type by wrapping it in the appropriate containers and html and appending it to the form. Also handles events such as 'click', 'mouseenter', 'mouseleave', 'keydown', and 'keyup'. Also writes a closeListener method that can handle certain key presses and closing the panel. 
    - **showHideCommand()** If there are no sections, or no showClass, then return. Otherwise hide the sections and show the class. 
    - **clear(*boolean* andSelectNothing)** Unselects any current selected class and sets all the values, filter values, and text to ''. If the parameter 'andSelectNothing' exists then it should call `_handleItemNotFound()`. Finally it should redraw. 
    - **toggle()** Toggles between opening and closing the select panel.
    - **getOptions()** Returns the options.
    - **open()** Opens the panel, sets the height and width of the panel based on the optional settings, hides the closed icon, shows the open icon. Puts the filter box into focus and calls `_scroll()` to determine how the options should be displayed. 
    - **renderLabel(*object* item)** Returns the item and its label if they exist. Returns '' if they do not. 
    - **renderItem(*object* item)** Returns only item.label
    - **close()** Closes the panel by hiding it. Calls `_clearFilter()`. Shows the closed icon and hides the open icon. 
    - **update()** Updates the dropdown panel. Clears any selected option, sets the new options, hides the filter if less than five items are returned and scans for showClass commands and performs the necessary functions if they exist. Returns self.loaded.
    - **removeInvalid(*event* ev, *object* ui)** Checks to see if the current item matches an id in the source and that the label matches. If this is not the case then it will set the element value to ''.
    - **setOptions(options)**Sets the options. Sets self.optionsMap to options, self.optionsSetDynamically to false and calls `update()`.
    - **load()** Returns a sorted array of objects that have value and label properties in the format of a promise object.
    - **map(raw)** Returns an object with the label and value set to the 'raw' parameter that has been passed in.
    - **deMap(*object* obj)** Either returns the value of the object or null.
    - **isEmpty()** Determines if an option is selected.
    - **converter** *(object)*
        + **fromField()** Form data is passed through this method when retrieving it from the form. Returns null if either data or val are undefined, otherwise returns the val.
        + **toField(rawdata)** Form data is passed through this method when passing it to the form. If data or self.item are undefined will call `clear()`, otherwise will return the label of the current calling object. 
* Methods (private)
    - **_keyDownNavigate(*event* ev)** Modifies the select dropdown window and performs appropriate functions based on what keys have been pressed. 
    - **_onKeyup(*event* ev)** Called on keyup and filters through the value and the options.
    - **_setSelected()** Sets which item in the dropdown menu will be selected and highlighted. Calls the `_setLabel(self.renderLabel(item))` to set the label to the label of the item that has been selected. 
    - **_selectFirstNonEmptyOption()** Called when an option needs to be selected but the user has not clarified what option to select. This method will allow for a default option to be set and will select the first option that is not empty.
    - **_set(*string* val)** Sets the value of the selected item. If the val passed into the method cannot be found then it will call `_selectFirstNonEmptyOption()`.
    - **_removeSelection()** Removes the selection from the dropdown window so that no item is selected. 
    - **_handleItemNotFound()** Calls `_setDefaultItem()`. If there is no item or no item value then it will call `_selectFirstItem()`.
    - **_setDefaultItem()** Sets the default value to the attribute 'data-default'. It will then iterate through each item in the list and if the itemData is equal to the defaultValue then it will select that item. 
    - **_selectFirstItem()** Selects the first item in the list 
    - **_equal(*object* a, *object* b)** Checks to see if the two values, a & b, are equal to each other. Returns true if they are, false if they are not. 
    - **_setLabel(*string* text)** Sets the label of the dropdown panel.
    - **_getLabel()** Returns the label of the select dropDown.
    - **_filterOptions()** Removes selected class from the options and adds a filtered class. Used for when a search is typed in the input field to filter out what options are displayed in the drop down panel. Calls `_filterOptionsWork(optionsElements)`.
    - **_filterOptionsWork(optionsElements)** Performs the work for filtering the options. Filters through what options have already been filtered and will iterate through each individual one. Calls `_filterItem(optionEl, val)`.
    - **_filterItem(*string* optionEl, *string* val)** If the item should be filtered (calls `_itemsShouldBeFiltered(item, val)`) then it will add the filtered class to that item, otherwise it will remove the filtered class from that item. 
    - **_itemsShouldBeFiltered(*string* item, *string* val)** Tests to see if the item matches the typed in text and returns true if it does and false if it does not. 
    - **_clearFilter()** Finds the filtered options and removes the filtered class from them. 
    - **_buildEmptyOption()** Builds an option with no value and the label set to the data-emptyLabel value.
    - **_buildOptions()** Builds the options that will appear in the dropdown panel.
    - **_sort(*array* items)** Sorts the options alphabetically.
    - **_scroll()** Sets what options should be visible based on what option is currently selected.
* Events
    - **filterdone** Called inside of `_filterOptionsWork(optionsElements)` if optionsElements exists. Called to finish filtering the options.
    - **tmsselectbeforebuild** Called inside of `_buildOptions()` to prepare the select to have its options built.
    - **tmsselectafterbuild** Called at the end of `_buildOptions()` to handle the select after its options have been built, passes an array of the options.
    - **itemnotfound** Called inside of **_set(val)** inside of an if statement. Used to determine if the item being searched for is found or not. 

## date
The date data type is created to have an inputfield that allows the user to enter a date, either by typing the date directly into the inputfield, or by picking a date from a datepicker tooltip that will open when the user clicks on the inputfield.

* Options 
    - **minyear** User can set a minumum year.
    - **maxyear** User can set a maximum year.
    - **startdate** User can set the date that will be the starting date (used primarily for dateTime).
    - **enddate** User can set the date that will be the ending date (used primarily for dateTime).
    - **enforceMax** User can set this value to true or false depending on whether or not they wish to enforce the maximum year value.
    - **enforceMin** User can set this value to true or false depending on whether or not they wish to enforce the minimum year value
* Methods (public)
    - **setUp(ifw)** Sets up the type with its attributes and its datePicker. Also sets the inputFilter.
    - **converter** *(object)*
        + **fromField(val, ifw)** Input data is passed through this method when retrieving it from the input field. Date is passed in using the format yyyy-mm-dd and returned in the format mm/dd/yyyy.
        + **toField(val, ifw)** Input data is passed through this method when passing it to the input field. Date is passed in in the format mm/dd/yyyy and returned in the format yyyy-mm-dd. 
    - **tearDown(ifw)** Removes the datepicker from the element.
    - **validate(ifw)** Determines if the date is valid. If it is not valid then it will return an invalid message. 

## time
The time data type is created to have an inputfield that allows the user to enter a time, either by typing the time directly into the inputfield, or by picking a time from a timepicker tooltip that will open when the user clicks on the inputfield.

* Options 
    - **step** Allows you to modify what level of precision you wish the times to be displayed in the dropdown panel. Sets the amount of time between each time option in the timepicker. **Default** 30
    - **military** User can set this value to true if they wish to be able to enter the time in 24-hour format. This will also modify the dropdown panel to display 24-hour time instead of 12-hour time. **Default** false
    - **storeUtc** Allows the user to chose if they wish to store the time in utc format instead of local time.
* Methods (public)
    - **setUp(ifw)** Sets up the type with its attributes and its timePicker. Also sets the inputFilter depending on whether the time is intended to be in 24-hour time or not.
    - **converter** *(object)*
        + **fromField(val, ifw)** Input data is passed through this method when retrieving it from the input field. Time is passed in as a moment format HH:mm (utc) and is returned converted to h:mma (local). Confirms that the time is valid before returning the converted format.
        + **toField(val, ifw)** Input data is passed through this method when passing it to the input field. Time is passed in as h:mma (local) and is returned converted to a moment format HH:mm (utc). Confirms that the time is valid before returning the converted format.
    - **tearDown(ifw)** Removes the timepicker from the element.
    - **validate(ifw)** Determines if the time is valid by matching it against a regex. If it is not valid then it will return an invalid message. 

## dateTime
dateTime is a data type that is a combination of the two inputfields, date and time. The original inputfield is hidden between these two types. 

* Methods (public)
    - **setUp(inputFieldWidgetInstance)** Gets the option constants and then calls `_setUpFields()`, `_refreshFieldWidth()`, and `_setUpCleanDirtyEvents()`. Also sets up that `_refreshFieldWidth()` will be called on 'resize'.
    - **converter** *(object)*
        + **fromField(val, ifw)** Input data is passed through this method when retrieving it from the input field. utc and local formats are handled in the date and time data types. If one of the fields is empty then default to the current time. Convert the date and time passed in into moment objects, parse them, and combine them into one object. 
        + **toField(val, ifw)** Input data is passed through this method when passing it to the input field. utc and local formats are handled in the date and time data types. Makes sure that the time and date passed in are split by calling 'splitDate.time' and 'splitDate.date' on the timeWidgetInstance and the dateWidgetInstance respectively.
    - **validate(ifw)** Validates if the date and time are correct individually. If one of them is not valid then it will return a string stating that they are invalid. 
    - **isEmpty()** Determines if the inputfield is empty.
    - **tearDown(ifw)** Removes the dateWidget and the timeWidget and sets them to undefined. Shows the element's parent.
* Methods (private)
    - **_setUpFields()** Creates the elements for the dateWidget and the timeWidget and passes the date and time attributes in. Also creates the widgets and adds the appropriate classes and data to them. 
    - **_refreshFieldWidth()** Makes sure that the child widgets total width is equal to the base elements width.
    - **_setUpCleanDirtyEvents()** Sets it so that on dirty or clean events the dateWidget and the timeWidget will call `stopPropagation()` and `checkDirty()`.
    - **_splitDateAndTime(*string* dateTimeString)** Parses the dateTimeString passed in and returns a formatted result. If the dateTime is invalid then it will return an empty object.
    - **_joinDateAndTimeMoments(*moment* localDateMoment, *moment* localTimeMoment)** Returns a moment of the localDateMoment and the localTimeMoment combined. 

## money
Data type used to allow for the input of monetary amounts into an inputfield. Allows the user to type amount into the inputfield but if they type an incorrect value it will not allow anything to be entered. 

* Attribute Options 
    - **data-currency-symbol** User can set this value to equal any symbol they want. Will be used to change the symbol that appears in the prefix of the input field. Can be used to change the money symbol and allow for international currency. **Default** undefined (will be set to $ when undefined)
    - **data-hide-symbol** When set, the currency symbol attribute will not be displayed.
    - **data-max-amount** User can set the max amount that will be allowed to be entered in the field. If more than this amount is entered into the field then an error message will be displayed. 
    - **data-min-amount** User can set the min amount that will be allowed to be entered in the field. If less than this amount is entered into the field then an error message will be displayed. 
* Methods (public)
    - **setUp(ifw)** Sets all of the options to their values, determines if the currency symbol should be displayed or not. Also sets up the inputFilter. 
    - **format(money)** Ensures that what the user is typing in is in the correct format with only one decimal. If an incorrect format is entered then the method will return ''.
    - **converter** *(object)*
        + **fromField(val, ifw)** Input data is passed through this method when retrieving it from the input field. If the value of the trimmed val is equal to '' then return '', otherwise return +this.format(val).
        + **toField(val, ifw)** Input data is passed through this method when passing it to the input field.  Returns the formatted value. 
    - **validate(ifw)** Validates that the entered amount does not exceed the maximum value allowed (if one is set), and is not less than the minimum amount allowed (if one is set).
* Methods (private)
    - **_onChange()** Calls `format(money)` on the change event. 

## phone
Data type that allows for the input of phone numbers. Filters to ensure that input is in correct format. 

* Methods (public)
    - **setUp(ifw)** Sets up the inputFilter and sets the value of the input filter to be formatted on blur. 
    - **converter** *(object)*
        + **fromField(val, ifw)** Input data is passed through this method when retrieving it from the input field. Returns the formatted value.
        + **toField(val, ifw)** Input data is passed through this method when passing it to the input field. Returns the formatted value.
    - **format(*string* text)** Ensures that the input is in the format xxx-xxx-xxxx and returns that number.
    - **validate(ifw)** Tests to see if the element matches the specified regex. If they do not match then it returns an invalid message. 



# Plugins

## caret
Manages the display and positioning of the caret. Determines where the beginning and ending point should be if the input has been changed through filtering or formatting. Also organizes positioning when part of the input text has been highlighted. 

* Method 
    - caret(begin, end)
        + If begin is a number then the method will set the beginning and ending point of the caret according to the parameters that were passed into the method. 
        + If begin is not a number, then the method turns into getter mode and will return an object with the begin and end value within it. 
