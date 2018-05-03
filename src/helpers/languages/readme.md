# Languages
I can't believe it's not \[Insert existing library here\]!

## Adding a language
Make a new file [named based on this](http://www.iana.org/assignments/language-subtag-registry/language-subtag-registry) and import it in `index.js`  
Make an object full of functions

If your language requires context, take in some of the keys of the `extras` object that is passed in.

Some keys that you might find are:

Key       | Description                                                                                                             | Type or Possible Values
--------- | ----------------------------------------------------------------------------------------------------------------------- | -----------------
count     | An integer number.                                                                                                      | An integer
gender    | The gender of the item being referred to.                                                                               | An integer<br />`0` - Not known<br />`1` - Male<br />`2` - Female<br />`9` - Not applicable<br />ISO/IEC 5218, _Information technology — Codes for the representation of human sexes_
time      | The time represented as `new Date()`                                                                                    | JavaScript `Date`
future    | Describes if the following `years`, `months`, `days`, `hours`, `minutes`, `seconds` is referring to the future from now | Boolean
years     | A scalar for the number of years since `time`                                                                           | A positive integer
months    | A scalar for the number of months since `time`                                                                          | A positive integer
days      | A scalar for the number of days since `time`                                                                            | A positive integer
hours     | A scalar for the number of hours since `time`                                                                           | A positive integer
minutes   | A scalar for the number of minutes since `time`                                                                         | A positive integer
seconds   | A scalar for the number of seconds since `time`                                                                         | A positive number
