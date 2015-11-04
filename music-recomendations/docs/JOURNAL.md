Journal
=======

Here in this journal I aim to share some of my thoughts on decisions made, ideas, pain points, etc.

---

* Since I'm supposed to use the tools I don't have much experience with on this project, I'm choosing Koa. I have never used it before, so I should be a fun ride. Let's do this.

* Starting https://github.com/koajs/kick-off-koa (nodeschool.io official course on koa) to get myself more familiar with it.

* I tried using [glass](https://github.com/timeglass/glass) to better track my time spent but it's not working out. I'm developing this test on my time windows across my day job and also during my nights, so the time windows are really sparse. Glass would then think I took 50 min for a commit, but in reality I took less then 10 min. I'll just stop using it and make an interactive rebase removing the timestamps from the commits. For that I'll have to force-push into master branch. I know. I would never to this in real life. I'm just deliberately doing this because I'm the only one working on master right now, so it's just like a private feature branch. ;-)

* Oops. I thought the .json files were examples of a request body to our endpoints. But now I see they are examples of inputs to the script which in turn will request the endpoints. Moving on.

* Decided not to use Babel and stay only with Node 4 already existant ES2015 features.

* Simplified my recommendation engine from the one I initially planned.

* Otto didn't work out for me yet. I posted a issue on their github, not able to ssh into the VM... Bummer.
