# Widgets
All widgets are created using jQuery UI's [Widget Factory](http://api.jqueryui.com/jQuery.widget/) and inherit all of the options, methods, and events of the base widget.

## formBuilder
* Options
    - **ignoreHidden** *(boolean)* Ignore fields that are not `$(:visible)`. **Default:** false
    - **converter** *(object)*
        + **fromForm(data)** Form data is passed through this function when retrieving it from the form. Just returns data by default.
        + **toForm(data)** Form data is passed through this function when passing it to the form. Just returns data by default. 
* Methods
    - **scanForNewFields()** Checks inside of the form container for new fields and constructs them. Called once automatically when initialized. 
    - **isDirty()** Runs dirty checks and returns boolean result.
    - **clearDirty()** Clears all dirty field states. Use this after saving dirty field data. 
    - **flashDirty(numberOfTimes)** *Deprecated.* Does nothing. Use `flashError` instead.
    - **flashError(*int* numberOfTimes)** Filters fields and calls the `inputField.flash(numberOfTimes)` on each incorrect one.
    - **get()** Returns converted form data from all fields. 
    - **clear()** Runs inputField.clear() for each field. Empties form.
    - **conflicts(data, ignoreKeys)** Checks to see if the given data would overwrite and dirty fields if set. Returns an array of conflict data, and false for no conflicts.
    - **set(data, setOptions)** Replaces the values in the DOM with the given data. Triggers `beforeset` and `afterset`.
    - **validate()** Runs all enabled field validations. Returns true/false for valid/invalid.
    - **getFields()** Returns all current formBuilder inputFields.
* Events
    - **beforeset(formData)** *Optional.* Called before `set` replaced the form values. **Default:** undefined
    - **afterset(formData)** *Optional.* Called after `set` replaces the form values **Default:** undefined

## inputField
* Options
    - **type** *(string)* Field type from `types`. **Default:** 'text'
    - **label** *(string)* Label to go above field. **Default:** ' '
    - **require** *(boolean)* Whether or not the field is required for submission. **Default:** false
    - **placeholder** *(string)* Text in empty form field. **Default** ' ' 
    - **min** *(integer)* Minimum amount of input required. **Default** ' '
    - **max** *(integer)* Maximum amount of input allowed. **Default** ' '
* Methods 
    - **setLabel(label)** Prepends the given label to the top of the form field
    - **setSuffix(t)** Sets text that will be displayed at the end of the form field once the user has started typing.
    - **setPrefix(t)** Sets text that will be displayed at the front of the form field once the user has started typing.
    - **setMax(max)** Sets the maximum size that the input can be 
    - **checkDirty()** Determines whether the data-dirty is supposed to be true or false in that moment of typing 
    - **isDirty()** returns the value of data-dirty (true/false)
    - **addOn(weight, HTML, className)** Appends given HTML around form field based on weight. If no input found, it will append to the items layer
    - **placeholder(s)** If there is no placeholder it will be hidden, otherwise it will be shown if the input field is empty. 
    - **clear()** Runs inputField.clear() for each field. Empties form.
    - **clearDirty()** Resets the dirty status to false. 
    - **conflicts(value)** Checks to see if dirty status is set to true. If it is then returns conflicting values, otherwise returns null. 
    - **set(value, setOptions)** Replaces the values in the DOM with the given data. Triggers `afterset`.
    - **get()** Returns converted field value
    - **value(value)** If the value passed in is undefined then return the converted form data from all fields, otherwise set the value into the form. 
    - **validate(skipRequired)** Validates the input matches the declared type, but only if the form field is not empty and skiRequired is true.
    - **flash(numberOfTimes)** Flashes an error message to the screen according to the 'numberOfTimes' that have been passed into the function
    - **setError(err)** Sets the error message passed in into the error label overlay. Sets error status to true. 
    - **clearError()** Sets autoValidate to blur. Sets error status to false. C
    - **redraw()** Re-enters all of the previous saved information into the form. 
    - **setType(sType)** If the type doesn't exist, sets it to default of 'text'. If it does exist then run the type's tear down. Then set the field type and run the type's setup. 
    - **getType()** Returns the type object. 
    - **hide()** Hides the field that calls this function. 
    - **show(displayValue)** Displays the value passed into the function. 
    - **getField()** Returns the field.
    - **enable()** Sets the 'disable' status to false.
    - **disable()** Sets the 'disable' status to true.
    - **isDisabled()** Returns the 'disable' status's value (true/false)
    - **status(statusName,bool,fireEvents)** Sets the status class to the field and runs any updates to the field needed. 
    - **updateStatus(statusName, bool, fireEvents)** legacy code that simply calls the **status(statusName,bool,fireEvents)** method 
    - **hasStatus(statusName)** Returns this current object's current state for the status name that was passed into the function. 
