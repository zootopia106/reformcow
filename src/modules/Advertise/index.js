import { connect } from 'react-redux'

// Import View
import Advertise from './Advertise'

// Import Actions
import * as Actions from '../../redux/actions/advertise'
import { push } from 'react-router-redux'

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    state: state.advertise.state
  }
}

function mapDispatchToProps(dispatch) {
  return {
    inquiry: (data) => dispatch(Actions.advertiseInquiryRequested(data)),
    changeLocation: (path) => dispatch(push(path))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Advertise)
