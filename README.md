[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=spectral-sarif&metric=coverage)](https://sonarcloud.io/summary/new_code?id=spectral-sarif)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=spectral-sarif&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=spectral-sarif)

Spectral-sarif is a Node based tool for transforming spectral json output to sarif format.

The purpose is for importing the spectral output into static analysis tools such as SonarQube for the tracking of spectral issues.


```
   npm install spectral-sarif
```

To see a list of options run

```
npx spectral-sarif


Usage: spectral-sarif [options] <filename>

Options:
      --help     Show help                                             [boolean]
      --version  Show version number                                   [boolean]
  -o, --output   Output filename                                        [string]
  -r, --root     Root directory                                         [string]

Not enough non-option arguments: got 0, need at least 1
```

Spectral-cli must be first run with the -f json -o out.json commandis to produce a json output of the spectral errors and warnings

see https://www.npmjs.com/package/@stoplight/spectral for more information about spectral. Its an excellent tool for analysing OpenAPI documents.

To run spectral lint generating json output for spectral-sarif to read you need to run it like this:

```
spectral -f json -o out.json lint openapi.yaml
```

Then you can now run spectral-sarif -o out.sarif out.json, it simply transforms the spectral json output into sarif format

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

For sonarqube the pyhsical location must be relative to the sonar.source directory in order for sonarqube to see the code itself, where as spectral will supply a full path to the openapi.json/yaml file,

For this we have added a -r option that can be added which will stream the leading part of the path.

```
spectral-sarif -r c:\source\myproject -o out.sarif out.json
```

This root directory should be the path to your sonar-project.properties file.

NOTE: SonarCloud does not support sarifReportPaths (in the same way as SonarQube does)
