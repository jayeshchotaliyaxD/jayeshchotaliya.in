const Current = () => {
  return (
    <section>
      <div className="flex flex-col gap-figma-inside-gap">
        <h1 className="font-semibold italic">
          Current
        </h1>
        <p>associate r&d engineer at{' '}
          <span className="inline-flex align-middle gap-0.5 bg-white text-black rounded-sm px-0.5 py-0 hover:cursor-pointer hover:bg-white/90 active:bg-white/70 transition leading-4">
            <a target="_blank" 
              rel="noopener noreferrer"
              href="https://global.abb/group/en"
              className=""
              >
              ABB
            </a>
          </span>
          , architecting secure cloud connectivity for industrial drives using TPM and certificate authentication.
          building firmware modules on Yocto-based embedded linux for real-time data exchange.
        </p>
        <p>b.e. in electronics & communication from l.d. college of engineering, ahmedabad.</p>
        <p>contributed to the <span className="italic font-semibold">Red Dot Award-winning</span> ABB EGW-02 Connectivity Edge Gateway.</p>
      </div>
    </section>
  )
}

export default Current
