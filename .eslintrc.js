// Must Replace this file with your .eslintrc.js file after install your dependency
module.exports = {
  parser: '@typescript-eslint/parser',

  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    project: './tsconfig.json',
  },
  env: {
    browser: true,
    'react-native/react-native': true,
    node: true,
    commonjs: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'airbnb',
    'airbnb/hooks',
    'prettier',
    'plugin:react-native/all',
    'plugin:@typescript-eslint/recommended', // Add TypeScript rules
    'plugin:@typescript-eslint/recommended-requiring-type-checking', // Add rules that require type checking
  ],
  overrides: [],
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        '@typescript-eslint/explicit-module-boundary-types': 'off', // Disable explicit return types for components
        '@typescript-eslint/no-empty-interface': 'off', // Allow empty interfaces
      },
    },
  ],

  plugins: ['react', 'react-native', '@typescript-eslint'],
  settings: {
    'import/resolver': {
      node: {
        paths: ['.', 'app', 'lib', 'functions'], // name the subproject folders here!!!
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  rules: {
    // Used Flags based on priority
    // warn:1
    // error:2
    // off:0
    // allow .js files to contain JSX code
    'react/jsx-filename-extension': [
      1,
      {
        extensions: ['.js', '.jsx', '.tsx', '.ts'],
      },
    ],

    // ----------React native/react Possible Errors---------
    'react/no-children-prop': 1,
    'react/no-danger-with-children': 1,
    'react/no-deprecated': 1,
    'react/react-in-jsx-scope': 'off',
    'react/jsx-uses-react': 'warn',
    'react/jsx-uses-vars': 'warn',
    'react/display-name': 1,
    'react/jsx-key': 1,
    'react/jsx-no-comment-textnodes': 1,
    'react/jsx-no-duplicate-props': 1,
    'react/jsx-no-target-blank': 1,
    'react/jsx-no-undef': 1,
    'react/no-direct-mutation-state': 1,
    'react/no-find-dom-node': 1,
    'react/no-is-mounted': 1,
    'react/no-render-return-value': 1,
    'react/no-string-refs': 1,
    'react/no-unescaped-entities': 1,
    'react/no-unknown-property': 1,
    'react/no-unsafe': 0,

    'react-native/no-unused-styles': 1,
    'react-native/split-platform-components': 1,
    'react-native/no-inline-styles': 2,
    'react-native/no-color-literals': 1,
    'react-native/no-raw-text': 0,
    'react-native/no-single-element-style-arrays': 1,
    'react/prop-types': 'off',
    'no-unused-vars': 1,
    'no-console': 0,
    'react-native/sort-styles': [
      'error',
      'asc',
      {
        ignoreClassNames: false,
        ignoreStyleProperties: false,
      },
    ],
    'import/prefer-default-export': 'off',
    'react/state-in-constructor': 'off',
    'react/static-property-placement': 'off',
    'react/jsx-props-no-spreading': 'off',
    'no-param-reassign': 'off',
    'no-use-before-define': ['error', {variables: false}],
    'import/no-extraneous-dependencies': [
      'off',
      {
        devDependencies: false,
        optionalDependencies: false,
        peerDependencies: false,
        packageDir: './',
      },
    ],
    'no-await-in-loop': 1,
    'vars-on-top': 1,
    'require-await': 0,
    'prefer-promise-reject-errors': 1,
    'no-useless-escape': 1,
    'no-useless-call': 1,
    'no-unmodified-loop-condition': 1,
    'no-self-compare': 1,
    'no-return-await': 0,
    'no-return-assign': 1,
    'default-case': 0, // require default cases in switch statements
    'no-empty-function': 1, // disallow empty functions
    camelcase: 1, // enforce camelcase naming convention
    'accessor-pairs': 1, // enforce getter and setter pairs in objects
    'array-callback-return': 1, // enforce return statements in callbacks of array methods
    'block-scoped-var': 1, // enforce the use of variables within the scope they are defined
    'class-methods-use-this': 0, // enforce that class methods utilize this
    complexity: 1, // enforce a maximum cyclomatic complexity allowed in a program
    'consistent-return': 0, // require return statements to either always or never specify values
    'no-underscore-dangle': 1, // disallow dangling underscores in identifiers
    'react/no-array-index-key': 0, // Disallow usage of Array index in keys
    'react/sort-comp': 0, // Enforce component methods order
    'no-nested-ternary': 0,
    'react/no-unused-class-component-methods': 1,
    'react/destructuring-assignment': 2,
    'import/no-unresolved': 1,
    // -----------------------------All Rules-----------

    // //////// Possible Errors //////////

    'comma-dangle': 1, // disallow trailing commas in object literals
    'no-cond-assign': 1, // disallow assignment in conditional expressions
    'no-constant-condition': 1, // disallow use of constant expressions in conditions
    'no-control-regex': 1, // disallow control characters in regular expressions
    'no-debugger': 1, // disallow use of debugger
    'no-dupe-keys': 1, // disallow duplicate keys when creating object literals
    'no-empty': 1, // disallow empty statements
    'no-empty-character-class': 1, // disallow the use of empty character classes in regular expressions
    'no-ex-assign': 1, // disallow assigning to the exception in a catch block
    'no-extra-boolean-cast': 1, // disallow double-negation boolean casts in a boolean context
    'no-extra-parens': 1, // disallow unnecessary parentheses (off by default)
    'no-extra-semi': 1, // disallow unnecessary semicolons
    'no-func-assign': 1, // disallow overwriting functions written as function declarations
    'no-inner-declarations': 1, // disallow function or variable declarations in nested blocks
    'no-invalid-regexp': 1, // disallow invalid regular expression strings in the RegExp constructor
    'no-irregular-whitespace': 1, // disallow irregular whitespace outside of strings and comments
    'no-negated-in-lhs': 1, // disallow negation of the left operand of an in expression
    'no-obj-calls': 1, // disallow the use of object properties of the global object (Math and JSON) as functions
    'no-regex-spaces': 1, // disallow multiple spaces in a regular expression literal
    'quote-props': 1, // disallow reserved words being used as object literal keys (off by default)
    'no-sparse-arrays': 1, // disallow sparse arrays
    'no-unreachable': 1, // disallow unreachable statements after a return, throw, continue, or break statement
    'use-isnan': 1, // disallow comparisons with the value NaN
    'valid-jsdoc': 1, // Ensure JSDoc comments are valid (off by default)
    'valid-typeof': 1, // Ensure that the results of typeof are compared against a valid string

    /// ///// Best Practices //////////

    curly: 1, // specify curly brace conventions for all control statements
    'dot-notation': 1, // encourages use of dot notation whenever possible
    eqeqeq: 1, // require the use of === and !==
    'guard-for-in': 1, // make sure for-in loops have an if statement (off by default)
    'no-alert': 1, // disallow the use of alert, confirm, and prompt
    'no-caller': 1, // disallow use of arguments.caller or arguments.callee
    'no-div-regex': 1, // disallow division operators explicitly at beginning of regular expression (off by default)
    'no-else-return': 1, // disallow else after a return in an if (off by default)
    'no-labels': 1, // disallow use of labels for anything other then loops and switches
    'no-eq-null': 1, // disallow comparisons to null without a type-checking operator (off by default)
    'no-eval': 1, // disallow use of eval()
    'no-extend-native': 1, // disallow adding to native types
    'no-extra-bind': 1, // disallow unnecessary function binding
    'no-fallthrough': 1, // disallow fallthrough of case statements
    'no-floating-decimal': 1, // disallow the use of leading or trailing decimal points in numeric literals (off by default)
    'no-implied-eval': 1, // disallow use of eval()-like methods
    'no-iterator': 1, // disallow usage of __iterator__ property
    'no-lone-blocks': 1, // disallow unnecessary nested blocks
    'no-loop-func': 1, // disallow creation of functions within loops
    'no-multi-spaces': 1, // disallow use of multiple spaces
    'no-multi-str': 1, // disallow use of multiline strings
    'no-native-reassign': 1, // disallow reassignments of native objects
    'no-new': 1, // disallow use of new operator when not part of the assignment or comparison
    'no-new-func': 1, // disallow use of new operator for Function object
    'no-new-wrappers': 1, // disallows creating new instances of String, Number, and Boolean
    'no-octal': 1, // disallow use of octal literals
    'no-octal-escape': 1, // disallow use of octal escape sequences in string literals, such as var foo = "Copyright \251";
    'no-process-env': 1, // disallow use of process.env (off by default)
    'no-proto': 1, // disallow usage of __proto__ property
    'no-redeclare': 1, // disallow declaring the same variable more then once
    'no-script-url': 1, // disallow use of javascript: urls.
    'no-sequences': 1, // disallow use of comma operator
    'no-unused-expressions': 1, // disallow usage of expressions in statement position
    'no-void': 1, // disallow use of void operator (off by default)
    'no-warning-comments': 1, // disallow usage of configurable warning terms in comments, e.g. TODO or FIXME (off by default)
    'no-with': 1, // disallow use of the with statement
    radix: 1, // require use of the second argument for parseInt() (off by default)
    'wrap-iife': 1, // require immediate function invocation to be wrapped in parentheses (off by default)
    yoda: 1, // require or disallow Yoda conditions

    /// ///// Strict Mode //////////

    'global-strict': 0, // (deprecated) require or disallow the "use strict" pragma in the global scope (off by default in the node environment)
    'no-extra-strict': 0, // (deprecated) disallow unnecessary use of "use strict"; when already in strict mode
    strict: 0, // controls location of Use Strict Directives

    /// ///// Variables //////////

    'no-catch-shadow': 0, // disallow the catch clause parameter name being the same as a variable in the outer scope (off by default in the node environment)
    'no-delete-var': 1, // disallow deletion of variables
    'no-label-var': 0, // disallow labels that share a name with a variable
    'no-shadow': 0, // disallow declaration of variables already declared in the outer scope
    'no-shadow-restricted-names': 0, // disallow shadowing of names such as arguments
    'no-undef': 1, // disallow use of undeclared variables unless mentioned in a /*global */ block
    'no-undef-init': 0, // disallow use of undefined when initializing variables
    'no-undefined': 0, // disallow use of undefined variable (off by default)

    // /////// Stylistic Issues //////////

    'brace-style': 0, // enforce one true brace style (off by default)
    'comma-spacing': 1, // enforce spacing before and after comma
    'comma-style': 1, // enforce one true comma style (off by default)
    'consistent-this': 1, // enforces consistent naming when capturing the current execution context (off by default)
    'eol-last': 0, // enforce newline at the end of file, with no multiple empty lines
    'func-names': 0, // require function expressions to have a name (off by default)
    'func-style': 0, // enforces use of function declarations or expressions (off by default)
    'key-spacing': 0, // enforces spacing between keys and values in object literal properties
    'max-nested-callbacks': 0, // specify the maximum depth callbacks can be nested (off by default)
    'new-cap': 0, // require a capital letter for constructors
    'new-parens': 0, // disallow the omission of parentheses when invoking a constructor with no arguments
    'no-array-constructor': 0, // disallow use of the Array constructor
    'no-inline-comments': 0, // disallow comments inline after code (off by default)
    'no-lonely-if': 0, // disallow if as the only statement in an else block (off by default)
    'no-mixed-spaces-and-tabs': 0, // disallow mixed spaces and tabs for indentation
    'no-multiple-empty-lines': 0, // disallow multiple empty lines (off by default)
    'no-new-object': 0, // disallow use of the Object constructor
    'no-space-before-semi': 0, // disallow space before semicolon
    'no-spaced-func': 0, // disallow space between function identifier and application
    'no-ternary': 0, // disallow the use of ternary operators (off by default)
    'no-trailing-spaces': 0, // disallow trailing whitespace at the end of lines
    'no-wrap-func': 0, // disallow wrapping of non-IIFE statements in parens
    'one-var': 0, // allow just one var statement per function (off by default)
    'operator-assignment': 0, // require assignment operator shorthand where possible or prohibit it entirely (off by default)
    'padded-blocks': 0, // enforce padding within blocks (off by default)
    quotes: 0, // specify whether double or single quotes should be used
    semi: 0, // require or disallow use of semicolons instead of ASI
    'sort-vars': 0, // sort variables within the same declaration block (off by default)
    'space-after-function-name': 0, // require a space after function names (off by default)
    'space-after-keywords': 0, // require a space after certain keywords (off by default)
    'space-before-blocks': 0, // require or disallow space before blocks (off by default)
    'space-in-brackets': 0, // require or disallow spaces inside brackets (off by default)
    'space-in-parens': 0, // require or disallow spaces inside parentheses (off by default)
    'space-infix-ops': 0, // require spaces around operators
    'space-return-throw-case': 0, // require a space after return, throw, and case
    'space-unary-ops': 0, // Require or disallow spaces before/after unary operators (words on by default, nonwords off by default)
    'spaced-line-comment': 0, // require or disallow a space immediately following the // in a line comment (off by default)
    'wrap-regex': 0, // require regex literals to be wrapped in parentheses (off by default)

    /// ///// ECMAScript 6 //////////

    'no-var': 0, // require let or const instead of var (off by default)
    'generator-star': 0, // enforce the position of the * in generator functions (off by default)
    'constructor-super': 1,

    // //////// Legacy //////////

    'max-depth': 0, // specify the maximum depth that blocks can be nested (off by default)
    'max-len': 0, // specify the maximum length of a line in your program (off by default)
    'max-params': 0, // limits the number of parameters that can be used in the function declaration. (off by default)
    'max-statements': 0, // specify the maximum number of statement allowed in a function (off by default)
    'no-bitwise': 0, // disallow use of bitwise operators (off by default)
    'no-plusplus': 0, // disallow use of unary operators, ++ and -- (off by default)
    'max-classes-per-file': ['off', {ignoreExpressions: true, max: 2}],
    'no-restricted-syntax': 0,
    'react/no-unused-prop-types': 1,
    'object-shorthand': 1,
    'import/no-cycle': [
      'warn',
      {
        maxDepth: 1,
        ignoreExternal: true,
      },
    ],
    'global-require': 0,
    'react/require-default-props': 0,
    'import/extensions': 'off',
    'react/function-component-definition': 0,

    // -----Hooks Rules-----
    'react-hooks/exhaustive-deps': 0,
    'default-param-last': 0,
    'react/forbid-prop-types': 0,

    // -------Typescript Rules--------
    'typescript-eslint/no-unsafe-assignment': 'off',
    '@typescript-eslint/no-unused-vars': 1,
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/no-unsafe-argument': 1,
    '@typescript-eslint/no-unsafe-assignment': 1,
    '@typescript-eslint/require-await': 1,
  },
};
