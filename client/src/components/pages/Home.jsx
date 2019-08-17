import React, { useState, useEffect } from 'react'
import api from '../../api'

export default function Home() {
  const [state, setState] = useState({
    companies: [],
    jobOffers: [],
    companyUsers: [],
    search: '',
  })
  useEffect(() => {
    api.getMyApplicationsDashboard().then(data => {
      setState(state => ({
        ...state,
        ...data,
      }))
    })
  }, [])

  function handleSearch(e) {
    setState({
      ...state,
      search: e.target.value,
    })
  }

  let tableRows = state.companies.map(tableRow => ({
    ...tableRow,
    jobOffers: state.jobOffers.filter(
      jobOffer => jobOffer._company === tableRow._id
    ),
  }))

  return (
    <div className="Home">
      <h2>Dashboard</h2>
      <input
        type="text"
        placeholder="Search"
        value={state.search}
        onChange={handleSearch}
      />{' '}
      <br />
      <br />
      <table className="table-dashboard">
        <thead>
          <tr>
            <th>Company</th>
            <th>Company Grade</th>
            <th>Application Stage</th>
            <th>Comments</th>
            <th>Links</th>
            <th>Fonded Year</th>
            <th>Employees</th>
            <th>Average Age</th>
            <th>Adresses</th>
            {/* <th>Cities</th> */}
            <th>Job Offers</th>
          </tr>
        </thead>
        <tbody>
          {tableRows
            //.filter((tableRow, i) => i < 10)
            .filter(tableRow =>
              JSON.stringify(tableRow)
                .toUpperCase()
                .includes(state.search.toUpperCase())
            )
            .map(tableRow => (
              <tr key={tableRow._id}>
                <td>{tableRow.name}</td>
                <td>...</td>
                <td>...</td>
                <td>...</td>
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
