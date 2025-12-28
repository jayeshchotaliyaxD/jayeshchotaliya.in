import MainHeader from './components/header'
import Current from './components/current'
import Previous from './components/previous'
import Writings from './components/writings'

export default function Page() {
  return (
    <div className='flex flex-col gap-figma-outside-gap'>
      <MainHeader />
      <Current />
      <Previous />
      <Writings />
    </div>
  )
}
