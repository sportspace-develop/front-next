/* eslint-disable no-use-before-define */
module.exports = {
  printWidth: 100,
  bracketSpacing: true,
  singleQuote: true,
  semi: true,
  bracketSameLine: false,
  arrowParens: 'always',
  trailingComma: 'all',
  importOrder: ['^[next]', '^[react]', '<THIRD_PARTY_MODULES>', '@mui', '@/', 'src/', '^[./]'],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  plugins: [require.resolve('@trivago/prettier-plugin-sort-imports')],
};
