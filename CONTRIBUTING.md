# Contributing to "Code du travail numérique" Backoffice

We would love for you to contribute to this project and help make it even better
than it is today! As a contributor, here are the guidelines we would like you to
follow:

 - [Code of Conduct](#code-of-conduct)
 - [Questions](#questions)
 - [Issues and Bugs](#issues-and-bugs)
 - [Coding Rules](#rules)
 - [Commit Message Guidelines](#commit)
 - [Signing the CLA](#cla)

## Code of Conduct

Help us keep Angular open and inclusive. Please read and follow our
[Code of Conduct][link-code-of-conduct].

## Questions

Please [contact us][mail-code-du-travail] if you have any question about this
project.

## Issues and bugs

If you find a bug in the source code, you can help us by
[submitting an issue][link-issues]. Even better, you can submit a Pull Request
with a fix.

## <a name="rules"></a> Coding Rules

TODO Fill this part.

## <a name="commit"></a> Commit Message Guidelines

We have very precise rules over how our git commit messages can be formatted.
This leads to **more readable messages** that are easy to follow when looking
through the **project history**.  But also,
we use the git commit messages to **generate the Angular change log**.

### Commit Message Format

Each commit message consists of a **header**, a **body** and a **footer**.  The header has a special
format that includes a **type**, a **scope** and a **subject**:

```
<type>(<scope>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

The **header** is mandatory and the **scope** of the header is optional.

Any line of the commit message cannot be longer 100 characters! This allows the message to be easier
to read on GitHub as well as in various git tools.

The footer should contain a [closing reference to an issue](https://help.github.com/articles/closing-issues-via-commit-messages/) if any.

Samples: (even more [samples](https://github.com/angular/angular/commits/master))

```
docs(changelog): update changelog to beta.5
```
```
fix(release): need to depend on latest rxjs and zone.js

The version in our package.json gets copied to the one we publish, and users need the latest of these.
```

### Revert

If the commit reverts a previous commit, it should begin with `revert: `, followed by the header of the reverted commit. In the body it should say: `This reverts commit <hash>.`, where the hash is the SHA of the commit being reverted.

### Type

Must be one of the following:

* **build**: Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)
* **ci**: Changes to our CI configuration files and scripts (example scopes: Circle, BrowserStack, SauceLabs)
* **docs**: Documentation only changes
* **feat**: A new feature
* **fix**: A bug fix
* **perf**: A code change that improves performance
* **refactor**: A code change that neither fixes a bug nor adds a feature
* **style**: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
* **test**: Adding missing tests or correcting existing tests

### Scope

The scope should be the name of the npm package affected (as perceived by the person reading the changelog generated from commit messages.

The following is the list of supported scopes:

* **admin**
* **api**
* **ci**
* **contrib**
* **deps**
* **server**

There are currently a few exceptions to the "use package name" rule:

* **changelog**: used for updating the release notes in CHANGELOG.md
* none/empty string: useful for `style`, `test` and `refactor` changes that are
  done across all packages (e.g. `style: add missing semicolons`) and for docs
  changes that are not related to a specific package (e.g. `docs: fix typo in
  tutorial`).

### Subject

The subject contains a succinct description of the change:

* use the imperative, present tense: "change" not "changed" nor "changes"
* don't capitalize the first letter
* no dot (.) at the end

### Body

Just as in the **subject**, use the imperative, present tense: "change" not "changed" nor "changes".
The body should include the motivation for the change and contrast this with previous behavior.

### Footer

The footer should contain any information about **Breaking Changes** and is also the place to
reference GitHub issues that this commit **Closes**.

**Breaking Changes** should start with the word `BREAKING CHANGE:` with a space or two newlines. The rest of the commit message is then used for this.

A detailed explanation can be found in this [document][commit-message-format].

[link-code-of-conduct]: https://github.com/SocialGouv/code-du-travail-numerique/blob/master/CODE_OF_CONDUCT.md
[link-issues]: https://github.com/SocialGouv/code-du-travail-backoffice/issues
[mail-code-du-travail]: mailto:contact@code-du-travail.beta.gouv.fr
