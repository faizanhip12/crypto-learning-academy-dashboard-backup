import React, { useEffect, useRef } from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

interface CKeditorProps {
  // onChange?: (data: string) => void;
  name: string
  setValue: any
  index: any
  value: any
  editorLoaded: boolean | any
}

export default function CKeditor({
  // onChange,
  name,
  setValue,
  index,
  editorLoaded,
  value
}: CKeditorProps) {
  const editorRef = useRef<{ CKEditor: typeof CKEditor; ClassicEditor: typeof ClassicEditor }>()
  useEffect(() => {
    editorRef.current = {
      CKEditor: require('@ckeditor/ckeditor5-react').CKEditor,
      ClassicEditor: require('@ckeditor/ckeditor5-build-classic')
    }
  }, [])

  return (
    <>
      {editorLoaded ? (
        <CKEditor
          editor={ClassicEditor}
          data={value}
          onChange={(event: any, editor: any) => {
            const data = editor.getData()
            setValue(`questions.${index}.name`, data)
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