* Events 
    - **dirty** *Optional* Triggered if the form has been changed but not saved
    - **clean** *Optional* Triggered if the form's current value equals the previous value, the form has been correctly saved. 
        + Also triggered in the clearDirty() method
    - **afterset(null, [val, value])** *Optional.* Called after `set` replaces the form values **Default:** (undefined)


## inputFilter
* Options
    - **toUpper** *(boolean)* flag to determine if the type is utext. **Default:** 'false'
    - **max** *(integer)* Largest input that is allowed in the form field. **Default:** '0'
    - **pattern** *(regex)* The pattern that the input will be checked against for validity. **Default:** '/[A-Z]/'
* Methods 
    - **setMax(max)** Sets the current object's max variable to the max passed into the method.
    - **setPattern(regex)** Sets the pattern of the current object to the regular expression passed into the function. 
    - **destroy()** Calls the destroy function with the current object as the parameter
    - **nextArrayFieldId()** Returns the arrayFieldId incremented by one. 
* Events
    - **keyignored** *Optional* Ignore the character that has been entered if it is not valid for the current type
    - **keytyped** *Optional* If the character entered is valid for the current type then enter it into the formfield

## submitButton
* Options
    - **color** *(string)* Color of loading spinner. **Default:** '#000'
    - **delay** *(int)* Delay between UI update and submission call, in milliseconds **Default:** 10
    - **disabled** *(boolean)* Prevents form submission. Set by user. **Default:** false
    - **waiting** *(boolean)* Prevents form submission. Set to  **Default:** false
    - **label** *(string)* Label above button. **Default:** undefined
    - **preventDefault** *(boolean)* Prevents default form submission. **Default:** true
* Methods
    - **enable()** Sets `disabled` to false.
    - **disable()** Sets `disabled` to true.
    - **getButtonLabel()** Returns `label`.
    - **submit()** Begins submission process as if the button was clicked.
* Events
    - **beforesubmit(ev)** *Optional.* - called before a submit, if false it does not submit
    - **submit(ev, finish())** *Required.* - called to submit the code
        + Not called if in a `disabled` or `waiting` state. 
        + Write your Ajax or other form submission here
        + Must call `finish()` after completed
    - **aftersubmit(ev)** *Optional.* - called after the submit returns
        + Clean up form here

## fieldWidget
Available to be modified in order to accept new types that the user wishes to develop. Many of these methods are intended to perform in the same was as method in inputField widget but can be overwritten by user if desired to meet specific requirements

## arrayField

## dropDownPanel
Drop down panel widgets may be used to add an extra hovering container to any element. Drop downs are shown when a user clicks on the target element, and/or focuses (if possible) on the focusTarget element. They can be hidden by clicking outside of the drop down and the target element or by pressing the escape key. Drop downs are inserted after the target and as a result, will move up and down the page with the element when scrolling.

* Options
    - **target** *(jquery object)* *Required.* The element the panel will be displayed underneath. If the target is an inputField `input` or `.input-field`, the target is set to the `.input-field` and the source is appended to the `.input-field-group`. Otherwise, the source is just inserted after the target in the same container. 
    - **focusTarget** *(jquery object)* The element to listen to click and focus events from in order to open/close the dropdown. **Default:** same as target
    - **targetInput** *(boolean)* If true and the target is an `.input-field`, the target will be changed to the `.field-item-input`. This will place the panel only under the input itself, rather than the both input and any addons it might have. **Default:** true
    - **hideFields** *(string[])* An array of name attributes matching elements in the panel source to remove. This is useful when you are cloning multiple panels from the same source and don't need all of the elements.
    - **offset** *(object)*
        + **top** *(number)* Additional offset spacing, in px, between the bottom of the target and the top of the dropdown. **Default:** 0
        + **left** *(number)* Additional offset spacing, in px, between the left side of the target and the left side of the dropdown. **Default:** 0
