<!-- <div style="display: flex; align-items: center; justify-content: center; margin: 1rem auto;">
  <div style='display: flex; align-items: center; gap: 1rem;'>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/jquery/jquery-original.svg" width=100 alt='jquery' />
  →
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" width=100 alt='javascript' />
  </div>
</div> -->

<p align="center">
  <a href="https://dilshod-me.netlify.app/unjquery" target="_blank" rel="noopener noreferrer">
    🔫
  </a>
</p>

<!-- <p align="center">
  <a href="https://vitejs.dev" target="_blank" rel="noopener noreferrer">
    <img width="180" src="https://vitejs.dev/logo.svg" alt="Vite logo">
  </a>
</p>
<br/>
<p align="center">
  <a href="https://npmjs.com/package/vite"><img src="https://img.shields.io/npm/v/vite.svg" alt="npm package"></a>
  <a href="https://nodejs.org/en/about/previous-releases"><img src="https://img.shields.io/node/v/vite.svg" alt="node compatibility"></a>
  <a href="https://github.com/vitejs/vite/actions/workflows/ci.yml"><img src="https://github.com/vitejs/vite/actions/workflows/ci.yml/badge.svg?branch=main" alt="build status"></a>
  <a href="https://pr.new/vitejs/vite"><img src="https://developer.stackblitz.com/img/start_pr_dark_small.svg" alt="Start new PR in StackBlitz Codeflow"></a>
  <a href="https://chat.vitejs.dev"><img src="https://img.shields.io/badge/chat-discord-blue?style=flat&logo=discord" alt="discord chat"></a>
</p>
<br/> -->

# unjquery

> Unleash the power of modern JavaScript

<!-- with our cutting-edge jQuery to VanillaJS Compiler! This innovative tool seamlessly translates legacy jQuery code into clean, efficient, and maintainable vanilla JavaScript, empowering developers to harness the full potential of contemporary web development. -->

- 🖼 Interactive Interface
- ⚙ Backwards Compatible

## Philosophy

**Warning!** We rely on a heuristic that is not using variables alongside with jQuery APIs

<!-- ## Key Features -->

<!-- - **Accurate Conversion**:Transforms jQuery methods and patterns into their vanilla JavaScript equivalents with precision.
- **Comprehensive Coverage**: Supports a wide range of jQuery functionalities, ensuring a smooth and thorough conversion process.
- **Customizable Output**: Offers configuration options to tailor the generated code to meet specific coding standards and preferences.
- **Detailed Reporting**: Provides insightful reports highlighting the changes made and any potential issues that may need manual adjustments.
- **Interactive Interface**: Features an intuitive UI for users to input jQuery code and visualize the vanilla JavaScript output in real-time. -->

## Benefits

- **Performance Boost**: Eliminate the overhead of jQuery, leading to faster load times and improved responsiveness.
- **Modern Standards**: Align your codebase with modern JavaScript standards and best practices.
- **Reduced Dependencies**: Simplify your project by removing the need for the jQuery library.
<!-- - **Enhanced Maintainability**: Benefit from cleaner, more readable code that's easier to understand and maintain. -->

## Who is it for?

- **Web developers**: Looking to modernize their existing jQuery-based projects.
- **Companies**: Seeking to improve the performance and maintainability of their web applications.
- **Educators and Students**: Exploring the differences and advantages of vanilla JavaScript over jQuery.

<!-- ## Join the Modern Web Movement

**Unjquery** is your gateway to a future-proof codebase. By transitioning to vanilla JavaScript, you ensure that your projects remain relevant and optimized for years to come. Say goodbye to outdated dependencies and embrace the elegance and efficiency of modern JavaScript today! -->

## Installation

For maximum compatibility, install volta on your system to get the project's node version automatically whenever you open the project with your editor.

## Supported jQuery APIs

| Ajax         | Support | Description |
| ------------ | ------- | ----------- |
| `.getJson()` | partial |             |

| Attributes | Support | Description |
| ---------- | ------- | ----------- |
| `.html()`  | partial |             |
| `.prop()`  | partial |             |

| Core              | Support | Description |
| ----------------- | ------- | ----------- |
| `$()`, `jQuery()` | full    |             |
| `.each()`         | partial |             |
| `.noop()`         | full    |             |
| `.pushStack()`    | partial |             |

| CSS              | Support | Description                          |
| ---------------- | ------- | ------------------------------------ |
| `.css()`         | partial | only string properties are supported |
| `.toggleClass()` | partial |                                      |
| `.addClass()`    | partial |                                      |
| `.removeClass()` | partial |                                      |
| `.fadeIn()`      | partial |                                      |

| Effects     | Support | Description |
| ----------- | ------- | ----------- |
| `.toggle()` | partial |             |

| Events     | Support | Description |
| ---------- | ------- | ----------- |
| `.click()` | partial |             |

| Manipulation  | Support | Description |
| ------------- | ------- | ----------- |
| `.remove()`   | partial |             |
| `.text()`     | partial |             |
| `.appendTo()` | partial |             |

| Traversing | Support | Description |
| ---------- | ------- | ----------- |
| `.find()`  | partial |             |
| `.end()`   | partial |             |

## Limitations

- If jquery objects returned by jquery call (`$` or `jQuery`) are assigned to variables, the compiler doesn't touch them.
- Code generator doesn't keep the correct code lines and messes up comment lines and blocks

## Tools & References

[Babel](https://babeljs.io)

[Babel Plugin Handbook](https://github.com/jamiebuilds/babel-handbook/blob/master/translations/en/plugin-handbook.md)

[Babel Parser AST Spec](https://github.com/babel/babel/blob/master/packages/babel-parser/ast/spec.md)

[AST Explorer](https://astexplorer.net)

[You Might Not Jquery](https://youmightnotneedjquery.com)

[Jquery API](https://api.jquery.com)

## Contribution

See [Contributing Guide](CONTRIBUTING.md).

## License

[MIT](LICENSE).

## Problems

- breaking changes in jQuery api versions
- injecting js, css assets
- extensible core transformer
- integrating code-frame
