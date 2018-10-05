import babel from 'rollup-plugin-babel'
import pkg from './package.json';

const dependencies = Object.keys(pkg.dependencies);

export default [
  {
    input: 'src/gh-raw.js',
    plugins: [
      babel({
        exclude: 'node_modules/**'
      }),
    ],
    external: dependencies,
    output: [
      {
        file: pkg.main, format: 'cjs',
      },
      {
        file: pkg.module, format: 'esm'
      }
    ]
  }
]