* Methods
    - **getClassNames()** Returns the class names for the target and focus elements in a object in the format `{target:(string), focus:(string)}`.
    - **getId()** Returns the drop down panel id integer. Each created panel will have its own unique id.
    - **isOpened()** Returns open status
    - **detach()** Disconnects the panel from the target, focusTarget, and DOM. To use the panel again it must be attached to another element.
    - **attach(*jquery object* newTarget, *jquery object* newFocusTarget)** Connects the panel to the newTarget as the target, newFocusTarget as the focusTarget, and inserts the wrapper into the DOM in the correct location. This is done when the panel is first created, but can be called afterwards in order to change the targets. If the panel has targets, it will be detached from those targets first. 
    - **open()** Positions the panel and then makes it visible.
    - **close()** Hides the panel.
* Events
    **beforeopen(null,*jquery object* panel, *object* newPositionCss)** Triggered before the panel is opened. If the default is prevented the panel will not be repositioned or shown.
    **afteropen** Triggered after the panel is positioned and shown.
    **beforeclose** Triggered before the panel is closed. If the default is prevented the panel will not hidden.
    **afterclose** Triggered after the panel is hidden.

## dateRangePicker
Creates two input fields for a beginning and ending date. Allows the user to select different ranges of time if they wish to. Based off of the date data-type.

* Methods 
    - **setRange(string)** Sets the range of the date field to either 'custom', 'day', 'week', 'month', or 'year'. Will modify the input fields so that the date range reflects this selection.
    - **serialize(moment)** Takes a passed-in moment and returns YYYY-MM-DD format
    - **deserialize(string)** Takes a passed-in string and returns a moment in the YYYY-MM-DD format
    - **get()** Returns the value, that is an object, that is currently inside of the dateRangePicker input fields. The from and to fields should be in the 'YYYY-MM-DD' format. The range value should be a string. 
    - **set(Object)** Sets the input fields of the dateRangePicker to the value of the object that is passed into the method
    - **isDirty()** Returns the dirty value of the current calling object. Calls the formBuilder isDirty() method.
    - **clearDirty()** Resets the current object's dirty value to false.Calls the formBuilder clearDirty() method.
    - **clear()** Sets the values inside of the dateRangePicker's inputfields to '' and sets the range value to 'custom'
    - **validate()** Validates that the input matches the date-format that it should be. Uses the formBuilder widget's validate function

## dateTimeRangePicker
Similar to the dateRangePicker widget in that it creates two input fields for a beginning and ending date, but also has a field for each input that allows the user to include a time range as well. Based off of the dateTime data-type.

* Methods 
    - **setRange(string)**  Sets the range of the date field to either 'custom', 'day', 'week', 'month', or 'year'. Will modify the input fields so that the date range reflects this selection. Will set the time fields to 12:00am and 11:59pm if there is nothing in those fields already, otherwise will not modify the time fields. 
    - **serializeDate(moment)** Takes a moment input and returns that input turned into a string in the format of 'YYYY-MM-DD'. 
    - **deserializeDate(string)** Takes a string input and returns that input turned into a moment in the format of 'YYYY-MM-DD'.  
    - **get()** Returns the value, that is an object, that is currently inside of the dateTimeRangePicker input fields. The from and to fields should be in the format 'YYYY-MM-DDTHH:MM:mmZ'. The range value of the object should be a string. 
    - **set(object)** Sets the input fields of the dateTimeRangePicker to the value of the object that is passed into the method.
    - **isDirty()** Returns the dirty value of the current calling object. Calls the formBuilder isDirty() method.
    - **clearDirty()** Resets the current object's dirty value to false.Calls the formBuilder clearDirty() method.
    - **clear()** Sets the values inside of the dateTimeRangePicker's inputfields to '' and sets the range value to 'custom'
    - **validate()** Validates that the input matches the dateTime-format that it should be. Uses the formBuilder widget's validate function

## popOver

## textSubmitter

## spin



# Input Types

## standard

## select

## date

## time

## dateTime

## money

## phone



# Plugins

## caret