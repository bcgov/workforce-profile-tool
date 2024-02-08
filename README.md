# workforce-profile-tool
The [Workforce Profiles](https://www2.gov.bc.ca/gov/content/data/statistics/government/employee-research/workforce-profiles) tool allow users to explore statistics on the representation of the designated equity groups across the BC Public Service (BCPS) workforce, including representation of Women, Indigenous Peoples, Persons with Disabilities and members of Visible Minorities.



[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](LICENSE)
![img](https://img.shields.io/badge/Lifecycle-Stable-blue) ![Master Branch Deployment](https://github.com/bcgov/workforce-profile-tool/actions/workflows/continuous-deployment.yaml/badge.svg?branch=master)

## Directory Structure

```txt
.github/                   - CI/CD
charts/                    - General Helm Charts
└── wfp/                   - Workforce Profiles Helm Chart Repository
    └── templates/         - Workforce Profiles Helm Chart Template manifests
frontend/                  - Frontend Root
COMPLIANCE.yaml            - BCGov PIA/STRA compliance status
Dockerfile                 - Dockerfile Image definition
LICENSE                    - License
```

## Documentation

* [Application Readme](frontend/README.md)