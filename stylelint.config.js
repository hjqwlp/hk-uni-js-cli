module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-html/vue',
    'stylelint-config-standard-scss',
    'stylelint-config-recommended-vue/scss',
  ],
  plugins: ['stylelint-order'],
  customSyntax: 'postcss-html',
  overrides: [
    {
      files: ['**/*.scss'],
      customSyntax: 'postcss-scss',
    },
  ],
  rules: {
    'no-descending-specificity': null,
    'function-url-quotes': 'always',
    'string-quotes': 'single',
    'declaration-block-trailing-semicolon': null,
    indentation: 2,
    'unit-case': null,
    'color-hex-case': 'lower',
    'color-hex-length': 'long',
    'rule-empty-line-before': 'never',
    'font-family-no-missing-generic-family-keyword': null,
    'block-opening-brace-space-before': 'always',
    'property-no-unknown': null,
    'no-empty-source': null,
    'unit-no-unknown': [true, { ignoreUnits: ['rpx'] }],
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['v-deep', 'deep'],
      },
    ],
    'function-no-unknown': [
      true,
      {
        ignoreFunctions: ['constant', 'env'],
      },
    ],
    'selector-type-no-unknown': [
      true,
      {
        ignoreTypes: [
          'page',
          'scroll-view',
          'swiper',
          'swiper-item',
          'cover-view',
          'cover-image',
          'icon',
          'rich-text',
          'checkbox',
          'radio',
          'slider',
          'navigator',
          'camera',
          'cover-view',
        ],
      },
    ],
  },
};
