import React, { Component } from 'react'
import PropTypes from 'prop-types'

// Import Assets

export default class CategorySelector extends Component {

  componentDidMount() {
    if (this.props.selectedState && !this.props.cities) this.props.selectState(this.props.selectedState)
    if (this.props.selectedCity && !this.props.departments) this.props.selectCity(this.props.selectedCity)
    if (this.props.selectedDepartment && this.props.departments) this.props.selectDepartment(this.props.selectedDepartment)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.states !== this.props.states && nextProps.states) {
      this.props.selectState(nextProps.defaultState)
    }

    if (nextProps.cities !== this.props.cities && nextProps.cities && nextProps.cities.Items.length) {
      this.props.selectCity(nextProps.defaultCity)
    }

    if (nextProps.departments !== this.props.departments && nextProps.departments) {
      this.props.selectDepartment(nextProps.departments.Items[0].department)
    }
  }

  makeStateOption(state) {
    return (
      <option key={ state.stateid } value={ state.stateid }>{ state.name }</option>
    )
  }

  makeCityOption(city) {
    return (
      <option key={ city.city } value={ city.city }>{ city.name }</option>
    )
  }

  makeDepartmentOption(department) {
    return (
      <option key={ `${department.city}-${department.department}` } value={ department.department }>{ department.name }</option>
    )
  }

  render() {
    var stateOptions = null
    var cityOptions = null
    var departOptions = null

    const { states, cities, departments } = this.props

    if (states)
      stateOptions = states.Items.map(this.makeStateOption)

    if (cities)
      cityOptions = cities.Items.map(this.makeCityOption)

    if (departments)
      departOptions = departments.Items.map(this.makeDepartmentOption)

    return (
      <div className="pt-5 pb-1 px-3">
        <div className="container">
          {/* State Picker */}
          <div className="form-group row">
            <label htmlFor="location-input" className="col-3 col-form-label">State</label>
            <div className="col-9">
              <select name="state" className="form-control" value={ this.props.selectedState } onChange={ e => this.props.selectState(e.target.value) }>
                { stateOptions }
              </select>
              {/* <p>Selected state is {this.props.selectedState}</p> */}
            </div>
          </div>
          {/* City Picker */}
          <div className="form-group row">
            <label htmlFor="location-input" className="col-3 col-form-label">City</label>
            <div className="col-9" id="locations">
              <select className="form-control" id="the_locations" value={ this.props.selectedCity } onChange={ e => this.props.selectCity( e.target.value ) }>
                { cityOptions }
              </select>
              {/* <p>Selected city is {this.props.selectedCity}</p> */}
            </div>
          </div>
          {/* Department Picker */}
          <div className="form-group row" id="categoryDropdownDiv">
            <label htmlFor="example-text-input" className="col-3 col-form-label">Category</label>
            <div className="col-9" id="departments">
              <select className="form-control" id="the_departments" value={ this.props.selectedDepartment } onChange={ e => this.props.selectDepartment(e.target.value) }>
                { departOptions }
              </select>
              {/* <p>Selected department is {this.props.selectedDepartment}</p> */}
            </div>
          </div>
        </div>
        <br />
        <hr />
     </div>
    )
  }
}

CategorySelector.propTypes = {
  states: PropTypes.object,
  cities: PropTypes.object,
  departments: PropTypes.object,
  defaultState: PropTypes.string,
  defaultCity: PropTypes.string
}
