declare module "*.json"

declare interface AppsInstalled {
  user: string
  repo: string
  versionInstalled: string
  latest: string
  assetURL?: string
}

declare interface ReleaseInfo{
  url: string
  tag_name: string
  assets: Array<{
    name: string
    browser_download_url: string
  }>
}
