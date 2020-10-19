import UserDecalPanel from './UserDecalPanel'
import UserNicknamesPanel from './UserNicknamesPanel'





function UserOverview () {
  return (
    <div className="user-overview-tab">
      <UserNicknamesPanel />

      <UserDecalPanel />
    </div>
  )
}




export default UserOverview
