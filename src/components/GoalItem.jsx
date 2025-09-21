import { useDispatch } from 'react-redux'
import { deleteGoal } from '../features/goals/goalSlice'

function GoalItem({ goal }) {
  const dispatch = useDispatch()

  return (
    <div className="card mb-3 shadow-sm border-0">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <button
            onClick={() => dispatch(deleteGoal(goal._id))}
            className="btn btn-sm btn-danger"
            title="Delete"
          >
            Delete
          </button>
        </div>
        <h4 className="card-title mb-0">{goal.text}</h4>
         <small className="text-muted">
            {new Date(goal.createdAt).toLocaleString('en-US')}
          </small>
      </div>
    </div>
  )
}

export default GoalItem