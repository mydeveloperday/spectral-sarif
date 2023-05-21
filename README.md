[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=spectral-sarif&metric=coverage)](https://sonarcloud.io/summary/new_code?id=spectral-sarif)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=spectral-sarif&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=spectral-sarif)

Spectral-sarif is a Node based tool for transforming spectral json output to sarif format.

The purpose is for importing the spectral output into static analysis tools such as SonarQube for the tracking of spectral issues.

Spectral-cli must be first run with the -f json -o out.json commandis to produce a json output of the spectral errors and warnings

```
spectral -f json -o out.json lint openapi.yaml
```

Then run spectral-sarif -o out.sarif out.json

```
spectral-sarif -o out.sarif out.json
```

Now running sonar-scanner with the following properties

```
sonar.host.url=<your sonarqube url>
sonar.projectKey=spectral-sarif
sonar.sources=.
sonar.login=<your token>
sonar.sarifReportPaths=./out.sarif
```

For sonarqube the pyhsical location must be relative to the sonar.source directory in order for sonarqube to see the code itself, whereas spectral will supply a full path to the openapi.json file,
For this we have added a -r option

```
spectral-sarif -r c:\source\myproject -o out.sarif out.json
```

This root directory should be the path to your sonar-project.properties file.

NOTE: SonarCloud does not support sarifReportPaths (in the same way as SonarQube does)
