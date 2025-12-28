import MainHeader from './components/header'
import Current from './components/current'
import Previous from './components/previous'
import Writings from './components/writings'
import { Projects } from './components/projects'
import Builds from './components/builds'

export default function Page() {
  return (
    <div className='flex flex-col gap-figma-outside-gap'>
      <MainHeader />
      <Current />
      <Previous />
      <Writings />
      <Builds />
    </div>
  )
}
