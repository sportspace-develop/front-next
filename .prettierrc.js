module.exports = {
  printWidth: 100,
  bracketSpacing: false,
  singleQuote: true,
  semi: true,
  bracketSameLine: false,
  arrowParens: 'always',
  trailingComma: 'all',
  importOrder: ['^[next]', '<THIRD_PARTY_MODULES>', 'src/', '^[./]'],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  plugins: [require.resolve('@trivago/prettier-plugin-sort-imports')],
};
