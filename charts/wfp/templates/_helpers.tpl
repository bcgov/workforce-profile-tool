{{/*
Expand the name of the chart.
*/}}
{{- define "wfp.name" -}}
{{- default .Chart.Name .Values.nameOverride | trunc 63 | trimSuffix "-" }}
{{- end }}

{{/*
Create a default fully qualified app name.
We truncate at 63 chars because some Kubernetes name fields are limited to this (by the DNS naming spec).
If release name contains chart name it will be used as a full name.
*/}}
{{- define "wfp.fullname" -}}
{{- if .Values.fullnameOverride }}
{{- .Values.fullnameOverride | trunc 63 | trimSuffix "-" }}
{{- else }}
{{- $name := default .Chart.Name .Values.nameOverride }}
{{- if contains $name .Release.Name }}
{{- .Release.Name | trunc 63 | trimSuffix "-" }}
{{- else }}
{{- printf "%s-%s" $name .Release.Name | trunc 63 | trimSuffix "-" }}
{{- end }}
{{- end }}
{{- end }}

{{/*
Define the config pattern of the chart based on options.
*/}}
{{- define "wfp.configname" -}}
{{- if .Values.config.releaseScoped }}
{{- include "wfp.fullname" . }}
{{- else }}
{{- include "wfp.name" . }}
{{- end }}
{{- end }}

{{/*
Create chart name and version as used by the chart label.
*/}}
{{- define "wfp.chart" -}}
{{- printf "%s-%s" .Chart.Name .Chart.Version | replace "+" "_" | trunc 63 | trimSuffix "-" }}
{{- end }}

{{/*
Common labels
*/}}
{{- define "wfp.labels" -}}
helm.sh/chart: {{ include "wfp.chart" . }}
app: {{ include "wfp.fullname" . }}
{{ include "wfp.selectorLabels" . }}
{{- if .Chart.AppVersion }}
app.kubernetes.io/version: {{ .Chart.AppVersion | quote }}
{{- end }}
app.kubernetes.io/component: frontend
app.openshift.io/runtime: react
{{- end }}

{{/*
Selector labels
*/}}
{{- define "wfp.selectorLabels" -}}
app.kubernetes.io/name: {{ include "wfp.name" . }}
app.kubernetes.io/instance: {{ .Release.Name }}
{{- end }}