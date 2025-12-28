import { BlogPosts } from "./posts"

const Writings = () => {
  return (
    <section>
      <div className="flex flex-col gap-figma-inside-gap">
        <h1 className="font-semibold italic">
          Writings
        </h1>
        <BlogPosts />
      </div>
    </section>

  )
}

export default Writings
