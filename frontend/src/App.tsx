import { Route, Switch } from 'wouter'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Terms from './pages/Terms'
import Layout from './components/Layout'

function App() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/contact" component={Contact} />
        <Route path="/terms" component={Terms} />
      </Switch>
    </Layout>
  )
}

export default App