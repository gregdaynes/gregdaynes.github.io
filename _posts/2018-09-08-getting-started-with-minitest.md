---
layout: post
title: Getting Started With Minitest
categories:
  - post
excerpt: Minitest is a comprehensive testing library that ships with Ruby. Take
  a deep look into what Minitest is, how to use it, some of it's features and
  how it compares to RSpec.
tags:
  - ruby
  - testing
  - minitest
  - rspec
---

{% include components/post/toc.html %}

## What is Minitest?

Minitest is a complete, lightweight suite of testing utilities for Ruby.

It was created and is maintained by the Seattle Ruby community, and was accepted into Ruby core for 1.9.

Minitest provides support for TDD, BDD, Mocks/Stubs, Benchmarking, can run Capybara specs, has a spec DSL, can be easily extended however you see fit (it's Ruby after all).

Here is a quick example of a test in Minitest

{% highlight ruby %}
{% include_relative _getting-started-with-minitest/simple-example.rb %}
{% endhighlight %}

## How to start testing with Minitest

Getting started with Minitest is amazingly easy. If you can write Ruby (even if you've only written a few methods) you can write Minitest.

### Begin by creating your test file

To get started, create a file called `coffee_test.rb`

_It is recommended to follow the Minitest convention by ending the file name with \_test.rb. This is not a hard requirement, but will make for a good habit when adding tests for Rails or other projects that have tooling around `_test`._

Next, add `minitest/autorun` as a requirement
Then create a new class `CoffeeTest` as a subclass of `Minitest::Test`

{% highlight ruby %}

# coffee_test.rb

{% include_relative _getting-started-with-minitest/01a/coffee_test.rb %}
{% endhighlight %}

_You can add more gems, and utilities to add even more power to Minitest, but keep it simple to start._

As your test suite grows, it's a good idea to move all the `require`s and setup into common place like `test_helper.rb`. That way you keep your tests DRY

### Write your first test

Now that the boilerplate ready, add the first test method.

_getting-started-with-minitest tests are just plain old Ruby methods._

Start by adding a new method starting with `test_` to the class.

{% highlight ruby %}

# coffee_test.rb

{% include_relative _getting-started-with-minitest/01b/coffee_test.rb %}
{% endhighlight %}

The `test_` prefix for the method is how Minitest distinguishes Ruby test methods and other methods in the test file, (like helper methods that handle setup, or create data for use across multiple tests).

_`test_` is one way to write tests in Minitest. Another way is to use a Spec DSL, which is explained later in this post.\_

### Write an assertion

An assertion will check to see if the returned value of a block or call evaluates to `true`. If so, the test will pass. If not false, the test fails.

To test the opposite, blocks or calls returning false, use `refute`. The default Minitest `assert` methods have opposite `refute` methods that take the same params.

Now write an assertion, in this case, we're going to test that a new instance of `Coffee` is still a `Coffee`.

{% highlight ruby %}

# coffee_test.rb

{% include_relative _getting-started-with-minitest/01c/coffee_test.rb %}
{% endhighlight %}

This is done using the assertion `assert_instance_of`, which takes a `class`, and an `obj`, checking whether or not the `obj` is an instance of `class`.

### Running your first test

Running a test file is the same as any Ruby script.

Start up a Terminal in the same location as your test file, and run the following command.

{% highlight bash %}
{% include_relative _getting-started-with-minitest/bash_ruby.sh %}
{% endhighlight %}

The output should be similar to the following.

{% highlight bash %}
{% include_relative _getting-started-with-minitest/bash_output_fail.sh %}
{% endhighlight %}

Great! Sort of, the test ran successfully, but the it failed.

### Fix the failing test case

Looking over the output from the test run, notice the following:

- `Run options: --seed 35012` This is the seed test was run with. It is randomized each time the test is run. More on seeds below.
- A series of `...`s and `F`s. These signify successes and exceptions. For now it is just a single `E`
- How long the testing took, how many times it will run in per second, and how many assertions we can run per second. This is useful later in determining how fast your suite is. Fast tests = faster development
- List of errors, where they occurred and possible fix
- General stats about the run of tests just performed

The test ran quickly, but failed. Look over the error. It indicates that `Coffee` is not defined anywhere. That's an easy fix.

Add the `Coffee` class.

{% highlight ruby %}

# coffee.rb

{% include_relative _getting-started-with-minitest/01d/coffee.rb %}

# coffee.rb

{% include_relative _getting-started-with-minitest/01d/coffee_test.rb %}
{% endhighlight %}

And now, run the test again. Same command as before

{% highlight bash %}
{% include_relative _getting-started-with-minitest/bash_ruby.sh %}

{% include_relative _getting-started-with-minitest/bash_output_pass.sh %}
{% endhighlight %}

The test now passes.

That's all there is to testing using Minitest.

### Add another test case

Add a test that will check an instance of Coffee, will return a list of flavours.

The assertion to use here will be `assert_includes`. Which takes a `collection` and an `obj`, validating that the obj is in the collection.

{% highlight ruby %}

# coffee.rb

{% include_relative _getting-started-with-minitest/01e/coffee.rb %}

# coffee_test.rb

{% include_relative _getting-started-with-minitest/01e/coffee_test.rb %}
{% endhighlight %}

## How to write tests using Spec

Minitest comes with a Spec DSL. Which, instead of writing methods, they're written plain english. If you're familiar with RSpec, you'll feel at home with Minitest/Spec.

### Write your first spec

Continuing with our previous coffee example, we'll do the following:

- Update each test `test_description` to use `describe`
- update each test to use `it`statements
- Make use of `let` statements

### Update test descriptions

We'll start by moving our class `Coffee` above the tests.

_Make sure your test follows the class you're resting. This wasn't a requirement before because we were creating a new class. In this case, we're referencing an existing class._

Next, we'll replace our class `CoffeeTest` with a describe block.

{% highlight ruby %}

# coffee.rb

{% include_relative _getting-started-with-minitest/02a/coffee_abbr.rb %}

# coffee_test.rb

{% include_relative _getting-started-with-minitest/02a/coffee_test_abbr.rb %}
{% endhighlight %}

The big change here is

{% highlight ruby %}
{% include_relative _getting-started-with-minitest/02a/change_from.rb %}
{% endhighlight %}

becomes

{% highlight ruby %}
{% include_relative _getting-started-with-minitest/02a/change_to.rb %}
{% endhighlight %}

Everything else stays the same.

_You can nest describe blocks which can help with organizing larger test files into logical pieces._

We're now ready to continue upgrading our tests to specs.

### Replace test methods with it statements

Next, we'll replace `test_` methods with `it` statements. This will make our tests read more like plain language, and less like a Ruby method.

{% highlight ruby %}

# coffee.rb

{% include_relative _getting-started-with-minitest/02b/coffee_abbr.rb %}

# coffee_test.rb

{% include_relative _getting-started-with-minitest/02b/coffee_test_abbr.rb %}
{% endhighlight %}

`it` statements define an expectation with a plain english name. If no name is passed in, it will default to anonymous. For readability, it's recommended to add a name to all `it` statements.

_Under the hood, an `it` statement gets converted into a `test_the_thing` method like we had previously._

### Replace variable definitions with `let` statements

`let` allows you to write a concise accessor that memoizes its contents after the first call to it.

_For our existing tests, we don't have anything that needs it. We're going to make our possible flavours more complicated than just a string so we can try using `let`_

{% highlight ruby %}

# coffee.rb

{% include_relative _getting-started-with-minitest/02c/coffee.rb %}

# coffee_test.rb

{% include_relative _getting-started-with-minitest/02c/coffee_test.rb %}
{% endhighlight %}

You'll notice that we defined the `let` statement outside of the `it` block. This is for reuse in other tests. And because it's memoized, every other test that calls it will use the same value that was returned the first time it was called.

Another common pattern is to put shared `let` statements at the top or at least above a series of tests that depend on them.

**You can only access a `let` value from inside an `it` statement. If you try to access it from outside a `it` statement, the test suite will fail.**

### Replace class calls with subject.

Subject is a lazy man's generator. It will return the block you specify as `subject`.

{% highlight ruby %}

# coffee.rb

{% include_relative _getting-started-with-minitest/02d/coffee.rb %}

# coffee_test.rb

{% include_relative _getting-started-with-minitest/02d/coffee_test.rb %}
{% endhighlight %}

You'll notice that we've placed `subject` above both of our test cases, it's also not overly complex. But allows us to not write `Coffee.new` all over the place.

## Rake Task

_Don't know what rake is?_
Rake is a task runner for Ruby. This post won't show you how to use or write Rake Tasks, but how what a simple task looks like for testing. If you want to learn more about Rake, I recommend [Stuart Ellis's - Using Rake to Automate Tasks](http://www.stuartellis.name/articles/rake/).

Add Rake to your `Gemfile`

{% highlight bash %}
{% include_relative _getting-started-with-minitest/install_rake.sh %}
{% endhighlight %}

Add the following to `rakefile.rb`.

{% highlight ruby %}

# rakefile.rb

{% include_relative _getting-started-with-minitest/rakefile.rb %}
{% endhighlight %}

This will find all files ending with `_test.rb`, and then call each using `Rake::TestTask`.

{% highlight bash %}
{% include_relative _getting-started-with-minitest/bash_rake_task.sh %}
{% endhighlight %}

Which will output results that looks exactly it you called the test directly. The difference is, the rake task groups all the tests to gether.

{% highlight bash %}
{% include_relative _getting-started-with-minitest/bash_rake_task_output.sh %}
{% endhighlight %}

## Finish the test suite

You should now have enough information to start implenting coverage on any of your Ruby programs.

## In Deeper with Minitest

Now we'll take a look into more of the features available in Minitest.

### Built in assertions

Minitest comes with a ton of assertions built in, which will cover almost every test case you can think of. We'll go over a few of the more common assertions below.

Minitest assertions always check for a postive result. If you want to test for negative / false results, each assertion has a negative-twin `refute`. Which take the same params as their positive sibling, but make sure the result is the opposite.

`assert(predicate, msg = nil)` fails unless `predicate` returns true

{% highlight ruby %}
{% include_relative _getting-started-with-minitest/assertions/assert_test.rb %}
{% endhighlight %}

`assert_empty(obj, msg = nil)` fails unless `obj` is empty

{% highlight ruby %}
{% include_relative _getting-started-with-minitest/assertions/assert_empty_test.rb %}
{% endhighlight %}

`assert_includes(collection, obj, msg = nil)` fails unless `collection` includes `obj`

{% highlight ruby %}
{% include_relative _getting-started-with-minitest/assertions/assert_includes_test.rb %}
{% endhighlight %}

`assert_match(matcher, obj, message = nil)` fails unless `matcher` =~ `obj`

{% highlight ruby %}
{% include_relative _getting-started-with-minitest/assertions/assert_match_test.rb %}
{% endhighlight %}

`assert_nil(obj, msg = nil)` fails unless `obj` is `nil`

{% highlight ruby %}
{% include_relative _getting-started-with-minitest/assertions/assert_nil_test.rb %}
{% endhighlight %}

`assert_raise(*exp)` fails unless the block raises an exception

{% highlight ruby %}
{% include_relative _getting-started-with-minitest/assertions/assert_raises_test.rb %}
{% endhighlight %}

Minitest comes with a wide range of assertions for testing. You can see all of the available assertions and refutions in the [Ruby Docs - Assertions](http://ruby-doc.org/stdlib-2.0.0/libdoc/minitest/rdoc/MiniTest/Assertions.html)

### Using Seeds to replay tests

If you've watched the output as you've run throug Minispec, you'll probably have noticed the following

{% highlight bash %}
Run options: --seed 59802
{% endhighlight %}

A seed is a representation of the order of tests, as well as the randomized data inside your tests. Keeping track of seeds allows you, or someone else to rerun the test exactly as a previous time. This helps for debugging failures.

To specify seeds you need to pass in the value when running your test suite.

If you run tests using the Ruby CLI

{% highlight bash %}
ruby test -s 59802
{% endhighlight %}

If you run tests using a Rake Task

{% highlight bash %}
rake test SEED=59802
{% endhighlight %}

### Setting up and tearing down tests

As you start building out tests for your code. You'll notice patterns of setup, start happening around your tests.

Minitest has you covered for wrapping each test with setup code, using `setup` and `teardown`

{% highlight ruby %}
{% include_relative _getting-started-with-minitest/setup_teardown_test.rb %}
{% endhighlight %}

If you're using specs, you can also use `before` and `after`

{% highlight ruby %}
{% include_relative _getting-started-with-minitest/before_after_test.rb %}
{% endhighlight %}

_`setup`, `teardown`, `before`, and `after` will be run around **each** test. This can add significant delays to your tests if you're putting complex setup logic in the setup code. You can add the gem `minitest-hooks` to get access to `before_all`, `after_all` which runs around all tests in the test file. This is more commonly used when testing many parts of an instance that has a decent amount of setup_

### Skipping tests

There comes a time when you are testing your code, and you realize you need to test something else as well. You can remember what you want to write, you can leave yourself a comment, or you can write a `skip` statement.

Using `skip` is the same as using any of the `assert`, `refute` methods.

{% highlight ruby %}
{% include_relative _getting-started-with-minitest/skip_test.rb %}
{% endhighlight %}

Skip statements have an advantage over leaving a comment. That is the test reporter will show a list of all the skipped tests, so if you forget one, there is a small indicator to let you know you still have some work to do.

_But beware if you use setup/teardown, or before/after to do complex setups, these will still be run around the skipped test. This can increase your test time._

### Stubbing

Like other testing libraries, `stub`s temporarily replace a method and return the specified result. The original method is then swapped back in when the stub block is finished.

Stubs are great for temporarily replacing methods that may take too long to run in your test suite, or are incapable of running in the environment. **This does not mean that method should never be tested**. Just that the method might be better tested elsewhere.

{% highlight ruby %}
{% include_relative _getting-started-with-minitest/cup_slow_drink_abbr.rb %}
{% endhighlight %}

{% highlight ruby %}
{% include_relative _getting-started-with-minitest/stub_test.rb %}
{% endhighlight %}

Unlike a `Mock` the method needs to exist prior to stubbing. You can't use a stub on a method that does not exist.

_If you must test a method that doesn't exist, you can use a singleton method to create a new non-existant method_

## Benchmarking Minitest

Minitest comes with benchmarking baked in. This is handy for testing out performance for the code you write.

There are 2 posts from Chris Kottom that describe Benchmarking with Minitest from a high level, as well as practical examples. I recommend reading them a few times.

[Minitest::Benchmark: An Introduction](https://chriskottom.com/blog/2015/04/minitest-benchmark-an-introduction)

[Minitest::Benchmark: A Practical Example](https://chriskottom.com/blog/2015/05/minitest-benchmark-a-practical-example)

## Minitest & Rails

Rails by default uses Minitest to run your tests. In fact, Rails itself is tested using minitest.

The default Rails `test_helper.rb` is configured to run `test` style tests, it looks like the following.

{% highlight ruby %}

# test_helper.rb

{% include_relative _getting-started-with-minitest/rails_test_helper_default.rb %}
{% endhighlight %}

We can add support for Minitest::Spec DSL pretty easily.

{% highlight ruby %}

# test_helper.rb

{% include_relative _getting-started-with-minitest/rails_test_helper_spec.rb %}
{% endhighlight %}

With spec support inside `test_helper.rb` you can now write test, specs, and any combination of features to test your Rails code. _MAGIC_

## References

This post only covers a small portion of what Minitest can do. That is not including what the numerous extensions bring to the table.

The following links should help you on your way to mastering Minitest.

- [SeattleRB - Minitest](https://github.com/seattlerb/minitest)
- [Ruby Docs - Minitest](http://ruby-doc.org/stdlib-2.0.0/libdoc/minitest/rdoc/MiniTest.html)
