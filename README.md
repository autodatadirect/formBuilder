formBuilder
===========
[![Build Status](https://travis-ci.org/autodatadirect/formBuilder.svg?branch=master)](https://travis-ci.org/autodatadirect/formBuilder)

##Setup
###Dependencies
####CSS
* normalize.css (external)
####JavaScript
* [jQuery v1.11.3](https://code.jquery.com/jquery-1.11.3.min.js) - not sure of min version
* [jQuery ui 1.11.4](https://code.jquery.com/ui/1.11.4/jquery-ui.min.js) - not sure of min version
* jquery.formBuilder.js

###Initialization
*HTML*
```html
<form style="display:none;">
            ....
</form>
```
*JavaScript*
```javascript
$('form').formBuilder();
```

##Components
###Preinput/Postinput
**data-preinput** < string >, < HTML > = "Block of text that appears before form field"
**data-postinput** < string >, < HTML > = "Block of text that appears after form field"
    - These attributes can be defined to add a block of text or HTML directly to the left or the right of any form field 
    - Can use one, the other, or both at the same time 

###Prefix/Suffix
**data-prefix** < string> = "text at front of form field"
**data-suffix** < string> = "text at end of form field"
- Will add text at front/end of form field that can only be visible once the user has begun entering text into the field. Appears inside the form field box. 
    * setPrefix (< string >) sets the text of the prefix-overlay 
    * setSuffix (< string >) sets the text of the suffix-overlay 

###Max
**data-max** < int > = "10"
    - Can be defined to set the maximum size of the input allowed in the form field
    - The max is ignored when set to 0, and is 0 by default.

###Placeholder
**data-placeholder** < string > = "some placeholder text"
    - Attribute will display placeholder text inside of the form field as long as no input has been entered.
    - Placeholder text will disappear when text is entered into the field.
    - Note: (legacy support) the attribute **data-empty** performs the same task as data-placeholder and they are set equal to each other 

###Error
**data-error** < boolean > = "status of the object" 
- Attribute is set to true if there is an error present, otherwise it is reset to false 
**showError** < boolean > = "status of error-display"
- Attribute is set to true if an error has occurred *and* a message needs to be displayed, otherwise it is set to false
    * setError (< object > err) Passes in an error message and appends it to the input layer, as an error-overlay class 
    * flashError (< int > numberOfTimes) Flashes error for a certain 'numberOfTimes' that is passed into the function in order to get the user's attention
    * clearError () resets the value of data-error to false 

###Focus
**data-focus** < boolean > = "status of the object"
- Attribute is set to true on keydown, otherwise it is set to false. Focuses the form field when it is selected. 
* _keyDownNavigate (< object > ev) Called when a key is pressed, sets focus and selection accordingly. 

###Disable
**data-disable** < boolean > = "status of the object" 
- When set to true will make the selection dark and unable to be edited or used in any way. 
**Default:** false 
    * disable () Sets the status of the object to disabled 
    * enable () Sets the status of the object to not disabled 
    * isDisabled () Determines the status of whether or not the object is disabled 

###Label
**data-label** < string > = "Label text"
**Default:** undefined 
    * setLabel (< string > label) Receives a string for a label and prepends it above the form field 

###Tooltips
- A tooltip can be added to a form field. This tooltip will display a hovering widget when it is clicked on. The div class must be set to "tooltip" and there is an optional title attribute that can be set to a string.  
**data-title** < string > = "Title of tooltip" 
**Default:** undefined 
    - Sets the title of the form, which is appended to the top of the tooltip


###Input Field Data Types
On any `<input>` tag you can add a **data-type="*typeName*"** attribute to specify an input type that formBuilder will handle for input validation.

####Normal Form Types:
* **text** - *For normal text with no extra formatting or validation.* Default data-type.
* **tmsFullname** - An extension of the utext data type. All input is converted into all-caps. Requires two or more names that are separated by a space. Allows commas, hyphens, and apostrophes but only one comma or hyphen and up to three apostrophes. Does not allow any other symbol. Does not accept integers.
* **utext** - *For uppercase text.* If a user types in lowercase text, it is automatically converted to uppercase.
* **integer** - *For digits [0-9].* If a user types in a non-digit, the form field will flash and the input will be ignored.
* **number** - *For integers or decimal numbers [[0-9].].* If multiple decimal points are added the field is marked as invalid. If the user types in an invalid character, the field will flash and the input will be ignored.
* **money** - *For currency inputs.* Similar to the number field, but will automatically round to two decimal places on blur. In addition, a box with a '$' is prepended to the left of the field with a weight of -100. It is also possible to set a data-currency-symbol attribute in order to be able to have international currency symbols appear in front of the input field instead of a dollar sign. To not show any currency symbol, set the data-show-symbol attribute to false. There is also an optional **data-max-amount** and **data-min-amount** attribute that can be set that will display an error message if the user enters an amount that is greater than the max amount or smaller than the min amount. If these attributes are not set then any positive amount can be entered. 
* **state** - *For state abbreviations [A-Z].* Must have two characters. If only a single character is entered, the field is marked as invalid. If a user enters a non-character, the field will flash and the input will be ignored.
* **zip** - *For entering 5 digit or 9 digit (with or without '-') zip codes.* If there are multiple dashes, a dash in an incorrect position, or an incorrect number of digits the field is marked as invalid. Allows for [A-Z] input for international zip codes. 
* **email** - *For email inputs.* The correct format is a user name, then a single '@', then an alphanumeric domain name, then a single '.', then a alphabetic domain extension 2-4 characters in length. If it is an invalid format the field is marked as invalid. If the user enters a special character the field will flash and the input will be ignored.
* **phone** - *For entering US phone numbers.* Upon blur, the number is converted into the format '234-234-2345x423423' and checked for invalid numbers of digits (7, 10, 10+ are valid). An extension may be added to a local 9 digit number by explicitly adding a single 'x' before the extension.  the Any entered non-digits out of the format are ignored. All digits after the 10th digit are counted as the extension. If there is a preceding '1', it is removed. If a character not in the above format is entered the field will flash and the input will be ignored.
* **tmsPhone** - An extension of the phone data type. This type allows the user to select the category of phone from a drop down menu on the right side of the input field. They can choose between home, office, work, and fax. Each type of phone has a corresponding icon in the drop down menu.
* **date** - *For entering dates in the 'MM/DD/YYYY' format.* Input not in that exact format will mark the field as invalid. A user may manually type the date or click the input field to reveal a jquery ui popup calendar.
    - The calender icon can be modified for Spanish speakers by changing util.lang.code to equal 'es'. This will set the popup calandar to display its information in Spanish.
    - The user can use the calendar icon to select a date that will then be entered into the input field. 
* **time** - *For entering time in the 'H:MMam/pm' format.* Input not in that exact format will mark the field as invalid. A user may manually type the time or click the input field to reveal a jquery dropdown menu for time. 
    - The attribute 'data-military' can be used to have time set to military time. It must be included in the input setup and be set to true. The time in the dropdown menu will now be set to 24 hour time and will not include AM/PM at the end. The placeholder will also be modified to not display AM/PM and if the user tries to enter AM or PM in the field it will not be allowed by the input filter.  
* **dateTime** - *For entering dates and times in the 'MM/DD/YYYY h:MM AM/PM* format. Combines the two data types date and time so that they are positioned next to each other on top of a hidden input field.
    - The time field in dateTime can also be modified to military time if desired. 
* **display** - *For displaying values that are not to be edited.* Displays **value** attribute where the input field would be. If no value is specified, it is a blank area. Displayed as HTML. Any entered characters not in the specified format are ignored. The AM/PM section is automatically converted to uppercase. Hour can be entered as a single digit [0, 25]. 
* **code** - see [Code Input](#code-input) below
* **select** - see [Select Input](#select-input) below
* **feid** - *For entering Federal Employer Identification Number.*

####Adding Custom Types
The user can add custom types to the form by adding their desired regular expression and a new type name. In order to do this is it necessary to utilize the createRegexType function. It may also be necessary to override the setUp and validate functions in order to meet the specific needs of the type. See [Customization](customization).

###Code Input
A field with **data-type="code"** requires a user to input a *value* that has a corresponding *label*. A user may type a word and labels containing that word will be shown in a dropdown. When a dropdown label is clicked, it's code  replaces the input value.

* The typed value must be valid, or the field will be marked as invalid.
* The field *must* have a **data-codes** attribute containing a JavaScript variable name of an array of objects with a *value* and *label*. You must then declare and initialize the variable in JavaScript ***before*** formBuilder is initialized.

*HTML*
```html
<form>
    <input data-type="code" data-codes="testCodes">
</form>
```
*JavaScript*
```javascript
var testCodes = [
    {value:'what the user types', label:'what the user sees in the dropdown'},
    {value:'100',  label:'Some label'},
    {value:'AAA',  label:'123 Some St.'},
    {value:'BBB',  label:'Some Business Name Inc.'},
    {value:'Hodor',  label:'Bran'}
];
form.formBuilder();
```

###Select Input
Instead of using a normal select tag, you can use an *input* tag with **data-type="select"**. It has the basic functions of a select tag, but with more functionality. When clicked, a dropdown appears with sorted option labels (scrollable vertically and horizontally) for the user choose. It also has a search box the user can use to quickly find a label. 

* **data-default** *Optional.* Set the default selected option by *value*. Must be an actual option value. Sets to the first option if not specified.
* **data-no-sort** *Optional.* Set to "1" to prevent the sorting of labels 
* **data-options** *Required.* String representation of a JSON array of objects each containing a "value" and a "label".
* **showClass** *Optional* Set the showClass equal to a class that you wish to be able to show or hide based on the user's click on the item where showClass is set. In order for this functionality to work the showClass must be placed inside of the same formbuilder form that the select input is. 

*HTML*
```html
<form>
    ...
    <input type='text' data-type='select' data-options='[
            {"value":"true", "label":"Yes"},
            {"value":"false", "label":"No"},
            {"value":"1", "label":"option 1"},
            {"value":"2", "label":"option 2"},
            {"value":"3", "label":"option 3"},
            {"value":"4", "label":"option 4"},
            {"value":"5", "label":"option 5"},
            {"value":"100", "label":"Some label"},
            {"value":"AAA", "label":"123 Some St."},
            {"value":"BBB", "label":"Some Business Name Inc."},
            {"value":"Hodor", "label":"Bran"}
        ]'>
    ...
</form>
```

##Handling Validation Errors
Form field inputs are validated using regular expressions. 
The data-type should be set in order for the input to be validated as correct.
**data-type** = "input form type"
* createRegexType (< regex > pattern, < regex > filter, < boolean > flags, < int > max) 
    - validate (< object > ui) checks to determine if the input matches the regex pattern associated with the current type.
    -  If they do not match the message 'invalid' is printed in the form field. 
    -  type.setUp (< object > ui) Only performed if there is a filter or a max parameter passed into createRegexType
        +  Checks that input meets filter and max limits 
* It is possible to create a new type that can be entered as input. A new type extension must created by extending $.add123.inputField.types and defining a new type using a regular expression.  

##Handling Form Submissions
In order to correctly handle the storage of input fields, you must use a submitButton widget inside of the form and add event listeners. A loading spinner is displayed inside of the submitButton while it is submitting. See [Usage](#example-usage) below.

###Required Fields
To require a input field to be filled out you can either add the **data-require="true"** attribute to the specific field. You can also add the **data-default-required="true"** attribute to a `form` tag to set the require status for all of it's fields. If the user attempts to submit the form before all required fields are filled out, the submit will fail and the fields will flash and enter the error state.


##Widgets
###formBuilder
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

###submitButton
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

##Example Usage
See `demo2.html` for a live version of this example.
*HTML*
```html
<form id="example" action="#" style="display: none">
    <input type="text" name="name" data-label="Name*" data-require="true">
    <input type="text" name="phoneNumber" data-type="phone" data-label="Phone Number" )="">
    <input type="text" name="email" data-type="email" data-label="Email*" data-require="true">
    <input type="text" name="bestColor" data-type="select" data-label="Which is the best color?" data-default="#0000FF" data-options="[
            {'value':'#FF0000', 'label':'red'},
            {'value':'#0000FF', 'label':'blue'},
            {'value':'#00FF00', 'label':'green'},
            {'value':'#FF9900', 'label':'orange'},
            {'value':'#FFFF00', 'label':'yellow'},
            {'value':'#000000', 'label':'black'},
            {'value':'#FFFFFF', 'label':'white'},
            {'value':'#CC66CC', 'label':'purple'},
            {'value':'#808080', 'label':'gray'}
        ]">
    <button type="submit">Save</button>
</form>
```
*JavaScript*
```javascript
var formExample = $('form#example:first').formBuilder({
    beforeset: function(ev) {

    },
    afterset: function(ev) {

    }
});

var saveForm = function(data, finish) {
    // Save data to server
    $.ajax({
        url: 'someserver.com',
        type: 'POST',
        data: data,
        success: function(result) {
            //handle your server result
            finish();
        },
        error: function() {
            //connection error
            finish();
        }
    });
};

formExample.find('button[type="submit"]').submitButton({
    color: '#FF0000',
    beforesubmit: function(ev) {
        // Runs any presubmission stuff
    },
    
    submit: function(ev, finish) {                              
        // Run validation
        if(!formExample.formBuilder('validate')) {
            // The form is invalid somewhere
            finish();
            return;
        }

        saveForm(formExample.formBuilder('get'), finish);
    },
    
    aftersubmit: function(ev) {
        // Run any post-submission stuff
    }
});
```



##Other Widgets
These are created dynamically and do not need to be manually handled. They are included here for reference if needed for modifications and/or additions.

###inputField
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

###fieldWidget
* Available to be modified in order to accept new types that the user wishes to develop. Many of these methods are intended to perform in the same was as method in inputField widget but can be overwritten by user if desired to meet specific requirements
* Methods
    - **isDirty()** 
    - **validate()** 
    - **clearDirty()**  
    - **clear()** Calls this.set()
    - **flash()** 
    - **set(data)** 
    - **get()** Prints "base get method" to the console and returns null 

###inputFilter
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

##Customization
###Custom type
To add a type, you must extend the `$.add123.inputField.types` object with a new type object.

Default Type Object

* **setUp(*object* ui)** *Required.* Called initially to setup the field. Use this to add any events or elements. A jQuery object is passed in.
* **tearDown(*object* ui)** *Optional.* Called when disabling/reconstructing field. Use this to reverse setUp.
* **converter *(object)***
    - **toField(*string* value, *object* ui)** *Optional.* Called to convert the value to display inside of the field. Returns the converted value.
    - **fromField(*string* value, *object* ui)** *Optional.* Called to convert the field value when retrieved from the field. Returns the converted value.
* **validate(*object* ui)** *Required.* Called to check the field for correct input. When invalid, return an object in the format `{message:'yourerror'}` and the error message will be displayed in red on the field.

####Creating Simple Regex Types
You can use the createRegexType function to make new types based on regular expressions. It will automatically create the needed type functions.

`$.add123.inputField.createRegexType(pattern[,filter[,flags[, max]]])`

* **pattern *(RegEx)*** The regular expression used to match the full input for validation.
* **filter *(RegEx)*** The regular expression used to match each key input. Those that do not match will be ignored and not placed inside of the field.
* **flags *(object)***
    - **toUpper** *boolean* Converts all text to uppercase. **Default:** true
* **max *(int)*** The maximum characters a user can input in a field. If the max is 0, it ignores this constraint. **Default:** 0

HTML
```html
<form id="simpleCustomTypeForm" action="#">
    <input type="text" data-label="Custom 'swear' type" data-type="swear">
    <input type="text" data-label="Custom 'theLetterF' type" data-type="theLetterF">
    <input type="text" data-label="Custom 'luckySeven' type" data-type="luckySeven">
</form>
```
JavaScript
```javascript
$.extend($.add123.inputField.types,{
    'swear': $.add123.inputField.createRegexType(/^[\!@#\$%\&*]*$/, /[\!@#\$%\&*]/),
    'theLetterF': $.add123.inputField.createRegexType(/^[fF]*$/, /[fF]/,{
            toUpper: false
        }),
    'luckySeven': $.add123.inputField.createRegexType(/^[7]*$/, /[7]/,{},3)
});
$('simpleCustomTypeForm').formBuilder();
```

####Creating Full Custom Types
You can also manually create type objects.

HTML
```html
<form id="fullCustomTypeForm" action="#">
    <input type="text" data-label="Custom 'SSN' type" data-type="SSN">
</form>
```
JavaScript
```javascript
$.extend($.add123.inputField.types,{
    'SSN': {
        setUp: function(ui) {
            var self = this,
                e = ui.element;

            //- Set the characters a user can enter
            e.inputFilter({
                pattern: /[0-9]/,
                max: 12
            });

            //- Replace the input with a formatted input
            e.on('blur keydown', function(){
                e.val(self.format(e.val()));
            });
        },
        converter: {
            toField: function(value, ui) {
                return this.format(value);
            },
            fromField: function(value, ui) {
                return this.format(value);
            }
        },
        validate: function(ui) {
            if(!this.format(ui.element.val()).match(/^[0-9]{4}\-[0-9]{2}\-[0-9]{4}$/))
                return {
                    message: 'invalid'
                };
        },

        //- This is an extra function specifically for this type
        format: function(text) {
            if(!text)
                return '';

            //- Remove non-digits
            text = text.replace(/[^0-9]/g,'');
            text = text.substring(0, 10);

            //- add correct dashes
            if(text.length &lt;= 4)
                return text;
            else if(text.length &lt;= 6)
                return text.substring(0,4) + '-' + text.substring(4);
            else
                return  text.substring(0,4) + '-' + text.substring(4,6) + '-' + text.substring(6);
        }
    } 
});
$('fullCustomTypeForm').formBuilder();

```

###Custom inputFilter
- It is possible to create your own unique inputFilters in order to make sure that the input that is being typed into form fields is validated against the custom types that have been created. 
- Simply call object.inputFilter and fill in the desired values for the options (toUpper < boolean >, max < int >, pattern < regex > ) and the inputFilter methods will work to validate the input based off of these parameters. 

JavaScript
```
e.inputFilter({
                    toUpper: false,
                    max: max,
                    pattern: /./
                });
```

###Custom inputWidget
- If the user wishes they can design their own inputWidget that will allow them to have their own custom input field. In order to do this it is necessary to give the widget 'options' for what they want their input field to look like. This includes attributes such as color, size, or whatever else the user can think of. They can also include their own methods here to have the input field perform in a unique way. 
- In order to ensure that the input field will perform correctly in the form field there are methods that deal with the custom inputWidget on lines 2816-3644. This way the widget is safeguarded from damaging other input fields and items that reside on the form field. These functions also ensure that the custom inputWidget perfroms in the correct manner, such as going into focus, when it is clicked on and other events of that nature. 

###Unit Tests
There are unit tests for this project. Check the `/tests/README.md` to see how to run them and add your own.

##Credits
Auto Data Direct, Inc.

##License
MIT


