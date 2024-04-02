import React, { useEffect, useRef } from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { usePlaylist } from 'src/@core/hooks/apps/usePlaylist'

interface CKeditorProps {
  editorLoaded: boolean | any
  setValue: any
  serviceId: string
}

export default function CKeditor({ editorLoaded, setValue, serviceId }: CKeditorProps) {
  const editorRef = useRef<{ CKEditor: typeof CKEditor; ClassicEditor: typeof ClassicEditor }>()
  useEffect(() => {
    editorRef.current = {
      CKEditor: require('@ckeditor/ckeditor5-react').CKEditor,
      ClassicEditor: require('@ckeditor/ckeditor5-build-classic')
    }
  }, [])

  const { store } = usePlaylist(null)

  return (
    <>
      {editorLoaded ? (
        <CKEditor
          editor={ClassicEditor}
          data={serviceId ? store?.entity?.description || '' : ''}
          onChange={(event: any, editor: any) => {
            const data = editor.getData()
            setValue('description', data)
            // onChange(data)
          }}
          config={{
            toolbar: [
              'heading',
              '|',
              'bold',
              'color',
              'mediaEmbed',
              'italic',
              'link',
              'bulletedList',
              'numberedList',
              'blockQuote'
            ]
          }}
        />
      ) : (
        <div>Editor loading</div>
      )}
    </>
  )
}
