type BoxedTextProps = {
  text: string
}

const BoxedText = ({text}: BoxedTextProps) => {
  return (
    <div className="flex items-center justify-center font-sans not-italic font-normal text-xs border border-neutral-700 bg-neutral-800/50 rounded px-1.5 py-0.5 tracking-tight text-neutral-300 hover:border-neutral-600 hover:text-neutral-200 transition-colors">
      {text}
    </div>
  )
}

export default BoxedText
