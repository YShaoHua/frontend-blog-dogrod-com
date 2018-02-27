import * as React from 'react'
import { RouteComponentProps } from 'react-router'
import { AxiosResponse } from 'axios'

import http from 'services/http/http'

import { IResponse } from 'types/api'
import { IBlog } from 'types/blog'

import './index.scss'
interface DetailRouterProps {
  slug: string
}

interface DetailProps extends RouteComponentProps<DetailRouterProps> {}

interface PostDetailStates {
  post?: IBlog.Post
  slug: string
  isLoading: boolean
}

class PostDetail extends React.Component<DetailProps> {
  state: PostDetailStates

  constructor(props: DetailProps) {
    super(props)
    
    this.state = {
      slug: props.match.params.slug,
      isLoading: true,
    }
  }

  async componentDidMount() {
    try {
      const response: AxiosResponse<IResponse.PostDetail>
        = await http.get(`/blog/posts/${this.state.slug}`)

      this.setState({
        post: response.data,
        isLoading: false,
      })
    } catch (error) {
      console.error(error)

      this.setState({
        isLoading: false
      })
    }
  }

  render() {
    const {
      post,
      isLoading,
    } = this.state
    
    if (isLoading) return 'Loading...'

    if (!post) return 'Post does not exist.'

    const publishTime = new Date(post.publish_at)
    const publishMonth = publishTime.toLocaleString('en-us', { month: 'short' });
    const displayPublishTime = `${publishMonth} ${publishTime.getDate()}, ${publishTime.getFullYear()}`

    const renderTags = () => {
      const tagsLength = post.tags.length

      const renderTagsContent = post.tags.map((tag, index) => {
        return (
          <span className="post__tag" key={tag.slug}>
            <a>{tag.name}</a>
          </span>
        )
      })

      return tagsLength ? (
          <div className="post__tags">{renderTagsContent}</div>
        ) : null
    }

    return (
      <div className="post">
        <div className="post__title">{post.title}</div>
        <div className="post__info">{post.category.title} · {displayPublishTime}</div>
        <div
          className="post__content"
          dangerouslySetInnerHTML={{
            __html: post.content
          }}
        />
        {renderTags()}
      </div>
    )
  }
}

export default PostDetail