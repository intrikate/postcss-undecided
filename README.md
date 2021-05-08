# PostCSS Undecided

[PostCSS] plugin to conditionally strip/keep styles depending on build-time configuration.

[PostCSS]: https://github.com/postcss/postcss

The following

```css
@env development {
	:root {
		color: darkred;
	}
}
```

will output either

```css
:root {
	color: darkred;
}
```

or nothing at all, depending on the value of `env` in the plugin options.

This allows branching of a single source into multiple builds before bundling, which is useful in cases where bundlers, lacking necessary information at build time, may remain undecided and opt to include styles that could otherwise be safely removed.

## Usage

**Step 1:** Install plugin:

```sh
npm install --save-dev postcss postcss-undecided
```

**Step 2:** Check you project for existing PostCSS config: `postcss.config.js`
in the project root, `"postcss"` section in `package.json`
or `postcss` in bundle config.

If you do not use PostCSS, add it according to [official docs]
and set this plugin in settings.

**Step 3:** Add the plugin to plugins list:

```diff
module.exports = {
  plugins: [
+   require('postcss-undecided')({/* Options */}),
    require('autoprefixer')
  ]
}
```

[official docs]: https://github.com/postcss/postcss#usage

## Options

Without any options, the plugin does nothing.

Options are arbitrary key-value pairs defining, respectively, the at-rule names and their values.

```javascript
require('postcss-undecided')({
	// Will correspond to `@env` in CSS
	env: process.env.NODE_ENV
});
```

Because each key adds a separate at-rule, it is entirely possible (although not recommended) to go overboard and create as many pairs as desired.

All values are treated as strings, meaning that assigning an expression that evaluates to `false` will work with rules like `@dev false {...}` without prior string conversion.

The plugin intentionally avoids providing a false sense of security and does not guard against overriding existing at-rules. As other plugins may add their own at-rules, users are encouraged to know their surroundings and choose names carefully.
