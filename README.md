# gh-raw
Simply get raw files of github repository

## Install

``` bash
$ npm install gh-raw
```

## Usage

if you want to get [file of github repository](https://github.com/zeakd/gh-raw/blob/master/data/text.md)

``` js
const ghRaw = require('gh-raw')

ghRaw.get('/data/text.md', {
  blob: 'master', // branch name
  repository: 'zeakd/gh-raw',
}).then(res => {
  console.log(res)
  /*
    ---
    title: sample text
    ---

    # text

    This is sample text
    This is another text
   */ 
}).catch(error => {
  console.error(error);
})
```

you can also get [file from past commit](https://github.com/zeakd/gh-raw/blob/9f311db2f4d5032252351806778306dfba1f4be4/data/text.md)


``` js
const ghRaw = require('gh-raw')

ghRaw.get('/data/text.md', {
  blob: '9f311db2f4d5032252351806778306dfba1f4be4', // full commit hash
  repository: 'zeakd/gh-raw',
}).then(res => {
  console.log(res)
  /*
    ---
    title: sample text
    ---

    # text

    This is sample text
   */ 
})
```

## How it works?

it use https://raw.githubusercontent.com/ 
![](screenshot-raw-button.png)

## API

### ghRaw.get(path, [options])

`options` is required without `extend` because `repository` should be specified.

``` js
ghRaw.get('/data/text.md', {
  repository: 'zeakd/gh-raw',
})

// specific branch
ghRaw.get('/data/text.md', {
  repository: 'zeakd/gh-raw',
  blob: 'samples'

  // or you can use alias
  // branch: 'samples'
})

// specific commit
ghRaw.get('/data/text.md', {
  repository: 'zeakd/gh-raw',
  blob: '9f311db2f4d5032252351806778306dfba1f4be4'

  // or you can use alias
  // commit: '9f311db2f4d5032252351806778306dfba1f4be4'
})

```

### ghRaw.extend(options)

ghRaw is extendable. it would be convenient to extend with `reposotory` option.

``` js
const rawRepo = ghRaw.extend({
  repository: 'zeakd/gh-raw',
})

rawRepo.get('data/text.md')

const sampleRepo = rawRepo.extend({
  blob: 'samples',
})

sampleRepo.get('data/text.md')
```

### options

``` js
{
  repository: 'zeakd/gh-raw' // default: undefined, 
  blob: 'master' // default: 'master'. alias : ['branch', 'commit']
}
```