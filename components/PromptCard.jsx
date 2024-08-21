import React from 'react'

const PromptCard = ({prompt}) => {
  return (
    <div className='flex flex-col gap-2 justify-center items-center p-4 bg-blue-200/30'>
      <span>{prompt.prompt}</span>
      <span>{prompt.tag}</span>
    </div>
  )
}

export default PromptCard
