export interface StudioMediaAsset {
  id: string
  title: string
  filename: string
  url: string
  type: string
  usage: string
  description: string
  size?: number
  updatedAt?: string
}

export function useStudioMediaLibrary() {
  const assets = useState<StudioMediaAsset[]>('studio-media-assets', () => [])
  const pending = useState<boolean>('studio-media-assets-pending', () => false)
  const error = useState<string>('studio-media-assets-error', () => '')
  const mediaFetchHeaders = import.meta.server ? useRequestHeaders(['cookie']) : undefined
  const mediaApiBase = import.meta.server ? useRequestURL().origin : ''

  const findAsset = (url?: string) => assets.value.find((asset) => asset.url === url || asset.filename === url)
  const refreshAssets = async () => {
    pending.value = true
    error.value = ''

    try {
      const response = await $fetch<{ assets: StudioMediaAsset[] }>(`${mediaApiBase}/api/admin/media/list`, {
        headers: mediaFetchHeaders
      })
      assets.value = response.assets ?? []
    } catch (fetchError: any) {
      error.value = fetchError?.data?.statusMessage || fetchError?.message || 'Could not read media library.'
      assets.value = []
    } finally {
      pending.value = false
    }
  }

  const uploadAsset = async (file: File) => {
    pending.value = true
    error.value = ''

    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await $fetch<{ ok: boolean, asset: StudioMediaAsset }>(`${mediaApiBase}/api/admin/media/upload`, {
        method: 'POST',
        headers: mediaFetchHeaders,
        body: formData
      })

      await refreshAssets()
      if (!assets.value.some((asset) => asset.url === response.asset.url)) {
        assets.value = [response.asset, ...assets.value]
      }
      return response.asset
    } catch (uploadError: any) {
      error.value = uploadError?.data?.statusMessage || uploadError?.message || 'Upload failed.'
      throw uploadError
    } finally {
      pending.value = false
    }
  }

  return {
    assets,
    pending,
    error,
    findAsset,
    refreshAssets,
    uploadAsset
  }
}
