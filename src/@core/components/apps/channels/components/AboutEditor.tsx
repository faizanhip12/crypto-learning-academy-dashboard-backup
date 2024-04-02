import React, { useEffect, useRef } from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { useChannels } from 'src/@core/hooks/apps/useChannels'

interface CKeditorProps {
  editorLoaded: boolean | any
  key: string
}

export default function CKeditor({ editorLoaded, key }: CKeditorProps) {
  const editorRef = useRef<{ CKEditor: typeof CKEditor; ClassicEditor: typeof ClassicEditor }>()
  useEffect(() => {
    editorRef.current = {
      CKEditor: require('@ckeditor/ckeditor5-react').CKEditor,
      ClassicEditor: require('@ckeditor/ckeditor5-build-classic')
    }
  }, [])

  const {
    store: {
      entity: { about }
    }
  } = useChannels(null)

  return (
    <>
      {editorLoaded ? (
        <CKEditor
          editor={ClassicEditor}
          data={about}
          onChange={(event: any, editor: any) => {
            const data = editor.getData()
            // setValue('description', 'data')
            // setValue(`questions.${index}.name`, data)
            // onChange(data)
          }}
          id={key}
          disabled
          config={{
            toolbar: [
              'heading',
              '|',
              'bold',
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
