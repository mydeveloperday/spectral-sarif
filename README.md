
spectral-sarif is a tool to go from spectral json output to sarif format for importinf into static analysis tools such as sonarqube.

spectral must be run with the -f json -o out.json command to product a json output of the spectral errors and warnings

Then run spectral-sarif -o out.sarif out.json
