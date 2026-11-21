import type { ResidentialComplex } from './types'

async function requestJson<T>(path: string): Promise<T> {
  const response = await fetch(path)
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${path}`)
  }
  return response.json() as Promise<T>
}

export function fetchCities(): Promise<string[]> {
  return requestJson<string[]>('/api/cities')
}

export function fetchComplexes(parameters: URLSearchParams): Promise<ResidentialComplex[]> {
  return requestJson<ResidentialComplex[]>(`/api/complexes?${parameters.toString()}`)
}
