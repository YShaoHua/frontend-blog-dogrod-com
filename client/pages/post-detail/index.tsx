import * as React from 'react'
import { RouteComponentProps } from 'react-router'

import BlogTypes from '@/types/blog'

import api from '@/api'
import http from '@/utils/http'
import marked from '@/utils/marked'
import { convertTimeFormat, setTitle } from '@/utils'

import './index.scss'

interface PropTypes extends RouteComponentProps<{ slug: string }> {}

interface StateTypes {
  post?: BlogTypes.Post
  slug: string
  isLoading: boolean
}

const PREFIX_CLASS = 'post-detail'

class PostDetail extends React.Component<PropTypes, StateTypes> {
  constructor(props: PropTypes) {
    super(props)

    this.state = {
      slug: props.match.params.slug,
      isLoading: false
    }
  }

  async componentDidMount() {
    this.setLoadingStatus(true)

    try {
      const post = await this.fetchPostDetailData()

      setTitle(post.title)      

      this.setState({
        post
      })
    } catch (error) {
      console.error(error)
    } finally {
      this.setLoadingStatus(false)
    }
  }

  /**
   * fetch post detail data
   * @returns promise instance
   */
  fetchPostDetailData = async () => {
    const { slug } = this.state
    const url = `${api.getPosts}/${slug}`
    
    try {
      const response: any = await http.get(url)

      return response
    } catch (error) {
      throw error
    }
  }

  /**
   * set loading status
   * @param isLoading - loading status
   */
  setLoadingStatus = (isLoading: boolean) => {
    this.setState({ isLoading })
  }

  convertMarkdownContent = (content: string) => marked(content)

  render() {
    const { post } = this.state

    const renderMarkedContent = (content: string) => (
      <div
        className={`${PREFIX_CLASS}__content markdown`}
        dangerouslySetInnerHTML={{
          __html: this.convertMarkdownContent(content)
        }}
      />
    )

    const renderPostContent = (postData: BlogTypes.Post) => (
      <React.Fragment>
        <div className={`${PREFIX_CLASS}__title`}>{postData.title}</div>
        <div className={`${PREFIX_CLASS}__category`}>{postData.category}</div>
        {renderMarkedContent(postData.content)}
        <div className={`${PREFIX_CLASS}__tags`}>
          {
            postData.tags.map(tag => 
              <a key={tag} className={`${PREFIX_CLASS}__tag`}>{tag}</a>
            )
          }
        </div>
        <div className={`${PREFIX_CLASS}__publish-time`}>发布于{convertTimeFormat(postData.publishAt)}</div>
        <hr className="divider" />
      </React.Fragment>
    )

    return (
      <div className={`${PREFIX_CLASS} content`}>
        {
          post ? renderPostContent(post) : null
        }
      </div>
    )
  }
}

export default PostDetail
