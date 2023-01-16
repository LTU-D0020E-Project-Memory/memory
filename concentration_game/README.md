## Contents of this file

 * Introduction
 * Recommended modules
 * Installation
 * Configuration


## Introduction

**The Concentration Game** lets you put up a custom block to let users
play the game [Concentration][WP] on your website.

* For a full description of the module, visit the [project page][PP].

* To submit bug reports and feature suggestions, or to track changes
  visit the project's [issue tracker][IT].

## Requirements

This module requires no modules outside of Drupal core.


## Installation

1. Install as you would normally install a contributed Drupal
   module. Visit [Installing modules][IM] for further information.

2. Enable module by locating it on the list under the Extend
   tab in the administrative GUI.


## Configuration

The game will not appear until you've configured a custom block for
the game board, and added images for the cards. You also need to place
place the block on a page for the game to appear.

First, navigate to **Manage » Structure » Block layout** and select
the tab "Custom block library" and then press "Add custom
block". Select the block named "Concentration".

In order to add be able to add the block to you site, you need to
configure all the required fields.

In the field "Block description, enter "Concentration game block".

The field "Game images" *must* hold all the the eigth images that
players will need to remember when they play the game. You add each
image by pressing "Add media". You can add images that already exist
in your media library, or browse your computer for new images to add.

In the field "Continue link" you can either type the title of another
node on your website (it will autocomplete if it exists), or an
internal path. In "Link text", type the test to show on the button for
the link.

When done configuring the block, scroll down to the bottom of the page
and press "Save"

After changing the configuration, you need to rebuild the cache for
changes to have any effect.

Now, you need to pick a region the region where this block should be
displayed.  Navigate to **Manage » Structure » Block layout** and pick
a region. If you just want to try out the game, the simplest is to
pick the main content region. It will probably be named something like
"Content" or "Main content" (the exact name is determined by the
theme).

Click "Place" block for the region. You should see a list of blocks.
If you entered "Concentration game block" in the field for the block
description, locate that, and click "Place block" to the right of it.

Now, visit any page on your website, and you should see the custom
block with the game it and be able to play.

To restrict the game to a single page, create a Basic page to hold the
custom game block and change the configuration for the block to
restrict it to the Basic page you created to hold the block.


[WP]: https://en.wikipedia.org/wiki/Concentration_(card_game)
[PP]: https://drupal.org/project/concentration_game
[IT]: https://drupal.org/project/issues/concentration_game
[IM]: https://www.drupal.org/node/1897420
