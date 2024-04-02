import Image from 'next/image'
import React from 'react'

const FileRender = ({ file_type }: any) => {
  if (file_type === 'video/mp4') {
    return <Image src={'/images/cards/VideoIconImage.png'} width='100px' height='100px' alt='Video Image' />
  } else if (file_type === 'audio/mpeg') {
    return <Image src={'/images/cards/mp3Icon.png'} width='100px' height='100px' alt='Video Image' />
  } else if (file_type === 'image/jpeg' || file_type === 'image/jpg' || file_type === 'image/png') {
    return <Image src={'/images/cards/imageIcon.png'} width='100px' height='100px' alt='Video Image' />
  } else if (file_type === 'image/gif') {
    return <Image src={'/images/cards/gif.png'} width='100px' height='100px' alt='Video Image' />
  } else if (file_type === 'audio/mpeg') {
    return <Image src={'/images/cards/audioIcon.png'} width='100px' height='100px' alt='Video Image' />
  } else if (file_type === 'application/pdf') {
    return <Image src={'/images/cards/pdf.png'} width='100px' height='100px' alt='Video Image' />
  } else if (
    file_type === 'application/msword' ||
    file_type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ) {
    return <Image src={'/images/cards/docs.png'} width='100px' height='100px' alt='Video Image' />
  } else if (
    file_type === 'application/vnd.ms-excel' ||
    file_type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ) {
    return <Image src={'/images/cards/xls.png'} width='100px' height='100px' alt='Video Image' />
  } else if (file_type === 'application/pdf') {
    return <Image src={'/images/cards/pdf.png'} width='100px' height='100px' alt='Video Image' />
  } else if (
    file_type === 'application/vnd.ms-powerpoint' ||
    file_type === 'application/vnd.openxmlformats-officedocument.presentationml.presentation'
  ) {
    return <Image src={'/images/cards/ppt.png'} width='100px' height='100px' alt='Video Image' />
  } else if (file_type === 'application/zip') {
    return <Image src={'/images/cards/zip.png'} width='100px' height='100px' alt='Video Image' />
  } else if (file_type === 'application/octet-stream') {
    return <Image src={'/images/cards/rar.png'} width='100px' height='100px' alt='Video Image' />
  } else {
    return <Image src={'/images/cards/file.png'} width='100px' height='100px' alt='Video Image' />
  }
}

export default FileRender
