
Spectral-sarif is a Node based tool for transforming spectral json output to sarif format.

The purpose is  for importing the spectral output into static analysis tools such as SonarQube for the tracking of spectral issues.

Spectral-cli must be first run with the -f json -o out.json commandis to produce a json output of the spectral errors and warnings

e.g.

spectral -f json -o out.json lint openapi.yaml

Then run spectral-sarif -o out.sarif out.json

spectral-sarif -o out.sarif out.json

Now running sonar-scanner with the following properties

sonar.host.url=<your sonarqube url>
sonar.projectKey=spectral-sarif
sonar.sources=.
sonar.login=<your token>
sonar.sarifReportPaths=./out.sarif


NOTE: SonarCloud does not support sarifReportPaths (in the same way as SonarQube does)


