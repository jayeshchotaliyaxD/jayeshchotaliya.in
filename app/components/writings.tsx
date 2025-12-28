import { BlogPosts } from "./posts"

const Writings = () => {
  return (
    <section>
      <div className="flex flex-col gap-figma-inside-gap">
        <h1 className="font-semibold italic">
          Writings
        </h1>
        <BlogPosts limit={3} />
      </div>
    </section>

  )
}

export default Writings
