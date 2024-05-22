import tsconfigPaths from 'vite-tsconfig-paths'

export default ({
  plugins: [tsconfigPaths()],
  test: {
    globals: true,
  },
})
