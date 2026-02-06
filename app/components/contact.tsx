const Contact = () => {
  return (
    <section>
      <div className="flex flex-col gap-figma-inside-gap">
        <h1 className="font-semibold italic">
          Contact
        </h1>
        <p>
          Interested to talk? read my {' '}
          <a 
            href="/resume.pdf" 
            target="_blank"
            className="underline hover:decoration-neutral-400 underline-offset-4 hover:text-neutral-800 dark:hover:text-neutral-100 transition-colors"
          >
            resume
          </a> or reach out via {' '}
          <a target="_blank" 
            rel="noopener noreferrer"
            href="mailto:chotaliyajayesh3@gmail.com"
            className="underline hover:decoration-neutral-400 underline-offset-4"
          >email</a>
        </p>
      </div>
    </section>

  )
}

export default Contact
