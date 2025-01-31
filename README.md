# START PROJECT

## Description

A front-end development toolkit with UI components, animations, and functions organized in structured SCSS, HTML, and JS files.

**Important!** Due to the use of a modular structure, the project requires Live Server for VS Code or its built-in equivalent in PHP Storm to run.

## File Structure

### SCSS

- **_default.scss** — main global styles, definition of base variables
- **_form-components.scss** — styles for forms and their elements
- **_functions.scss** — SCSS functions for value calculations
- **_keyframes.scss** — animations using keyframes
- **_media-queries.scss** — media queries for responsiveness
- **_text-sections.scss** — styles for text blocks
- **style.scss** — main SCSS file combining all modules

### HTML

- **index.html** — example page with markup and necessary style and script connections
- **components.html** — contains examples of components such as modal windows, tabs, accordions, sliders, and buttons

### JavaScript

- **em_engine.js** — font size and screen width configuration depending on device
- **main.js** — main control script initializing all modules
- **components.js** — functionality for tabs, accordions, and scroll-to-top button
- **modal.js** — modal window logic
- **number_anim.js** — animation of numerical values during scrolling
- **scroll_anim.js** — element animations during page scrolling
- **sliders.js** — initialization and configuration of Swiper.js with responsive support
- **smooth_func.js** — helper functions for smooth animations (`slideUp`, `slideDown`, `slideToggle`)
- **sticky_nav.js** — navigation with active link highlighting during scroll
- **utils.js** — utility helpers (event handlers, UTM parameter handling, custom `$` selectors)
- **phone_mask.js** — phone number input mask based on region
- **form.js** — form submission handler with `fetch`, `reCAPTCHA`, and modal window support

## Helper Classes

- **.holder** — main container with max-width `1230px`, margins `0 auto`, `padding: 0 15px`
- **.grid-container** — container for grid layout
- **.span-col-2, .span-col-3, .span-col-4** — control grid column width
- **.span-row-2, .span-row-3, .span-row-4** — control grid row height
- **.flex-container** — flex container with center alignment
- **.align-left, .align-center, .align-right** — control horizontal alignment
- **.hidden** — hide elements
- **var(--vh, 100vh)** — real phone's viewport height

## Form and Data Submission

### form.js

- Import with `import { form } from './form.js'`
- Usage:
  ```javascript
  form('/api/send') // Send all forms to send.php
  ```
- Supports configuration object: (optional)
  ```javascript
  form('/api/send', 'your_site_key') // Send all forms with reCaptcha
  ```
  ```javascript
  form({
    default: '/api/send',    // default endpoint for all forms
    1: '/api/send_2',        // custom endpoint for data-formx="1"
    callback: '/api/send_3'  // custom endpoint for data-formx="callback"
  }, 'your_site_key')       // Optional: reCAPTCHA site key
  ```
- For `reCAPTCHA` usage, just specify the keys and activate in send.php
- After successful form submission, closes the modal window and opens `#modal-thanks`
- **Server handler configuration is in `send.php`. Only `config` needs to be filled in, no need to edit the code.**

## Components and Their Usage

### Sliders (Swiper.js)

- Uses `.swiper` class
- Number of displayed slides set by `data-slides-per-view="4"`
- `data-pagination="false"` disables pagination
- `.mobileOnly` — enable only on mobile devices

### Image Gallery (FancyBox)

- Works with `data-fancybox="gallery"` attribute
- Supports preview and zoom

### Fixed Menu

- `.sticky-nav` — navigation container
- `.js-nav-trigger` — elements for which scrolling is enabled

### Accordions

- `.accordion` — accordion container
- `.item` — element
- `.header` — header
- `.content` — content
- `.multiple` — support for multiple open elements

### Tabs

- `.tab-container` — container
- `.tab-nav [data-tab]` — toggle buttons
- `.tab-content > .item` — tab content

## Connected Libraries

- **Swiper.js** — for slider implementation
- **FancyBox** — for working with image galleries and modals
- **InputMask.js** — for phone number mask

## Installation and Usage

1. Clone the repository
2. Ensure style and script files load correctly
3. Connect and configure necessary components in HTML
4. Set `theme-color` in `<head>`
5. Upload `/img/favicon.png` icon
6. `Montserrat` font is connected by default. Change if necessary
7. Change main content font size in `em_engine.js` (`defaultFont` variable) and in `_default.scss` (`$base-font-size`)

## em unit

The build includes an engine for working with `em` instead of `px` for fonts and spacing.

- Use ```em(15)``` instead of ```15px```
- Spacing is based on font size, use the second parameter to specify the font size set for the current element:
  ```em(15, 20)``` — 15px spacing for an element with 20px font size
- Default font size is 16, can be changed in `main.js` (see `CONFIG`) and in `_functions.scss` (see `$base-font-size`)
- Changing other parameters is not recommended