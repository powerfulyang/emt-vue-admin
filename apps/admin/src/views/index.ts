const views = import.meta.glob('./**/index.vue')
const NotFound = () => import('./exception/404.vue')

export default views
export { NotFound }
