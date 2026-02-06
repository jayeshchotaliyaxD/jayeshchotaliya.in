import BoxedText from "./boxed-text"

const MainHeader = () => {
  return (
    <section>
      <div className="flex flex-col gap-figma-inside-gap"> 
        <div className="flex justify-between items-center">
          <div className="flex flex-col gap-figma-inside-gap">
            <h1 className="font-semibold italic">
              jayesh chotaliya
            </h1>
            <div className="font-semibold italic text-sm">
              <BoxedText text={"embedded,iot,c++,cloud,firmware"} />
            </div>
            <p className="italic">
              embedded software engineer @ <span className="not-italic font-medium">ABB</span>
            </p>
          </div>
          <div className="text-right">
            <p className="font-normal italic">
              Bangalore, India
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default MainHeader