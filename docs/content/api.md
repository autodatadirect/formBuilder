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

## inputFilter

## submitButton

## inputWidget

## arrayField

## dropDownPanel

## dateRangePicker

## dateTimeRangePicker

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