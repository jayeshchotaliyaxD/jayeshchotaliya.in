type BoxedTextProps = {
  text: string
}

const BoxedText = ({text}: BoxedTextProps) => {
  return (
    <div className="flex items-center justify-center font-sans not-italic font-extralight text-xs border-1 rounded-sm px-1 tracking-[-0.06em]">
      {text}
    </div>
  )
}

export default BoxedText
