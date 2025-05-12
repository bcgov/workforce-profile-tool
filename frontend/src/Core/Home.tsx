/**
 * The home page of the app.
 *
 * @returns the component for the home page.
 */
const Home = (): JSX.Element => {

  return (
    <div className="row">
      <div className="col col-sm-11 col-md-10 col-lg-9 col-xl-8">
        <h1>Workforce Profiles Dashboard</h1>
        <p className="lead" style={{ hyphens: 'auto' }}>
          The Workforce Profiles Dashboard provides BC Public Service (BCPS) representation
          statistics on employees who identify themselves as women, Indigenous, persons with disabilities,
          racialized, and 2SLGBTQ+ (new as of 2024). These demographic groupings are listed in the{' '}
          <a
            href="https://laws-lois.justice.gc.ca/eng/acts/e-5.401/"
            target="_blank"
            rel="noopener noreferrer">
            Employment Equity Act
          </a>{' '}
          and/or in the BC Public Service's{' '}
          <a
            href="https://www2.gov.bc.ca/gov/content/careers-myhr/about-the-bc-public-service/diversity-inclusion/diversity-inclusion-strategy"
            target="_blank"
            rel="noopener noreferrer">
            Where We All Belong equity, diversity, and inclusion strategy
          </a>{' '}
          . This information helps make evidence-based decisions
          that promote diversity and inclusion across the BC Public Service, including equitable treatment in
          hiring, training and promotion.
        </p>
        <h2>Navigation</h2>
        <p>
          Navigate between sections using the named tabs at the top of this area.
          Customize your data views using the filters in the blue columns on the
          left-hand of the screen.
          <br />
          For mobile devices, filters are hidden. Select "<b>Show variables</b>" to
          display the filters, or "<b>Hide variables</b>" to minimize them. Note that
          not all filters are available on every tab.
          <br />
          The dashboard is not compatible with older web browsers such as Internet Explorer 11.
          Please use an up-to-date browser for best results.
          <br />
          Use the “<b>Save as PNG</b>” and "<b>Save as CSV</b>” buttons to save chart and table data.
          <br />
          You can{' '}
          <a
            href="https://catalogue.data.gov.bc.ca/dataset/55dacce5-8b63-471c-9feb-2d64ad88a567"
            target="_blank"
            rel="noopener noreferrer">
            view the data used in the dashboard
          </a>{' '} in the Data BC Catalogue or view reports from
          2011, 2013 and 2015 on the{' '}
          <a
            href="https://www2.gov.bc.ca/gov/content?id=1606E44C9A404B9BAD937994D22DCBE6"
            target="_blank"
            rel="noopener noreferrer">
            Workforce Profiles Webpage.
          </a>
          <br />
          You can also watch a{' '}
          <a
            href="https://www.youtube.com/watch?v=rg2ZVJFyIxA"
            target="_blank"
            rel="noopener noreferrer">
            video tutorial on how to navigate the dashboard.
          </a>
        </p>
        <h2>Methodology, Definitions, and Caveats</h2>
        <h3>Methodology</h3>
        <p>
          Workforce Profiles provide statistics on the representation of equity groups
          within the BC Public Service and all its ministries and organizations.
          <br />
          Information to assess employment equity practices in the BC Public Service
          is gathered through two employee surveys: the{' '}
          <a
            href="https://www2.gov.bc.ca/gov/content?id=30ABCAC517C743C78A7ED098F11FEC7E"
            target="_blank"
            rel="noopener noreferrer">
            Work Environment Survey
          </a>{' '}
          and the{' '}
          <a
            href="https://www2.gov.bc.ca/gov/content?id=75F09873746941A392EDA956CE07FA15"
            target="_blank"
            rel="noopener noreferrer">
            New Job Survey
          </a>.{' '}
          Comparator data comes from federal reports, including the{' '}
          <a
            href="https://www12.statcan.gc.ca/census-recensement/index-eng.cfm"
            target="_blank"
            rel="noopener noreferrer">
            Canadian Census
          </a>
          ,{' '}
          <a
            href="https://www23.statcan.gc.ca/imdb/p2SV.pl?Function=getSurvey&SDDS=3251"
            target="_blank"
            rel="noopener noreferrer">
            Canadian Survey on Disability
          </a>
          , and{' '}
          <a
            href="https://www23.statcan.gc.ca/imdb/p2SV.pl?Function=getSurvey&SDDS=3226"
            target="_blank"
            rel="noopener noreferrer">
            Canadian Community Health Survey
          </a>
          . Comparators use the most recent data available at the time of analysis.
          <br />
          Workforce Profiles are updated every two years, after each Work Environment
          Survey. For access to reports before 2018, please visit the{' '}
          <a
            href="https://www2.gov.bc.ca/gov/content?id=1606E44C9A404B9BAD937994D22DCBE6"
            target="_blank"
            rel="noopener noreferrer">
            BC Stats website
          </a>.
        </p>
        <h3>Definitions</h3>
        <p>
          <strong><em>2SLGBTQ+:</em></strong> Includes all employees who identified as
          2SLGBTQ+ in employee surveys. This demographic group is new to Workforce Profiles
          as-of 2024. Comparator data for this demographic group is not available for:
          available workforce, representation by occupation, representation by region.
        </p>
        <p>
          <strong><em>Indigenous Peoples:</em></strong> Includes employees who identified as
          First Nations, Métis, or Inuit in employee surveys.
        </p>
        <p>
          <strong><em>Persons with Disabilities:</em></strong> Includes employees who stated
          they have conditions that are disabilities, including some of the time, in employee
          surveys. This definition has changed over time and differs from the method used by
          Statistics Canada, which is narrower in scope. Care is required when comparing the
          representation in the BC Public Service across years or to the available workforce
          and population of B.C.
        </p>
        <p>
          <strong><em>Visible Minority:</em></strong> Includes employees who stated they are
          racialized in employee surveys (e.g., Arab, Black, Chinese, Filipino, Japanese, Korean,
          Latin American, South Asian, Southeast Asian, West Asian). The term "Visible Minority"
          is taken from the Employment Equity Act and will be updated in future reporting.
        </p>
        <p>
          <strong><em>Women:</em></strong> Includes all employees who select identify as "women"
          in employee surveys (i.e., cisgender and transgender women).
        </p>
        <p>
          <strong><em>Available Workforce:</em></strong> The Available Workforce represents the
          types of jobs employed by the BC Public Service. It is a subset of the overall workforce
          in B.C. and only includes the types of positions that are found in the BC Public Service.
        </p>
        <p>
          <strong><em>Executive Leadership:</em></strong> Positions classified as Deputy Minister,
          Associated Deputy Minister, Assistant Deputy Minister, and Executive Lead.
        </p>
        <p>
          <strong><em>Regular and Auxiliary Positions:</em></strong> The provincial public service
          includes regular and auxiliary employees who fall under the Public Service Act and are in
          ministries that report up to a Deputy Minister.
        </p>
        <p>
          <strong><em>Management Band Leadership:</em></strong> All excluded positions classified as Bands
          1 through 6, or equivalent.
        </p>
        <h3>Caveats</h3>
        <p>
          <strong><em>Comparisons Across Years:</em></strong> The Indicators of Progress tab includes
          comparisons between the current and previous Workforce Profile results. These comparisons
          include recalculating the results reported during the prior cycle based on up-to-date demographic
          and organizational information to make data as comparable as possible. However, when either of
          these two pieces of information change, the results by organization and demographic group will
          differ from those reported in the same tab but for previous cycles (e.g., the 2022 results reported
          in the 2024 report, may differ from those in the 2022 report).
        </p>
        <p>
          <strong><em>Suppressions:</em></strong> Beginning in 2022, all suppressed values are indicated by
          &ldquo;S&rdquo;. In prior years, reports differentiated between suppression due to small
          counts versus residual disclosure.
        </p>
        <h2>Confidentiality</h2>
        <p>
          BC Stats takes confidentiality very seriously. It is the only organization in B.C. that can
          offer the protection of the{' '}
          <a
            href="https://www.bclaws.gov.bc.ca/civix/document/id/complete/statreg/96439_01"
            target="_blank"
            rel="noopener noreferrer">
            Statistics Act
          </a>
          . The mandate of BC Stats is to provide high-quality data intelligence about British Columbia's
          citizens, economy and government. For more information, visit{' '}
          <a
            href="https://www2.gov.bc.ca/gov/content/data/statistics/bc-stats/confidentiality"
            target="_blank"
            rel="noopener noreferrer">
            BC Stats confidentiality page
          </a>.
        </p>
        <h2>Contact</h2>
        <p>
          Please{' '}
          <a
            href="https://dpdd.atlassian.net/servicedesk/customer/portal/12"
            target="_blank">
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
