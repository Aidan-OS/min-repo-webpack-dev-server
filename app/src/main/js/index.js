import Root from './routes'

render(Root)

if (module.hot) {
  module.hot.accept('./routes.js', () => {
	  const newRoot = require('./routes').default;
	  render(newRoot)
  })
}