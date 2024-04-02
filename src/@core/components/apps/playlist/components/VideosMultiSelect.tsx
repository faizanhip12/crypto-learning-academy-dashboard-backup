import React, { useState, useMemo } from 'react'
import _ from 'lodash'
import Checkbox from '@mui/material/Checkbox'
import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank'
import CheckBoxIcon from '@mui/icons-material/CheckBox'
import { usePlaylist } from 'src/@core/hooks/apps/usePlaylist'

// ** types
import { IVideo } from 'src/types/apps/video'
import Image from 'next/image'
import { Box } from '@mui/system'
import { useVideo } from 'src/@core/hooks/apps/useVideo'
import { fetchAllAction } from 'src/store/apps/video'
import useAsync from 'src/@core/hooks/useAsync'
import { VideoService, playlistService } from 'src/services'
import { CardMedia } from '@mui/material'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { RootState } from 'src/store'
import { textOverflow } from 'src/@core/helper/text'

interface ILabelMultiSelect {
  videos: IVideo[]
  setVideos: (videos: IVideo[]) => void
}

interface VideosMultiSelectProps {
  videos: IVideo[]
  setVideos: (selectedVideo: IVideo[]) => void
}

const icon = <CheckBoxOutlineBlankIcon fontSize='small' />
const checkedIcon = <CheckBoxIcon fontSize='small' />

export const VideosMultiSelect: React.FC<VideosMultiSelectProps> = ({ videos, setVideos }) => {
  const [selected, setSelected] = useState<IVideo[] | []>([])

  const {
    query: { id }
  } = useRouter()

  const dispatch = useDispatch()

  React.useEffect(() => {
    dispatch(fetchAllAction({ query: id }) as any)
  }, [])

  const store = useSelector((state: RootState) => state.video)

  useMemo(() => {
    setSelected(videos)
  }, [videos])

  useMemo(() => {
    if (_.isArray(selected)) {
      setVideos(selected)
    }
  }, [selected])

  return (
    <Autocomplete
      fullWidth
      multiple
      id='label-multi-select'
      options={store?.entities || []}
      getOptionLabel={option => option?.title}
      value={selected}
      onChange={(r, e) => setSelected(e as IVideo[])}
      disableCloseOnSelect
      renderOption={(props, option, { selected }) => (
        <li {...props}>
          <Checkbox icon={icon} checkedIcon={checkedIcon} style={{ marginRight: 8 }} checked={selected} />
          <Image src={option?.thumbnail_url as string} width='80px' height={'80px'} alt='thumbnail' />
          <Box component='span' m='{1}' sx={{ marginLeft: '15px' }}></Box>
          {/* {option?.title} */}
          {textOverflow(option?.title, 20)}
        </li>
      )}
      renderInput={params => <TextField {...params} label='Select Videos' placeholder='Videos' />}
    />
  )
}
