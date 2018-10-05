import test from 'ava';
import ghRaw from '../dist/gh-raw.cjs'

test('get latest master branch file', async t => {
	const res = await ghRaw.get('/data/text.md', {
    repository: 'zeakd/gh-raw'
  })

  t.is(res, `---
title: sample text
---

# text

This is sample text
This is another text`
  )
});

test('get file of specific commit', async t => {
  const res = await ghRaw.get('/data/text.md', {
    repository: 'zeakd/gh-raw',
    blob: '9f311db2f4d5032252351806778306dfba1f4be4'
  })

  t.is(res, `---
title: sample text
---

# text

This is sample text`
  )
})


test('alias branch', async t => {
	const res = await ghRaw.get('/data/text.md', {
    repository: 'zeakd/gh-raw',
    branch: 'samples'
  })

  t.is(res, `---
title: sample text
---

# text

This is sample text
This is another text
This is another another text`
  )
});

test('alias commit', async t => {
  const res = await ghRaw.get('/data/text.md', {
    repository: 'zeakd/gh-raw',
    commit: '9f311db2f4d5032252351806778306dfba1f4be4'
  })

  t.is(res, `---
title: sample text
---

# text

This is sample text`
  )
})
