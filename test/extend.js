import test from 'ava';
import ghRaw from '../dist/gh-raw.cjs'

const myRaw = ghRaw.extend({
  repository: 'zeakd/gh-raw',
})

test('get latest master branch file', async t => {
	const res = await myRaw.get('/data/text.md')

  t.is(res, `---
title: sample text
---

# text

This is sample text
This is another text`
  )
});

test('get file of specific commit', async t => {
  const res = await myRaw.get('/data/text.md', {
    blob: '9f311db2f4d5032252351806778306dfba1f4be4'
  })

  t.is(res, `---
title: sample text
---

# text

This is sample text`
  )
})

test('branch alias', async t => {
	const res = await myRaw.get('/data/text.md', {
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

test('commit alias', async t => {
  const res = await myRaw.get('/data/text.md', {
    commit: '9f311db2f4d5032252351806778306dfba1f4be4'
  })

  t.is(res, `---
title: sample text
---

# text

This is sample text`
  )
})

test('extend with branch alias', async t => {
  const samplesBranchRaw = myRaw.extend({
    branch: 'samples'
  })
	const res = await samplesBranchRaw.get('/data/text.md')

  t.is(res, `---
title: sample text
---

# text

This is sample text
This is another text
This is another another text`
  )
});

test('extend with commit alias', async t => {
  const commitRaw = myRaw.extend({
    commit: '9f311db2f4d5032252351806778306dfba1f4be4'
  })
	const res = await commitRaw.get('/data/text.md')
  

  t.is(res, `---
title: sample text
---

# text

This is sample text`
  )
})
