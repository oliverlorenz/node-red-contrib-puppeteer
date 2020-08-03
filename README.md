# maya-red-browser

A fork from Oliver Lorenz's node-red-contrib-puppeteer repo with some extra sauce. Allows controlling headless chrome from NodeRED. For original repo head over to https://github.com/oliverlorenz/node-red-contrib-puppeteer

## Documentation

Each node's of the modules is documented within the editor sidebar. The module has easy to use nodes created from puppeteer functions to control browser, page and DOM elements. For deeper understanding on puppeteer have a look at the puppeteer documentation https://github.com/GoogleChrome/puppeteer/blob/v1.1.1/docs/api.md. 

## List of Nodes

- puppeteer-browser
  - launch
  - openPage
  - close
- puppeteer-page
  - goto
  - content
  - screenshot
  - click
  - clear
  - focus
  - waitFor
  - wait & click
  - find & click
  - close-page
- puppeteerkeyboard
  - type
  - press