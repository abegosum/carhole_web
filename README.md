# README

## Installation

* sudo chown -R pi:pi carhole_web
* bundle install
* RAILS_ENV=production rails assets:precompile
* Set up secret
** EDITOR=vim rails credentials:edit
* bundle exec puma -b tcp://0.0.0.0:8080 -e production

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...
