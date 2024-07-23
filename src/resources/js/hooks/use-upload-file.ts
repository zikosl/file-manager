import * as React from "react"
import { toast } from "sonner"

import { getErrorMessage } from "@/lib/handle-error"
import axios from "axios"



export function useUploadFile(
  endpoint: string,
  folder_id: number
) {
  const [uploadedFiles, setUploadedFiles] =
    React.useState<any[]>([])
  const [progresses, setProgresses] = React.useState<Record<string, number>>({})
  const [isUploading, setIsUploading] = React.useState(false)

  async function uploadThings(files: any[]) {
    setIsUploading(true)
    try {
      for (let index = 0; index < files.length; index++) {
        let file = files[index]
        const res = await axios.post(endpoint, {
          file: file,
          folder_id: folder_id
        }, {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          onUploadProgress: event => {
            if (event.lengthComputable) {
              console.log()
              setProgresses((prev) => {
                let total = event?.total ?? event.loaded
                return {
                  ...prev,
                  [file.name]: event.loaded / total * 100,
                }
              })
            }

          }
        })
        setUploadedFiles([...uploadedFiles, res])
      }
    } catch (err) {
      toast.error(getErrorMessage(err))
    } finally {
      setProgresses({})
      setIsUploading(false)
    }
  }

  return {
    uploadedFiles,
    progresses,
    uploadFiles: uploadThings,
    isUploading,
  }
}
