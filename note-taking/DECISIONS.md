# Decisions

In this document I try to elaborate on some of the decisions I've made in this project.

My past experience was using pure *Backbone* with *RequireJS*.
I was excited with the Marionette requirement because it would be a great opportunity to finally get my hands on it. Before, I had only read about it.

## Decision #1 - Module system

I know this is project small enough that I could probably get away by using inline `<script>` tags around, but even so I like the modularization and organization in separate files. Also, I think it's an irrelevant overhead compared to flexibility and maintainability it provides us.

Hence I started using *RequireJS* (what I was more used to) but then I decided to learn a second new thing (the first being Marionette) and decided to switch to *Browserify*.

After reading Derick Bailey's (the author of Marionette) speaking good things about Browserify (http://derickbailey.com/2014/06/10/browserify-my-new-choice-for-modules-in-a-browser-backbone-app/) I was even more convinced I should learn it.

## Decision #2 - Marionette's modules

*Module* is truly an overload and over implemented word in Javascript, isn't it?...
After reading Derick Bailey's aforementioned article, I was in doubt if I should really use Marionette's module system since Derick himself dislikes and regrets it. But... Since I'm learning Marionette, I figured I'd stick to what the tutorials would teach and exemplify, otherwise I would loose too much time figuring out workarounds and etc.

## Decision #3 - Folders and file structure

In my previous projects and companies we were used to a file structure something like this:

```
views/
    FooBarView.js
    SomeFeatureView.js
models/
    FooBarModel.js
    SomeFeatureModel.js
collections/
    SomeFeatureCollection.js
templates/
    fooBarTemplate.html.erb
    someFeatureTemplate.js
...
```

Although I don't actually have a "problem" with this approach, I decided to try a new one, something like:

```
notes/
    form/
        template.html
        view.js
    list/
        item/
           template.html
           view.js
         collection.js
         view.js
    note/
       model.js
       template.html
       view.js
```

I'm still experimenting with it but so far I'm liking it. It plays well with my editor.
PROS:
  * I can reuse and navigate code easily
  * The folder + file naming is concise and expressive
  * If I want to delete a whole module from my system I don't have to scavenge many and many folders for the related files: just go to its containing folder and delete it.
  * If I want to, say, start a new module which is very similar to another one, I can just grab the similar one, duplicate it, and just rename the parent folder and some vars later.

CONS:
  * The filename per se is commom place and doesn't mean much without its parents context.

## Decision #4 - Storage

Albeit I could probably just use an in memory Backbone collection, I also wanted to learn a bit more of *LocalStorage*. So I decided to introduce that too to the stack and see how it works :).
