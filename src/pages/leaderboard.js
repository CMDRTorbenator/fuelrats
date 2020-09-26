// Module imports
import React from 'react'





// Component imports
import RatLeaderboardTable from '~/components/RatLeaderboardTable'





function Leaderboard () {
  return (
    <div className="page-content">
      <RatLeaderboardTable />
    </div>
  )
}


Leaderboard.getPageMeta = () => {
  return {
    title: 'Leaderboard',
  }
}


export default Leaderboard
