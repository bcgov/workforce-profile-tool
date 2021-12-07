import React from 'react'

/**
 * The home page of the app.
 *
 * @returns the component for the home page.
 */
const Home = (): JSX.Element => {
  const buildVersion = process.env.REACT_APP_GIT_SHA

  return (
    <div className="row">
      <div className="col col-sm-11 col-md-10 col-lg-9 col-xl-8">
        <h1>Workforce Profiles Report</h1>
        <p className="lead" style={{ hyphens: 'auto' }}>
          The Workforce Profiles Report allows users to explore statistics on
          the representation of designated equity groups across the BC Public
          Service (BCPS) workforce, including representation of Women,
          Indigenous Peoples, Persons with Disabilities and members of Visible
          Minorities.
        </p>
        <p>
          This online dashboard replaces the paper reports produced prior to
          2018. For access to historical reports, please visit the{' '}
          <a
            href="https://www2.gov.bc.ca/gov/content/data/statistics/government/employee-research/workforce-profiles"
            target="_blank"
            rel="noopener noreferrer"
          >
            BC Stats website
          </a>
          .
        </p>
        <p>
          You can navigate between sections using the named tabs at the top of
          this area. You can also refine the visualizations and tables on each
          tab by employing one or more filters from the available list — on most
          screens, these filters will be shown to the left (in blue). For mobile
          devices, filters instead appear in a hidden menu above the page tabs;
          click on the “Show variables” button to display them, or the “Hide
          variables” button to minimize them again. Note that not all filters
          are available on every tab.
        </p>
        <p>
          <strong>New (Nov 2021)</strong>: Hiring and Flow data have been added
          for the most recent reporting year (2020). Flow data is only available
          at the BCPS level.
        </p>
        <p>
          <strong>Note</strong>: the Workforce Profile Dashboard is not
          compatible with older web browsers such as Internet Explorer 11.
          Please use an up-to-date browser when accessing the Dashboard for best
          results.
        </p>
        <h2>Caveats</h2>
        <p>
          Report Frequency: The dashboard is updated approximately every two
          years, as it relies on demographic information from recent corporate
          employee surveys, particularly the biennial Work Environment Survey
          (WES).
        </p>
        <p>
          Confidentiality: BC Stats takes great care to protect the individual
          identities of BCPS employees. Some results with small counts are
          suppressed to maintain employee confidentiality.
        </p>
        <p>
          Comparisons Across Years: Some tabs include comparisons between the
          current and previous reporting cycle (e.g., Indicators of Progress).
          For these tabs, the data for the previous cycle has been recalculated
          using the most recent demographic and organizational information and
          definitions, in order to make the comparison more like-to-like.
          Because results in historical reports are kept as-is, numbers in the
          current report may differ from the historical report (i.e., 2018
          numbers in the 2020 report may vary from the numbers in the 2018
          historical report). Caution is advised when comparing the current
          report to historical reports.
        </p>
        <p>
          Gender: At this time, representation of Women in the BC Public Service
          data includes both cis and trans women.
        </p>
        <p>
          Persons with Disabilities: BC Stats and Statistics Canada use
          different methods to identify Persons with Disabilities. The BC Stats
          method is more focused in scope, while the Statistics Canada method
          likely captures a broader portion of the population. Caution is needed
          when comparing the representation of Persons with Disabilities in the
          BC Public Service (calculated by BC Stats) against the available
          workforce and population of BC (calculated by Statistics Canada).
        </p>
        <p>
          2SLGBTQ+ and Non-Binary Representation: Information on 2SLGBTQ+ and
          non-binary representation are not currently included in the Workforce
          Profiles, as no federal data exists for comparisons.{' '}
        </p>

        <h2>Contact</h2>
        <p>
          Please{' '}
          <a href="mailto:work.environment.survey@gov.bc.ca">
            contact BC Stats
          </a>{' '}
          if you experience any technical difficulties or have any questions
          about the content of this app.
        </p>
        {buildVersion && (
          <p style={{ color: '#eeeeee', fontSize: '0.8rem' }}>
            Build version: {buildVersion}
          </p>
        )}
      </div>
    </div>
  )
}

export default Home
