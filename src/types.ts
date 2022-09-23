export type Debris = {
  title: string
  tags?: Tag | Tag[]
  summary?: string | string[]
  links?: string | string[]
  keywords?: string | string[]
  dumpster: Section
}

export type Tag = "bugfix" | "research" | "development" | "other"

export type Section =
  | "devops"
  | "fullstack"
  | "it"
  | "marketing"
  | "r&d"
  | "other"

export interface GetDebrisTitleParams {
  wantedTitle: string
}

export interface GetDebrisTagsParams {
  wantedTag: Tag
}

export interface GetDebrisDumpsterParams {
  wantedDumpster: Section
}

export interface GetDebrisDumpsterTitleParams {
  wantedDumpster: Section
  wantedTitle: string
}

export interface GetDebrisDumpsterTagParams {
  wantedDumpster: Section
  wantedTag: Tag
}

export interface GetDebrisTitleTagParams {
  wantedTitle: string
  wantedTag: Tag
}

export interface GetDebrisDumpsterTagTitleParams {
  wantedDumpster: Section
  wantedTitle: string
  wantedTag: Tag
}

export interface GetDebrisIDParams {
  id: string
}

export interface PostDebrisBody {
  title: string
  tags?: Tag | Tag[]
  summary?: string | string[]
  links?: string | string[]
  keywords?: string | string[]
  dumpster: Section
}

export type LogSuffixPrefix = {
  prefix: string
  suffix: string
}

export type User = {
  id: string
  password: string
  name: string
  isAdmin: boolean
  withPermissions: boolean
}
