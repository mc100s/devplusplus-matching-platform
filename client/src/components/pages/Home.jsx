import React, { useState, useEffect } from 'react'
import api from '../../api'

export default function Home() {
  const [state, setState] = useState({
    companies: [],
    jobOffers: [],
    companyUsers: [],
    search: '',
    nbOfCompaniesToDisplay: 20,
  })
  useEffect(() => {
    api.getMyApplicationsDashboard().then(data => {
      setState(state => ({
        ...state,
        ...data,
      }))
    })
  }, [])

  function handleInputChange(e) {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    })
  }

  function handleCompanyUserChange(e, _company) {
    console.log('TCL: handleCompanyUserChange -> _company', _company)
    let newCompanyUsers = [...state.companyUsers]
    let indexToChange = newCompanyUsers.findIndex(
      companyUser => companyUser._company === _company
    )
    if (indexToChange === -1) {
      newCompanyUsers.push({
        _company: _company,
        companyGrade: '',
        applicationStage: '',
        comment: '',
      })
      indexToChange = newCompanyUsers.length - 1
    }
    newCompanyUsers[indexToChange][e.target.name] = e.target.value
    setState({
      ...state,
      companyUsers: newCompanyUsers,
    })
  }

  function saveNotes() {
    api.saveAllCompanyUsers(state.companyUsers).then(data => {
      console.log('SAVED', data)
    })
  }

  function sortTableRows(stateField, subField, isAsc) {
    let ascFactor = isAsc ? 1 : -1
    setState({
      ...state,
      [stateField]: [...state[stateField]].sort((a, b) => {
        if (!a[subField]) return -ascFactor
        if (!b[subField]) return ascFactor
        let aTransformed = a[subField]
        let bTransformed = b[subField]
        if (
          typeof aTransformed === 'string' &&
          typeof bTransformed === 'string'
        ) {
          aTransformed = aTransformed.trim().toUpperCase()
          bTransformed = bTransformed.trim().toUpperCase()
        }
        if (aTransformed === bTransformed) return 0
        return aTransformed > bTransformed ? ascFactor : -ascFactor
      }),
    })
  }

  function getThWithArrows(label, stateField, subField) {
    return (
      <th>
        <div className="cell-with-arrows">
          <div>{label}</div>
          <div className="cell-with-arrows__arrows">
            <div
              className="cell-with-arrows__arrow"
              onClick={() => sortTableRows(stateField, subField, true)}
            >
              ▲
            </div>
            <div
              className="cell-with-arrows__arrow"
              onClick={() => sortTableRows(stateField, subField, false)}
            >
              ▼
            </div>
          </div>
        </div>
      </th>
    )
  }

  let tableRows = state.companies.map(tableRow => {
    let foundCompanyUser = state.companyUsers.find(
      companyUser => companyUser._company === tableRow._id
    )
    if (!foundCompanyUser) {
      foundCompanyUser = {
        companyGrade: '',
        applicationStage: '',
        comment: '',
      }
    }
    return {
      ...tableRow,
      jobOffers: state.jobOffers.filter(
        jobOffer => jobOffer._company === tableRow._id
      ),
      ...foundCompanyUser,
    }
  })

  return (
    <div className="Home">
      <h2>Dashboard</h2>
      <input
        type="text"
        placeholder="Search"
        name="search"
        value={state.search}
        onChange={handleInputChange}
      />{' '}
      <input
        type="number"
        placeholder="Search"
        name="nbOfCompaniesToDisplay"
        value={state.nbOfCompaniesToDisplay}
        onChange={handleInputChange}
      />{' '}
      <button className="btn btn--primary" onClick={saveNotes}>
        Save Notes
      </button>
      <br />
      <br />
      <table className="table-dashboard">
        <thead>
          <tr>
            {getThWithArrows('Company', 'companies', 'name')}
            <th>Company Grade</th>
            <th>Application Stage</th>
            <th>Comment</th>
            <th>Links</th>
            {getThWithArrows('Fonded Year', 'companies', 'foundedYear')}
            {getThWithArrows('Employees', 'companies', 'employees')}
            {getThWithArrows('Average age', 'companies', 'avgAge')}
            <th>Adresses</th>
            {/* <th>Cities</th> */}
            <th>Job Offers</th>
          </tr>
        </thead>
        <tbody>
          {tableRows
            .filter(tableRow =>
              JSON.stringify(tableRow)
                .toUpperCase()
                .includes(state.search.toUpperCase())
            )
            .filter((tableRow, i) => i < state.nbOfCompaniesToDisplay)
            .map(tableRow => (
              <tr key={tableRow._id}>
                <td>{tableRow.name}</td>
                <td>
                  <input
                    type="number"
                    style={{ width: 50 }}
                    name="companyGrade"
                    value={tableRow.companyGrade}
                    onChange={e => handleCompanyUserChange(e, tableRow._id)}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    name="applicationStage"
                    value={tableRow.applicationStage}
                    onChange={e => handleCompanyUserChange(e, tableRow._id)}
                  />
                </td>
                <td>
                  <textarea
                    name="comment"
                    value={tableRow.comment}
                    onChange={e => handleCompanyUserChange(e, tableRow._id)}
                  />
                </td>
                <td>
                  {tableRow.links.map((link, i) => (
                    <a
                      key={i}
                      href={link.value}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {link.website}
                    </a>
                  ))}
                </td>
                <td>{tableRow.foundedYear}</td>
                <td>{tableRow.employees}</td>
                <td>{tableRow.avgAge}</td>
                <td>{tableRow.addresses.join(', ')}</td>
                {/* <td>{tableRow.cities.join(', ')}</td> */}
                <td>
                  {tableRow.jobOffers.map(jobOffer => (
                    <div key={jobOffer._id}>
                      <a
                        href={jobOffer.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {jobOffer.title}
                      </a>{' '}
                      ({jobOffer.published.substr(0, 10)})
                    </div>
                  ))}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      {/* <pre>{JSON.stringify(state, null, 2)}</pre> */}
    </div>
  )
}
