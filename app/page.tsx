import { BlogPosts } from 'app/components/posts'
import MainHeader from './components/header'

export default function Page() {
  return (
    <>
      <MainHeader />
      <div className="my-8">
        <BlogPosts />
      </div>
    </>
  )
}
