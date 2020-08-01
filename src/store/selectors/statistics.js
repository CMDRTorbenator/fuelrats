import { createSelector } from 'reselect'

import { selectUserById } from './users'

export const selectLeaderboard = (state) => {
  return state.leaderboard.entries
}
export const selectLeaderboardStatistics = (state) => {
  return state.leaderboard.statistics
}



export const selectRatStatistics = (state) => {
  return state['user-statistics']
}

export const selectRatStatisticsById = (state, { ratId }) => {
  return selectRatStatistics(state)[ratId]
}


export const selectUserStatisticsById = createSelector([
  [selectUserById, selectRatStatistics],
  (user, ratStatistics) => {
    // if the user doesn't exist, or there's no rat data, or there's no statistics for the first rat, return null.
    // Since the only way of getting a rat's statistics is by requesting for all rats of a user, we can assume we don't have any if we're missing one.
    if (!user?.relationships?.rats?.data || !ratStatistics[user.relationships.rata.data[0].id]) {
      return null
    }

    // Generate a new statistic sheet representing the user as a whole with the sum of the rats under that user.
    // The API does not provide statistics like this so we need to sum them up ourselves.
    return {
      type: 'user-statistics',
      id: user.id,
      attributes: user?.relationships?.rats?.data?.reduce((acc, rat) => {
        const ratStat = ratStatistics[rat.id]

        if (ratStat?.attributes) {
          [
            'codeRed',
            'firstLimpet',
            'assists',
            'failure',
            'other',
            'invalid',
          ].forEach((key) => {
            acc[key] = (acc[key] ?? 0) + (ratStat.attributes[key] ?? 0)
          })
        }

        return acc
      }, {}),
    }
  },
])
