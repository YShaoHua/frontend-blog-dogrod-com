import * as React from 'react'
import { Switch, Route } from 'react-router-dom'
import PostList from 'components/PostList/PostList'
import PostDetail from 'components/PostDetail/PostDetail'

// const About = () => (
//   <div>
//     <h2>About</h2>
//   </div>
// )

// const Topic = ({ match }) => (
//   <div>
//     <h3>{match.params.topicId}</h3>
//   </div>
// )

// const Topics = ({ match }) => (
//   <div>
//     <h2>Topics</h2>
//     <ul>
//       <li>
//         <Link to={`${match.url}/rendering`}>
//           Rendering with React
//         </Link>
//       </li>
//       <li>
//         <Link to={`${match.url}/components`}>
//           Components
//         </Link>
//       </li>
//       <li>
//         <Link to={`${match.url}/props-v-state`}>
//           Props v. State
//         </Link>
//       </li>
//     </ul>

//     <Route path={`${match.url}/:topicId`} component={Topic}/>
//     <Route
//       exact={true}
//       path={match.url}
//       render={() => (
//         <h3>Please select a topic.</h3>
//       )}
//     />
//   </div>
// )

class Routes extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact={true} path="/" component={PostList}/>
        <Route path="/detail" component={PostDetail}/>
        {/* <Route path="/topics" component={Topics}/> */}
      </Switch>
    )
  }
}

export default Routes