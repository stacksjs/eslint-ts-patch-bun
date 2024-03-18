import antfu from '@antfu/eslint-config'

const a: string = 'Hello'

// eslint-disable-next-line no-console
console.log(`${a} from TS!`)

export default antfu(
  {
    stylistic: {
      indent: 4, // 4, or 'tab'
      quotes: 'single', // or 'double'
    },
    
    ignores: [
      // eslint ignore globs here
    ],
  },
  {
    rules: {
      // overrides
    },
  },
)
