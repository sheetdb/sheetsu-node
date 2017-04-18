
# sheetsu-node
 <!-- [![Build passing](https://travis-ci.org/sheetsu/sheetsu-ruby.svg?branch=master)](https://travis-ci.org/sheetsu/sheetsu-ruby) [![Code Climate](https://codeclimate.com/github/sheetsu/sheetsu-ruby/badges/gpa.svg)](https://codeclimate.com/github/sheetsu/sheetsu-ruby) [![Test Coverage](https://codeclimate.com/github/sheetsu/sheetsu-ruby/badges/coverage.svg)](https://codeclimate.com/github/sheetsu/sheetsu-ruby/coverage)
Ruby bindings for the Sheetsu API (https://sheetsu.com/docs). -->

## Installation

```
npm install sheetsu-node --save
```

## Usage

### Generating a Client

You need to create a new sheetsu function, and populate it with your Sheetsu API URL. You can find this URL on [Sheetsu Dashboard](https://sheetsu.com/your-apis).

```js
var sheetsu = require('sheetsu-node');

// create a config file
var config = {
  address: '020b2c0f',
};

// Create new client
var client = sheetsu(config);

```
for ES6
```js
import sheetsu from 'sheetsu-node';

// create a config file
var config = {
  address: '020b2c0f',
};

// Create new client
var client = sheetsu(config);
```

If you have HTTP Basic Authentication turned on for your API, you should pass `api_key` and `api_secret` here, like:
```js
// create a config file
var config = {
  address: '020b2c0f',
  api_key: 'YOUR_API_KEY',
  api_secret: 'YOUR_API_SECRET',
};

// Create new client
var client = sheetsu(config);
```

### CRUD

Sheetsu gives you the ability to use full CRUD on your Google Spreadsheet. Remember to populate the first row of every sheet with column names. You can look at [example spreadsheet](https://docs.google.com/spreadsheets/d/1WTwXrh2ZDXmXATZlQIuapdv4ldyhJGZg7LX8GlzPdZw/edit?usp=sharing).

### Create
[Link to docs](https://sheetsu.com/docs#post)

To add data to Google Spreadsheets, send a hash or an array of hashes.
```js
// Adds single row
client.create({ id: 7, name: "Glenn", score: "69" }).then(function(data) {
  console.log(data);
}, function(err){
  console.log(err);
});

/// Adds bunch of rows
rows = [
  { id: 7, name: "Glenn", score: "69" },
  { id: 8, name: "Brian", score: "77" },
  { id: 9, name: "Joe", score: "45" }
]
client.create(rows).then(function(data) {
  console.log(data);
}, function(err){
  console.log(err);
});

```

By default, all writes are performed on the first sheet (worksheet). Pass name of a sheet as a 2nd param to add data to other worksheet.
```js
// Adds single row to worksheet named "Sheet3"
client.create({ id: 7, name: "Glenn", score: "69" }, "Sheet3").then(function(data) {
  console.log(data);
}, function(err){
  console.log(err);
});

```

On success returns a hash or an array of hashes with created values.

### Read
[Link to docs](https://sheetsu.com/docs#get)

Read the whole sheet
```js
client.read({ limit, offset, search, sheet }).then(function(data) {
  console.log(data);
}, function(err){
  console.log(err);
});
```

You can pass hash with options
  - `limit` - limit number of results
  - `offset` - start from N first record
  - `search` - hash with search params [(more below)](#search)
  - `sheet` - get data from named worksheet

```js
// Get first two rows from worksheet named "Sheet2"
client.read({ limit: 2, sheet: "Sheet2" }).then(function(data) {
  console.log(data);
}, function(err){
  console.log(err);
});

// Get 5th and 6th record from worksheet named "Sheet3"
client.read({ limit: 2, offset: 4, sheet: 'Sheet3' }).then(function(data) {
  console.log(data);
}, function(err){
  console.log(err);
});
```

#### search
[Link to docs](https://sheetsu.com/docs#get_search)

To get rows that match search criteria, pass a hash with search params

```js
// Get all rows where column 'id' is 'foo' and column 'value' is 'bar'
client.read({ search: { id: "foo", value: "bar" } }).then(function(data) {
  console.log(data);
}, function(err){
  console.log(err);
});

// Get all rows where column 'First name' is 'Peter' and column 'Score' is '42'
client.read({ search: { 'first name': 'Peter', 'Score': 42 } }).then(function(data) {
  console.log(data);
}, function(err){
  console.log(err);
});


// Get first two row where column 'First name' is 'Peter',
// column 'Score' is '42' from sheet named "Sheet3"
client.read({
  limit: 2,
  search: { 'first name': 'Peter', 'Score': 42 },
  sheet: 'Sheet3'
}).then(function(data) {
  console.log(data);
}, function(err){
  console.log(err);
});

```

On success returns an array of hashes.

### Update
[Link to docs](https://sheetsu.com/docs#patch)

To update row(s), pass column name and its value which is used to find row(s).

``` js
client.update(columnName, value, newRow, updateWhole, sheet).then(function(data) {
  console.log(data);
}, function(err){
  console.log(err);
});
```

```js
// Update all columns where 'name' is 'Peter' to have 'score' = 99 and 'last name' = 'Griffin'
client.update(
  'name', // column name
  'Peter', // value to search for
  { 'score': 99, 'last name': 'Griffin' } // hash with updates
).then(function(data) {
  console.log(data);
}, function(err){
  console.log(err);
});
```

By default, [PATCH request](https://sheetsu.com/docs#patch) is sent, which is updating only values which are in the hash passed to the method. To send [PUT request](https://sheetsu.com/docs#put), pass 4th argument being `true`. [Read more about the difference between PUT and PATCH in our docs](https://sheetsu.com/docs#patch).


```js
// Update all columns where 'name' is 'Peter' to have 'score' = 99 and 'last name' = 'Griffin'
// Empty all cells which matching, which are not 'score' or 'last name'
client.update(
  'name', // column name
  'Peter', // value to search for
  { 'score': 99, 'last name': 'Griffin' }, // hash with updates
  true // nullify all fields not passed in the hash above
).then(function(data) {
  console.log(data);
}, function(err){
  console.log(err);
});

```

To perform `#update` on different than the first sheet, pass sheet name as a 5th argument.
```js
// Update all columns where 'name' is 'Peter' to have 'score' = 99 and 'last name' = 'Griffin'
// In sheet named 'Sheet3'
// Empty all cells which matching, which are not 'score' or 'last name'
client.update(
  'name', // column name
  'Peter', // value to search for
  { 'score': 99, 'last name': 'Griffin' }, // hash with updates
  true, // nullify all fields not passed in the hash above
  'Sheet3'
).then(function(data) {
  console.log(data);
}, function(err){
  console.log(err);
});
```

On success returns an array of hashes with updated values.

### Delete
[Link to docs](https://sheetsu.com/docs#delete)

To delete row(s), pass column name and its value which is used to find row(s).

```js
// Delete all rows where 'name' equals 'Peter'
client.delete(
  'name', // column name
  'Peter' // value to search for
).then(function(data) {
  console.log(data);
}, function(err){
  console.log(err);
});
```

You can pass sheet name as a 3rd argument. All operations are performed on the first sheet, by default.
```js
// Delete all rows where 'foo' equals 'bar' in sheet 'Sheet3'
client.delete(
  'name', // column name
  'Peter', // value to search for
  'Sheet3'
).then(function(data) {
  console.log(data);
}, function(err){
  console.log(err);
});
```

If success returns `:ok` symbol.

## Development

Run all tests:
```
npm test
```

Run a nyan version test:
```
npm run nyan-test
```

## Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/sheetsu/sheetsu-ruby. This project is intended to be a safe, welcoming space for collaboration, and contributors are expected to adhere to the [Contributor Covenant](http://contributor-covenant.org) code of conduct.

### Pull Requests

- **Add tests!** Your patch won't be accepted if it doesn't have tests.

- **Create topic branches**. Please, always create a branch with meaningful name. Don't ask us to pull from your master branch.

- **One pull request per feature**. If you want to do more than one thing, please send
  multiple pull requests.

- **Send coherent history**. Make sure each individual commit in your pull
  request is meaningful. If you had to make multiple intermediate commits while
  developing, please squash them before sending them to us.

### Docs

[Sheetsu documentation sits on GitHub](https://github.com/sheetsu/docs). We would love your contributions! We want to make these docs accessible and easy to understand for everyone. Please send us Pull Requests or open issues on GitHub.
