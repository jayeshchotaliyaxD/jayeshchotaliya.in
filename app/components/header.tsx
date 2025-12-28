import BoxedText from "./boxed-text"

const MainHeader = () => {
  return (
    <section>
      <div className="flex flex-col gap-figma-inside-gap"> 
        <div className="flex justify-between items-center">
          <div className="flex flex-col gap-figma-inside-gap">
            <h1 className="font-semibold italic">
              sagar tamang ~ <span className="text-xs">सागर तामाङ</span>
            </h1>
            <h1 className="font-semibold italic text-sm">
              <BoxedText text={"product, ai, research, web, design, elt"} />
            </h1>
          </div>
          <div>
            <p className="font-normal italic">
              ಬೆಂಗಳೂರು ~ Bangalore, India
            </p>
          </div>
        </div>
        <p className="italic">
          i <span className="not-italic font-medium">build</span> <span className="underline">fast</span>
        </p>
      </div>
    </section>
  )
}

export default MainHeader