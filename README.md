# Angular Virtual Business Cards Holder

You are given an application that represents a virtual business cards holder.

## Introduction

The application consists of a few components:
* `ContactTypeSelectorComponent` which allows the user to select the type of displayed Contacts (Private/Business/All).
* `RolodexComponent` that displays a list of Contacts and renders the `BusinessCardComponent`.
* `BusinessCardComponent` that takes a `Contact` object via @Input and renders it.

The connections between those components are missing, thus the application does not work.

## Problem Statement

Your goal is to connect the app`s components to make the app work:
1. Implement the `ContactsService`s methods and use them as a glue between `ContactTypeSelectorComponent` and `RolodexComponent`. Make `ContactTypeSelectorComponent` call the `ContactsService.setTypeOfContacts()` method to set the selected type of contacts. The `RolodexComponent` on the other hand should get the data observable via `ContactsService.getContacts()`.
1. Pass the Contact selected by the user from `RolodexComponent` to `BusinessCardComponent` via `@Input() contact`.
1. Do not render `BusinessCardComponent` if the selected Contact is no longer on the list (for example, when you change the type from Business to Private).

## Important

**Do not change the interface of the `ContactsService` and do not modify the HTML structure if it is not necessary.**

## Setup

Follow these steps if you are using zip/git mode (i.e. not available inside Devskiller in-browser IDE):

1. `npm install` – install dependencies
2. `npm test` – run all tests (this will be used to evaluate your solutions)
3. `npm run test:watch` – run all tests in _watch mode_ (alternative to `npm test` which you might find more convenient to use locally)
4. `npm start` – (optional) serve the application locally at [http://localhost:4200/](http://localhost:4200/) (it won't be used to evaluate your solutions)
5. `nvm install` - (optional) set up the expected _major_ version of Node.js locally ([`nvm`](https://github.com/nvm-sh/nvm) required; Node.js version defined in `.nvmrc` file)

This application was generated using [Angular CLI](https://angular.io/cli). It has all the standard setups.

**Good Luck!**
