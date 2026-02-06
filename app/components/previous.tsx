const Previous = () => {
  return (
    <section>
      <div className="flex flex-col gap-figma-inside-gap">
        <h1 className="font-semibold italic">
          Previous
        </h1>

        <div className="flex items-center justify-start gap-2">
          <p>
            <a target="_blank" 
              rel="noopener noreferrer"
              href="https://www.vector.com/"
              className="underline hover:decoration-neutral-400 underline-offset-4"
            >vector india pvt. ltd.</a>
            {' '} ~ embedded systems trainee [bangalore, india]
          </p>
        </div>

      </div>
    </section>
  )
}

export default Previous
