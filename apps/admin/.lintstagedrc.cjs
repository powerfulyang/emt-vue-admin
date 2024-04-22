module.exports = {
  '**/*.{ts,tsx,json,js,mjs,mts,cjs,cts,jsx,md,vue}': ['prettier --write'],
  '**/*.{ts,tsx,js,mjs,mts,cjs,cts,jsx,vue}': ['eslint --fix'],
};
