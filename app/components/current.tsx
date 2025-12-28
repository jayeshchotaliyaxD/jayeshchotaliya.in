import Image from "next/image"

const Current = () => {
  return (
    <section>
      <div className="flex flex-col gap-figma-inside-gap">
        <h1 className="font-semibold italic">
          Current
        </h1>
        <p>ai engineer at{' '}
          <span className="inline-flex align-middle gap-0.5 bg-white text-black rounded-sm px-0.5 py-0 hover:cursor-pointer hover:bg-white/90 active:bg-white/70 transition leading-4">
            <Image 
              className="invert"
              src={"/twospoon-logo-favicon.svg"}
              alt="favicon" 
              height={12}
              width={12} 
            />
            <a target="_blank" 
              rel="noopener noreferrer"
              href="https://twospoon.ai/"
              className=""
              >
              twospoon.ai
            </a>
          </span>
          , building intelligent products that is both scalable and fast. master @ iit-patna and iit-ranchi.</p>
        <p>enjoy coding, content creation, writing, superbikes, and reading ancient greek texts.</p>
        <p>i can build anything.</p>
      </div>
    </section>
  )
}

export default Current
