const Current = () => {
  return (
    <section>
      <div className="flex flex-col gap-figma-inside-gap">
        <h1 className="font-semibold italic">
          Current
        </h1>
        <p>ai engineer at{' '}
          <a target="_blank" 
            rel="noopener noreferrer"
            href="https://twospoon.ai/"
            className="bg-white text-black rounded-sm px-1 hover:cursor-pointer hover:bg-white/90 active:bg-white/70 transition"
          >
            twospoon.ai
          </a>
          , building intelligent products that is both scalable and fast. master @ iit-patna and iit-ranchi.</p>
        <p>enjoy coding, content creation, writing, superbikes, and reading ancient greek texts.</p>
        <p>i can build anything.</p>
      </div>
    </section>
  )
}

export default Current
