import React from 'react'

const Home = (): JSX.Element => {
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
          Use the tabs at the top to navigate between sections. You can refine
          the visualizations and tables on each tab by employing one or more
          filters from the available list to the left. Note that not all filters
          are available to use on every tab.
        </p>
        <p>
          <strong>Note</strong>: the Workforce Profile Dashboard is not
          compatible with older web browsers such as Internet Explorer 11.
          Please use an up-to-date browser when accessing the Dashboard for best
          results.
        </p>
        <h2>Caveats</h2>
        <p>
          The Workforce Profiles Report is produced using demographic data
          obtained on recent corporate employee surveys, including the Work
          Environment Survey (WES). The dashboard is updated after each
          completed WES cycle (approximately every two years).
        </p>
        <p>
          BC Stats takes great care to protect the individual identities of BCPS
          employees. Some results in the dashboard have been suppressed in order
          to protect small counts and maintain employee confidentiality.
        </p>
        <p>
          Some tabs make comparisons to previous year results (e.g., Indicators
          of Progress). Please be advised that BC Stats recalculates the
          previous cycle&rsquo;s results in these comparisons using the most up
          to date demographic and organizational information available, to
          improve comparisons. As a result, the data used in comparisons to
          previous cycles may appear differently than that reported in
          historical reports. BC Stats does retain all previous Workforce
          Profiles reports, but for historical purposes only; caution is advised
          when comparing across reports.
        </p>
        <p>
          Note: Statistics Canada and BC Stats use different methods to identify
          Persons with Disabilities. BC Stats currently uses a definition from
          the UN Convention on the Rights of Persons with Disabilities, focusing
          on those with long-term impairments that interact with barriers.
          Statistics Canada uses a series of census and other survey questions
          to identify Persons with Disabilities, which may encompass a wider
          portion of the population. Please use caution when comparing the rates
          of Persons with Disabilities in the BC Public Service (calculated by
          BC Stats) against the available workforce and population of BC
          (calculated by Statistics Canada).
        </p>
        <p>
          The release of Hiring and Flow data has temporarily been postponed;
          this information is expected to be released later in 2021.
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
      </div>
    </div>
  )
}

export default Home
