import { getUser } from '@/app/lib/user'
import Logout from './Logout';

const Profile = async () => {

  const { data } = await getUser();

  return (
      <div className='inline-block relative h-[57.6px]'>
        <Logout data={data} />
      </div>
  )
}

export default Profile
