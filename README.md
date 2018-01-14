# Open Source Academy - Responsive Web

## Contents

* [Preparation](#preparation)
   * [Add the proxy server](#add-the-proxy-server)
      * [SSH into your server](#ssh-into-your-server)
      * [Enable the proxy module for apache](#enable-the-proxy-module-for-apache)
      * [Edit the configuration file](#edit-the-configuration-file)
      * [Reload apache](#reload-apache)
   * [Run the python API](#run-the-python-api)
   * [Check that it's working](#check-that-its-working)
* [Setting up our webapp](#setting-up-our-webapp)
   * [Create a project folder](#create-a-project-folder)
   * [Test that it works](#test-that-it-works)
   * [Open the project in Atom](#open-the-project-in-atom)
* [Explore the starter files](#explore-the-starter-files)
* [If you get stuck](#if-you-get-stuck)
* [Adding a webfont](#adding-a-webfont)
* [Listing the movies using JS](#listing-the-movies-using-js)
   * [Using jQuery](#using-jquery)
      * [Get the API data](#get-the-api-data)
      * [Building the HTML for each movie](#building-the-html-for-each-movie)
   * [Using Vue](#using-vue)
   * [Committing your progress](#committing-your-progress)
* [Adding some very basic styles](#adding-some-very-basic-styles)
* [Using media queries to make it responsive](#using-media-queries-to-make-it-responsive)
   * [Using the developer tools for testing responsive layouts](#using-the-developer-tools-for-testing-responsive-layouts)
* [Introduction to SCSS](#introduction-to-scss)
* [A bit more setup](#a-bit-more-setup)
   * [Installing Node.js and npm](#installing-nodejs-and-npm)
   * [Set up gulp](#set-up-gulp)
   * [Transfer our existing CSS to SCSS](#transfer-our-existing-css-to-scss)
      * [Run gulp](#run-gulp)
   * [Add compiled css to .gitignore](#add-compiled-css-to-gitignore)
* [SCSS in detail](#scss-in-detail)
   * [Nesting](#nesting)
   * [Variables](#variables)
   * [Partial imports](#partial-imports)
   * [Committing our latest changes](#committing-our-latest-changes)
* [Showing the vote counts next to each movie](#showing-the-vote-counts-next-to-each-movie)
* [Voting](#voting)
   * [Select a user](#select-a-user)
      * [Get the user list](#get-the-user-list)
      * [Add a dropdown](#add-a-dropdown)
      * [Style the dropdown](#style-the-dropdown)
   * [Add the vote actions](#add-the-vote-actions)
      * [Add a button to vote for each movie](#add-a-button-to-vote-for-each-movie)
      * [Trigger a POST when a vote button is used](#trigger-a-post-when-a-vote-button-is-used)
      * [Check the result](#check-the-result)
   * [Committing our latest changes](#committing-our-latest-changes-1)
* [More SCSS](#more-scss)
   * [Mixins](#mixins)
* [Other things to try](#other-things-to-try)

## Preparation

First, open this page in your web browser so you can refer to it as you need:

```
https://github.com/jenofdoom/academy-responsive-web
```

### Add the proxy server

#### SSH into your server

```
ssh yourservername
sudo -i
```

#### Enable the proxy module for apache

```
a2enmod proxy
a2enmod proxy_http
```

#### Edit the configuration file

`vim /etc/apache2/sites-available/000-default.conf`

Inside the `<VirtualHost *:80>` block add the following:

```
ProxyPreserveHost On
ProxyPass /api/ http://127.0.0.1:8000/
```

Save and quit `<ESC>:wq<ENTER>`

#### Reload apache

```
service apache2 reload
```

### Run the python API

On the server, navigate to the folder where you put the three python files. Then run:

`python3 app.py`

We want to leave this running all afternoon.

### Check that it's working

You should be able to access the api in your web browser at
`http://yourserveraddress/api/`

## Setting up our webapp

### Create a project folder

In a new tab in your terminal (on your laptop):

> Optional: log in to your GitHub account, visit
[https://github.com/jenofdoom/academy-responsive-web](https://github.com/jenofdoom/academy-responsive-web)
and hit the fork button in the top right hand corner. Then in the git clone
command below, replace 'jenofdoom' with your user name.

```
cd ~/projects
git clone https://github.com/jenofdoom/academy-responsive-web.git webapp
```

This gives us a few 'starter' files that will be modifying.

### Test that it works

You should be able to access the starter files in your web browser at
`http://yourserveraddress/webapp/` - you should get a page with just the word
'Movies' and one other sentence on it.

### Open the project in Atom

You should already have a sshfs connection to your server set up. On your
laptop, open Atom and in the top menu select `File -> Add Project Folder`.

In the dialog, navigate to your home directory, then double click on 'projects'
and then click once on 'webapp' and hit 'OK'. A folder of files will show up in
the left hand panel so you can open the various files quickly.

Most of the code you will be adding will go into either `index.html`,
`js/main.js` and `css/main.css`, so open those up.

## Explore the starter files

The `main.css` file is empty, so we're going to have to add some stuff here. The
`main.js` file just has a jQuery wrapper that we can later add some code inside.
The `index.html` has some basic HTML, it has links to the css and js resources,
plus a couple more JS libraries that we will use later. These are not hosted by
our own site, they are externally located on a CDN - this has good points and
bad points.

## If you get stuck

There are example finished versions of the project that you can look at the code
for, in the examples folder in this directory (or [view them online](https://github.com/jenofdoom/academy-responsive-web/tree/master/css)).

If you think you have an error in your code, use the browser's web development
tools (F12) to view the error console. If you have a syntax error it will often
tell you here what is wrong, and even give you a line number of exactly where
the problem is (if it says main.js:19:5 then the error is in main.js on line 19
at character 5).

If you're still stuck, be sure to put up your hand and let me know, and I can
come help you :)

## Adding a webfont

The default font is ugly. Let's use a webfont instead of a system font.

> Webfonts have some good points and bad points, but most modern websites use at
> least one webfont.

We can get a webfont from a few different places, we will use [Google
fonts](https://fonts.google.com/) today. All the fonts there are Open Source.

1. Go to the [Google fonts website](https://fonts.google.com/).
2. Find a font you like (you can use the filters on the right to help)
3. Click the plus icon next to the one you like
4. Click on the '1 family selected' at the bottom of the screen
5. Go into the 'customize' tab
6. We want to select four different styles:
  * regular 400
  * regular 400 italic
  * bold 700
  * bold 700 italic
7. If the font you've selected doesn't offer those four types, hit the minus
next to the font name and find another one that does.
8. Go back to the 'embed' tab and copy the code snippet in the first grey box.
9. Paste that line into the `<head>` section above the `<link rel="stylesheet"...` line in `index.html`.
10. In `main.css`, we want to add a CSS rule to start using the new font:

```
body {
  font-family: 'Thefontname', sans-serif;
}
```

> Optional: Add a second webfont so it says '2 Families Selected' on the Google
fonts website, and use that second font just for h1, h2 and h3 tags so we have a
different font for the body text and the major headers.

## Listing the movies using JS

So far we have an empty page. Let's list the movies. We're going to us JS to
pull that information from the API you built in the morning.

### Using jQuery

#### Get the API data

In `main.js`, replacing the '// Your code goes in here' comment:

```
var list = '/api/';

$.getJSON(list)
.done(function(data) {
  console.log(data);
})
.fail(function(error) {
  console.log("Request Failed:", error);
});
```

In web developer tools (hit F12 in your browser to open them), when you reload
the page, you should see something like `Object { movies=[3]}` in the console
tab (the number will be different depending on how many movies you have in your
DB).

> If your API endpoint is broken or contains no movies, I've pre-prepared a  
> local copy of a set of movies. To use it change the line `var list = '/api/';`
> to `var list = 'data.json';`

#### Building the HTML for each movie

Let's replace the `console.log(data);` line with something more useful.

```
console.log(data);
```

becomes

```
displayMovies(data.movies);
```

Now above the `$.getJSON(list)` line altogether, we should define our new
function `displayMovies`, like so:

```
var list = '/api/';
var displayMovies = function(movies) {
  console.log(movies);
}

$.getJSON(list)
...code continues here
```

It still doesn't do much yet - we're just passing the data into our new
function (with one less level of wrapper around it).

Now it's time to replace out `console.log(movies);` line.

```
console.log(movies);
```
becomes

```
var listContainer = $('<ul />');

movies.forEach(function(movie) {
  var listItem = $('<li />');

  listItem.text(movie.name);
  listContainer.append(listItem);
});

$('.movie-container').append(listContainer);
```

We create the html elements and then use [.text()](http://api.jquery.com/text/)
and [.append()](http://api.jquery.com/append/) to add the movie data.

> Optional: Try adding the movie run time in italics after the movie title.

### Using Vue

There are upsides and downside of using jQuery for things like this. For more
complicated scenarios it could definitely be a bad idea. So let's try an
alternate method instead. We're going to use [Vue](https://vuejs.org/), which is
quite similar to other things you might already of heard of like AngularJS or
React, but a bit more straightforwards.

One of the key concepts is that we can keep the HTML display separate from our
JS file, so it's easier to change the HTML structure for the output.

First, in `main.js`, delete all the code!

Now replace it with the following:

```
var app = new Vue({
  el: '.content',

  data: {
    movies: []
  },

  created: function() {
    this.fetchData();
  },

  methods: {
    fetchData: function() {
      var self = this;
      var list = '/api/';

      fetch(list).then(function(response) {
        return response.json();
      }).then(function(json) {
        self.movies = json.movies;
      });
    }
  }
});
```

That takes care of the API GET - but we still need to show the data. This time
we take care of that in `index.html`, by changing the `<div
class="movie-container"></div>` line as follows:

```
<div class="movie-container">
  <ul>
    <li v-for="movie in movies">
      <h3>{{ movie.name }}</h3>
      <em>{{ movie.length }} minutes</em>
    </li>
  </ul>
</div>
```

The [v-for](https://vuejs.org/v2/guide/list.html) makes the li element be
repeated for every movie, and then we build markup to output the individual bits
of data on the object that we are interested in.

There is one downside, your can sometimes see some of the uncompiled template
before it renders with the data. We can fix that though. Add a new rule at the
top of `css/main.css`:

```
[v-cloak] { display: none }
```

And in `index.html`, add the `v-cloak` directive to the `<ul>`:

```
<ul v-cloak>
```

### Committing your progress

Now is a good time to commit, as we got the JavaScript working. In a new
terminal window:

```
cd ~/projects/webapp
git status
git add index.html
git add js/main.js
git commit -m "List the movies"
```

## Adding some very basic styles

We'll come back to the JavaScript functionality later. Let's start to add a few
basic styles in `main.css`.

```
[v-cloak] { display: none }

body {
  /* your existing font-family line should stay here */
  margin: 0;
  padding: 0;
}

h1 {
  background-color: #333;
  color: #fff;
  margin-top: 0;
  padding: 10px 20px;
}

.content {
  padding: 0 20px 20px;
}

ul {
  margin: 0;
  padding: 0;
  list-style-type: none;
}

ul li {
  border: 1px solid #333;
  border-bottom-width: 0;
  padding: 18px;
}

ul li:last-child {
  border-bottom-width: 1px;
}

ul li:hover {
  background-color: #ddd;
}

ul li h3  {
  margin-top: 0;
}
```

## Using media queries to make it responsive

One of the key concepts of responsive design is that we use the same HTML markup
and the same CSS file to make the website suitable for mobiles, tablets and
desktop computers. We do need a way in our CSS file to add some rules that only
apply to one or more of those targets though. We can use [media
queries](https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries/Using_media_queries)
for this.

Let's make the h1 font size bigger on devices with big screens (desktops). In
`css/main.css`, underneath the existing rule for the h1:

```
h1 {
  background-color: #333;
  color: #fff;
  margin-top: 0;
  padding: 10px 20px;
}

@media screen and (min-width: 960px) {
  h1 {
    font-size: 42px;
  }
}
```

The "breakpoint" is set to 960px, a fairly standard measure, but we could make
it whatever we like.

And let's center the content a bit more, and make it narrower. Underneath the
existing body rule:

```
body {
  /* your existing font-family line should stay here */
  margin: 0;
  padding: 0;
}

@media screen and (min-width: 960px) {
  body {
    max-width: 918px;
    margin: 50px auto 20px;
    border: 1px solid #999;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    box-shadow: 0 0 10px 1px #999;
  }
}
```

Why is the max-width 918px? It's the breakpoint, 960, minus 1px of border on
each side, and 20px of space on each side.

> Optional: make the h1 font size 26px on devices that have a screen width of less than 400px using a min-width media query

### Using the developer tools for testing responsive layouts

If you haven't already got them open, use `F12` in your browser to get the
developer tools to open. They have a useful tool for testing responsive layouts.
Press `<CONTROL><SHIFT>m` to open the device toolbar. That should give you
handles for easily resizing the viewport, and a dropdown menu that helps to
emulate popular mobile devices and tablets so you can see what your site looks
like on those.

## Introduction to SCSS

So far we've just been using regular CSS.  But I want to introduce you to a more
advanced way of styling your websites. The vast majority of all modern websites
will be using similar techniques of some kind, so although it's a bit more
complicated, it's an important part of modern frontend development.

We'll be using [SCSS](http://sass-lang.com/guide) (often referred to as SASS) to
give CSS the ability to use variables and more. Because we'll be doing things
that aren't supported by web browsers, we need to have a step to transform our
`.scss` files into regular `.css` that the web browser can use.

## A bit more setup

We need to use a different type of JS to help us with our SCSS build.
[Node.js](https://nodejs.org) is a JavaScript engine that exists outside a
browser, and can be used on the command line or for standalone programs.

### Installing Node.js and npm

In a new terminal window on your laptop:

```
curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
sudo apt-get install -y nodejs
```

It's generally not a good idea to just run command line scripts over the
internet like this, but in this instance we will do two things to make ourselves
safer.

1. We got this command from a reputable source, the nodejs.org website itself.
2. We can have a look first at what will be run by opening
[https://deb.nodesource.com/setup_8.x](https://deb.nodesource.com/setup_8.x) in
a web browser.

### Set up gulp

Now we run npm, the "node package manager".

```
cd ~/projects/webapp
npm install
```

npm is following a set of instructions for what to install that has been
pre-prepared, in `package.json`. 

> In particular we are using a 'build pipeline' tool called Gulp - we won't go
> into any detail for how this works today, but if you're interested to learn 
> more have a look at `gulpfile.js` and my
> [Gulp training](https://github.com/jenofdoom/js-build-pipelines-training)

### Transfer our existing CSS to SCSS

Make a new folder in `/webapp` by right clicking on it in the Atom sidebar and
selecting `New Folder`. In the box at the top of the screen, write `scss` and
press enter.

Now let's move the .css file and change the file extension. We'll use git to do
the move so it doesn't get confused. In the terminal window you used to install
npm (so inside `~/projects/webapp`):

```
git mv css/main.css scss/main.scss
```

#### Run gulp

We can start gulp 'watching' our files for changes and recompiling whenever it
sees a change by running the following command (in the same terminal window as
before):

```
npm start
```

We want to leave this command and terminal window running whenever we are
working on the `main.scss` file. When we're done we can quit with `<CONTROL>c`.

Now, whenever you save a change to `scss/main.scss` you can see that gulp
processes it and writes out `css/main.css` automatically for us.

### Add compiled css to .gitignore

We don't really want to store compiled files like this in our version control.
We want the `main.scss` file to be our 'source of truth'. So we will tell git
not to add it.

In Atom, open the `.gitignore` file. We can see that the `node_modules` folder
is already ignored. Let's add the `css` folder. On a new line, add `css/` and
save the file.

Now is a good time to commit, as we haven't in a while, and we know we got the
`.scss` compilation working.

In a new terminal window (protip: you can start a new tab with
`<CONTROL><SHIFT>t`):

```
cd ~/projects/webapp
git status
git add scss/main.scss
git add .gitignore
git commit -m "Start using SCSS"
```

## SCSS in detail

> Important: Be careful not to make manual changes to `css/main.css` from this
point on as they will get overwritten by the compilation process!

So far our SCSS is exactly the same as our CSS used to be - we should go through
it and update it to use some new tricks that SCSS give us. We'll be achieving
exactly the same thing, but the file should be shorter, easier to read, and
easier to update in the future. This time we don't need delete everything in the
file, we're just going to move a few things around.

### Nesting

SCSS lets us nest our CSS rules so we don't have to keep on repeating ourselves.
For example, the end of our file currently looks like this:

```
ul {
  margin: 0;
  padding: 0;
  list-style-type: none;
}

ul li {
  border: 1px solid #333;
  border-bottom-width: 0;
  padding: 18px;
}

ul li:last-child {
  border-bottom-width: 1px;
}

ul li:hover {
  background-color: #ddd;
}

ul li h3  {
  margin-top: 0;
}
```

There is quite a lot of repetition there that we can get rid of using nesting:

```
ul {
  margin: 0;
  padding: 0;
  list-style-type: none;

  li {
    border: 1px solid #333;
    border-bottom-width: 0;
    padding: 18px;

    &:last-child {
      border-bottom-width: 1px;
    }

    &:hover {
      background-color: #ddd;
    }

    h3  {
      margin-top: 0;
    }
  }
}
```

The `&` means 'the parent selector'.

We also nest our media queries. This is helpful because in makes sure that we
group things together - this makes it easier to read the file later. It's not
super important in a small file like this one but in a really complicated
project it's very useful. Let's update our media queries to take advantage of
nesting. Our existing rules:

```
body {
  /* your existing font-family line should stay here */
  margin: 0;
  padding: 0;
}

@media screen and (min-width: 960px) {
  body {
    max-width: 918px;
    margin: 50px auto 20px;
    border: 1px solid #999;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    box-shadow: 0 0 10px 1px #999;
  }
}

h1 {
  background-color: #333;
  color: #fff;
  margin-top: 0;
  padding: 10px 20px;
}

@media screen and (min-width: 960px) {
  h1 {
    font-size: 42px;
  }
}
```

Becomes:

```
body {
  /* your existing font-family line should stay here */
  margin: 0;
  padding: 0;

  @media screen and (min-width: 960px) {
    max-width: 918px;
    margin: 50px auto 20px;
    border: 1px solid #999;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    box-shadow: 0 0 10px 1px #999;
  }
}

h1 {
  background-color: #333;
  color: #fff;
  margin-top: 0;
  padding: 10px 20px;

  @media screen and (min-width: 960px) {
    font-size: 42px;
  }
}
```

### Variables

Variables in SCSS let us define a value once that we want to use many times in
our file. We can then change it in one place and have those changes
automatically flow through to wherever it has been used. For example, right now
we use `#333` is a couple of places. Let's replace that with a variable. At the
top of the `scss/main.scss` file, add a new line:

```
$main-colour: #333;
```

Wherever we currently usee `#333`, replace it with `$main-colour`, so for
example `background-color: #333;` should become `background-color:
$main-colour;`.

Now it's really easy to change that colour in both of those places. Change the
variable declaration at the top like so:

```
$main-colour: #FF7F00;
```

> Optional: pick another colour of your own choosing to replace it.

We can also use SCSS to do some mathematics for us. Right now the hover colour
for one of the movie rows is a light grey. We might want to make it match our
main colour variable, but we probably want it to be a lighter colour. SCSS has a
function for that (or for darkening as well). Replace:

```
&:hover {
  background-color: #ddd;
}
```

with:

```
&:hover {
  background-color: lighten($main-colour, 40%);
}
```

### Partial imports

SCSS can help us with another thing that can cause big problems on large
projects - splitting up big files into many smaller self contained ones. In the
bad old days CSS files for big projects would get really messy because lazy
developers who needed to add something would not find the right place to add it,
and would just jam new rules in at the end of the file.

CSS has always had a way of splitting up files, but it caused a performance
issue because the browser then had to go get the extra files. SCSS gives us the
best of both worlds. Let's split up our file now. Right click on the `scss`
folder in the left hand pane in Atom, and select `New File`. In the box at the
top of the screen, type `_base.scss` and hit `<ENTER>`. Repeat the same action
to create another file, `_movie-list.scss`. The underscore is important, it's
what tells the SCSS compiler to smush everything into one file rather that
creating individual ones.

Now we should cut and paste parts of our existing code into their new homes.
First, take everything from `[v-cloak] { display: none }` down to and including
`.content { padding: 0 20px 20px; }`and cut it (`<CONTROL>x`) and then paste it
(`<CONTROL>v`) into `scss/_base.scss`. Save it. Where it used to be in
`scss/main.css`, add in a new line `@import "base";`. Now repeat the process for
the `ul` bit, putting that into `scss/_movie-list.scss` and replacing it with
`@import "movie-list";`.

Everything should still work, and `scss/main.scss` should end up looking something like:

```
$main-colour: #FF7F00;

@import "base";
@import "movie-list";
```

In fact, doing this has highlighted a problem. The code in
`scss/_movie-list.scss` isn't very specific to the movie list. Right now it only
works properly because we only have one `ul` element in the whole of the
application, if we tried to add a more normal bulleted list it would end up
looking like the movie list too. We can fix this by making the rules in
`scss/_movie-list.scss` more specific:

```
.movie-container ul {
```

SCSS does have a few other tricks up its sleeve (there's a section on mixins a
bit later on if we have time), but we're covered the majority of the interesting
things that it does, so it's time to move back to some JavaScript. Let's commit
our changes first.

### Committing our latest changes

In the same terminal window as last time (if you closed it already open another
and go back to `cd ~/projects/webapp`):

```
git status
git add scss
git add index.html
git commit -m "Better SCSS use"
```

## Showing the vote counts next to each movie

First, we need to make the votes API call. In preparation for a later step, we
want to do this AFTER we've gotten the movie list. So we can put it inside the
`fetchData` function in `js/main.js`, immediately after we get the movie list,
like so:

```
fetchData: function() {
  var self = this;
  var list = '/api/';
  var votes = '/api/votes';

  fetch(list).then(function(response) {
    return response.json();
  }).then(function(json) {
    self.movies = json.movies;

    fetch(votes).then(function(voteResponse) {
      return voteResponse.json();
    }).then(function(voteJson) {
      console.log(voteJson);
    });
  });
}
```

> If your API endpoint is broken or contains no vote data, I've pre-prepared a  
> local copy. To use it change the line `var votes = '/api/votes';`
> to `var votes = 'data-votes.json';`

Now let's actually do something with that data. We want to match up each vote
with the movie it belongs to. Replace `console.log(voteJson);` with a loop which
we use to go through each vote and see which movie it belongs to:

```
voteJson.votes.forEach(function(vote) {
  console.log(vote.movie.id);
});
```

The next bit is a bit tricky though - how do we take that information and write
it onto our movie list data structure? Right now our movie list data is an
array, so we don't know which order the movies are in (especially if a movie got
deleted or something, the IDs might skip a number or something). We would have
to loop through each movie and check if the ID matched.

Putting loops inside loops like this works, but is not very efficient. Let's
pre-prepare the data by changing it from an array to an object BEFORE we get the
votes, that way we only have to do it once.

Replace the line `self.movies = json.movies;` with the following:

```
var movies = {}

json.movies.forEach(function(movie){
  movie.votes = 0
  movies[movie.id] = movie
});

self.movies = movies;
```

That way we end up with a data structure that looks like the following:

```
{
  "1": { name="Hunger Games",  length=123,  id=1, votes: 0},
  "2": { name="The Drop",  length=106,  id=2, votes: 0}
}
```

As we're changing the data structure, we should update our Vue `data`
initialization block to use the new structure. It used to look like:

```
data: {
  movies: []
},
```

We should update it so it looks like:

```
data: {
  movies: {}
},
```

Now we can access a particular movie using its ID, like `movie["1"]`. It become
a lot easier for us to add the vote to the movie it belongs to.  Replace
`console.log(vote.movie.id);` with the following:

```
var id = vote.movie.id;
var movie = self.movies[id];

Vue.set(movie, 'votes', movie.votes + 1);
```

This uses a special Vue method, [Vue.set](https://vuejs.org/v2/api/#Vue-set), to
update our movie with an updated votes total.

We can show our new vote count by editing `index.html`:

```
<li v-for="movie in movies">
  <h3>{{ movie.name }}</h3>
  <em>{{ movie.length }} minutes</em>
  <span class="votes">{{ movie.votes }}</span>
</li>
```

Plus we can add some styling for that in `scss/_movie-list.scss`:

```
li {
  border: 1px solid $main-colour;
  border-bottom-width: 0;
  padding: 18px 80px 18px 18px;
  position: relative;

  .votes {
    font-size: 50px;
    line-height: 50px;
    display: block;
    position: absolute;
    top: 18px;
    right: 20px;

    @media screen and (min-width: 960px) {
      top: 25px;
    }
  }
```

## Voting

### Select a user

Before we can vote, we need a valid ID for a user. Normally, we'd have some
kind of login system to make sure that only the right person can submit a vote,
but for our simple app we will just trust that the user is who they say they are
(NEVER do this in real application, users aren't trustworthy!).

#### Get the user list

In the `fetchData` function in `js/main.js`, we need to first load the list of
users from the `people` API endpoint. First add the URL of the endpoint to our
variable setup at the beginning:

```
var people = '/api/people';
```

> If your API endpoint is broken or contains no people data, I've pre-prepared a  
> local copy. To use it change the line `var people = '/api/people';`
> to `var people = 'data-people.json';`

Then, after the other `fetch` calls (this one can happen in any order and
doesn't need to wait for the movie list to load first):

```
fetch(people).then(function(peopleResponse) {
  return peopleResponse.json();
}).then(function(peopleJson) {
  self.people = peopleJson.people;
});
```

There is one thing we're forgetting through, which is that Vue needs us to set
up an empty array for us to then put that data into:

```
data: {
  movies: {},
  people: []
},
```

#### Add a dropdown

Now we have the data we need to give the user some way of selecting between the
different users. We don't know how many there will be, so a select box seems
like a good option (but terribly insecure, as previously mentioned!) in case
it's quite a long list. In `index.html` let's add a new bit above the 'Here are
the movies' sentence:

```
<h2 v-cloak>
  Welcome,
  <select class="user-select">
    <option v-for="person in people" v-bind:value="person.id">
      {{ person.name }}
    </option>
  </select>
</h2>
```

That works but we need to be able to work out which person has been selected. We
can do that by binding the select to a data model. Change the `<select>` tag
like so:

```
<select class="user-select" v-model="user">
```

And set up the corresponding Vue data structure in `js/main.js`:

```
data: {
  movies: {},
  people: [],
  user: 1
},
```

We'll default to the user with and ID of one. We could make it `null` instead
but that would give us an extra error case to think about.

#### Style the dropdown

At the bottom of `scss/_base.scss`:

```
.user-select {
  font-size: 22px;
  font-family: $main-font;
  font-weight: bold;
}
```

This is adding a new variable we haven't yet set up. We should do so now, in
`scss/main.scss`:

```
$main-colour: #FF7F00;
$main-font: yourfontname, sans-serif;
```

And we should update the `body` tag in `scss/_base.scss` too:

```
body {
  font-family: $main-font;
```

### Add the vote actions

#### Add a button to vote for each movie

In `index.html`:

```
<em>{{ movie.length }} minutes</em>
<button v-on:click="sendVote(movie.id)">Vote</button>
```

Of course that will throw an error if you try and click it, because `sendVote`
doesn't exist yet...

#### Trigger a POST when a vote button is used

In the `methods` object in `js/main.js`, underneath the `fetchData` function
where we just added the fetch people request, is where we will add our new
function:

```
  fetch(people).then(function(peopleResponse) {
    return peopleResponse.json();
  }).then(function(peopleJson) {
    self.people = peopleJson.people;
  });
},
sendVote: function(id) {
  var self = this;
  var voteEndpoint = '/api/vote/';

  fetch(
    voteEndpoint + self.user + '/' + id,
    { method: 'POST'}
  ).then(function(response) {
    console.log(response);
  });
}
```

> If your Python API is broken for posting votes, then unfortunately we can't 
> locally mimic the POST behaviour.

You can see that the URL is built from both the user ID and the movie ID.

#### Check the result

We will either receive a success response, or a `CONFLICT` response if the user
has already voted for that movie and isn't allowed to again. So we need to check
what the result was. Replace `console.log(response);` with this if statement:

```
if (response.ok) {
  Vue.set(self.movies[id], 'votes', self.movies[id].votes + 1);
} else {
  alert('You have already voted for this!');
}
```

If it was successful, we update the vote count for that movie. This is
illustrating one of the great features of JavaScript in that we don't need to do
a page reload in order to see the data update.

If it failed, we show an error message to the user to let them know what the
problem was.

### Committing our latest changes

In the same terminal window as last time (if you closed it already open another
and go back to `cd ~/projects/webapp`):

```
git status
git commit -a -m "Adding votes"
```

> Optional: if you forked the repo to your own account at the beginning, you can
now push up your work so far by using the command `git push origin master`.

And that's it! We've successfully built a simple web application, that is
usable on both desktops and mobile devices.

## More SCSS

### Mixins

Mixins are basically functions that we can use to create bits of CSS that we can
reuse throughout our project, even taking variables to customise themselves as
needed. In a small project like ours this will be a bit contrived but let's add
one anyway.

If we wanted to be easily able to create boxes with a 1px border and curved
bottom corners, we can set up mixin for that. At the top of
`scss/_base.scss` we create a mixin and move up the border rules from the
`body` tag's  media query:

```
@mixin container-box() {
  border: 1px solid #999;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
}
```

Where we took those lines from, we replace them with a call to the mixin:

```
@media screen and (min-width: 960px) {
  max-width: 918px;
  margin: 50px auto 20px;
  @include container-box();
  box-shadow: 0 0 10px 1px #999;
}
```

Now we can tweak it so the colour the border will be is configurable:

```
@mixin container-box($colour) {
  border: 1px solid $colour;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
}
```

and

```
@include container-box(#999);
```

If we need to use the same pattern again, it's easy. Let's add a footer to our
site and give it the same borders but in a different colour. In `index.html` we
need to add some more HTML at the bottom of the `.content` div:

```
<footer class="content-footer">
  made by yourname
</footer>
```

In `scss/_base.scss`, at the bottom, we're going to add to the `.content` rules:

```
.content {
  padding: 0 20px 20px;

  .content-footer  {
    @include container-box($main-colour);
    padding: 10px;
    margin-top: 20px;
  }
}
```

If we wanted to do the same thing as a mixin, but we didn't need to pass in
variables, we can just use
[@extend](http://sass-lang.com/documentation/file.SASS_REFERENCE.html#extend)
(which has better performance).

## Other things to try

Here are some suggestions of other things you could look into implementing if
you're keen (some of them will be a fair bit of work!):

* Add some nicer styling to the vote buttons
* Add a button to reset all votes using the delete API
* Use the [Open Movie Database](https://www.omdbapi.com/) API to add movie
descriptions
* Nicer in-page dismissable error messages instead of a JavaScript alert
* Add a sentence which states which movie currently has the most votes
* Add a button that changes the colour scheme
* Sort the movies in order of which has the most votes
* Disable the vote button if the current user has already voted for that movie
* Add a nice icon for mobile
* Remember which user was selected by saving and loading the user ID from
[localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Storage/LocalStorage)
