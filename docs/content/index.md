# About

## What is formBuilder?
FormBuilder is a library that can be used to create forms online. These forms will be able to accept user input and save the data in varying ways depending on what data-types have been chosen for the input fields. There are many different input field data-types and each have different filters, validation methods, and options that dictate what kind of data they can or can not accept, and how the input fields will look and behave. These types have been developed to meet the typical needs of what would be desired from an online form, such as a phone number type, an email type, a regular text input type, and many more. If you would like to see a full list of the input types that are available to you with formBuilder please feel free to look ahead to the <a href="./guide.html#dataTypes">Data Types</a> section in the User Guide. It is also possible, if these types do not meet the requirements of what is needed for a form that is being built, to easily design a custom input type by modifying a set of base methods, or developing a regular expression to define what input will be allowed in the new type. A more detailed description of how to do this can be found in the <a href="./guide.html#customization">Customization</a> section of the User Guide.

If you would like to see an example of a form that is built using formBuilder, and how the data from that form is saved, feel free to look ahead to our <a href="./guide.html#demo">Live Demo</a>. 

## How can formBuilder be used?
FormBuilder is used by creating forms and then initializing them as formBuilder widgets. FormBuilder will construct the form fields automatically. You can then build upon those forms by adding as many different kinds of input as are desired. 

For a more in-depth understanding of how to use and manipulate each different available resource in the formBuilder library, please feel free to look ahead to our <a href='./api.html#widgets'>[API Reference]()</a>

## Why should I use formBuilder to make my forms?
FormBuilder allows you to create complicated input fields on forms by using only one or two lines of code in your html file. By implementing one or two attributes on an input field you will be able to apply large changes to how the field will appear and how it will handle data. It is also a quick and easy way to be able to eliminate most human error from any online form that you are trying to build. By using input types that have been designed to only accept certain entries you can help to prevent the chance that forms will be submitted to you incorrectly. FormBuilder is also very easy to understand and implement into your code. The user guide and API reference that have been provided to you are useful tools to be able to understand and see examples of how to build your form using formBuilder. In short, formBuilder is a useful tool that can be used to enhance any online form that you are trying to build.


# Contributing
TODO write an explanation

## Project Structure

* **`assets/`** static, non-source code files (images, fonts, etc.)
* **`bower_components/`** bower install directory
* **`build/`** gitignored temporary build folder used in unit tests, *do not edit directly*
* **`dist/`** distribution build folder saved in repo and used for versioning, *do not edit directly*
* **`docs/`** This documentaion website. Good for visual testing, copied to gh-pages branch when updating. Build .html files with by running `gulp docs` or `gulp docs:watch`.
    - **`content/`** Partials for the base jade page files. Subfolders correspond to sections of the guide.
        + `api.md` Markdown source for the API Reference page. 1st and 2nd level headings are to be used with the sideNav.
        + `demo.jade` source for the demo in the guide
        + `index.md` Markdown source for the index page. 1st and 2nd level headings are to be used with the sideNav.
    - **`css/`** all extra css for the docs only
    - **`img/`** all extra images for the docs only
    - **`js/`** all extra js for the docs only
    - `**/*.html` gulp/jade generated static pages, *do not edit directly* 
    - `_layout.jade` main jade layout
    - `api.jade` API Reference page base, edit this file only when adding new headings to the sideNav.
    - `guide.jade` Guide page base, edit this file only when adding new sections.
    - `index.jade` About page base, edit this file only when adding new headings to the sideNav.
* **`node_modules/`** npm install directory
* **`sass/`** Sass files for main css
    - **`partials/`** main partials, separated by component
    - **`themes/`** theme partials, containing constants to easily restyle formBuilder
    - `formBuilder.scss` main Sass build file, need to include all partials here
* **`src/`** JavaScript source files, separated by component and concatenated in the order in parenthesis for the build
    - **`locales/`** (1) All localization files, ment to be independent. Only the files an underscore prefix are built with the main js. All are copied as separate js also.
    - **`plugins/`** (2) jQuery plugins on $.fn
    - **`types/`** (5) inputField types, separated into dependancy tiers for concatenation order reasons. Tiers can be added as needed.
        + **`tier0/`** (5-0) base types
        + **`tier1/`** (5-1) types that use at least one type in tier0
        + **`[tierN/]`** (5-N) types that use at least one type in tier[N-1]
    - **`util/`** (3) utilities for project-wide usage
    - **`widgets/`** (4) jQuery widgets order doesnt matter here
* **`uncomplete/`** types/componenets not yet complete or integrated into formBuilder
* **`unitTests/`**
    - **`specs/`** Jasmine tests, mirroring the `src/` structure. All test files must be end in `.spec.js`
    - `karma.conf.js` main Karma configuration file
    - `karmaSetup.js` used to load css files into the karma test browsers
    - `testRunner.html` browser test file for debugging tests. If new test files are added, this file we need to be rebuilt by running `gulp tester`.
* `.travis.yml` TravisCI build setup script ([guide](http://docs.travis-ci.com/user/customizing-the-build/))
* `gulpfile.js` setup file for using Gulp

## Branches

* `master` latest, used for development, not always stable
* `gh-pages` GitHub repo website, see the [project pages guide](https://help.github.com/articles/creating-project-pages-manually/).
* `vX.X.X` bower version branch

## Setup

To setup the develpment for fomBuilder you will need Git and Node.js with npm. 

<code data-mode='shell'>
$ git clone https://github.com/autodatadirect/formBuilder.git
$ cd formBuilder/
$ npm install bower -g
$ npm install gulp -g
$ npm install
$ bower install</code>

To make sure everything is working correctly, try running `gulp test`. The results should match the latest TravisCI build check. 

The recommended editor is [Sublime Text 3](http://www.sublimetext.com/) with the [Markdown Editing](https://github.com/SublimeText-Markdown/MarkdownEditing), [SublimeCodeIntel](https://github.com/SublimeCodeIntel/SublimeCodeIntel), [SublimeLinter](http://www.sublimelinter.com/en/latest/), [SublimeLinter-jshint](https://github.com/SublimeLinter/SublimeLinter-jshint), [Jade](https://packagecontrol.io/packages/Jade), and [Sass](https://packagecontrol.io/packages/Sass) packages.

## Building
The build scripts are all run with [Gulp](http://gulpjs.com/) and use various node modules.


## Unit Tests
TODO

## Documentation
TODO

# License
MIT

# Credits
Auto Data Direct, Inc.