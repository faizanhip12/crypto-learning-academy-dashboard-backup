import React, { useState, useMemo, useEffect } from 'react'
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
import { IUser } from 'src/types/apps/user'
import { useStudents } from 'src/@core/hooks/apps/useStudents'

interface ILabelMultiSelect {
  users: IUser[]
  setUsers: (users: IUser[]) => void
}

const icon = <CheckBoxOutlineBlankIcon fontSize='small' />
const checkedIcon = <CheckBoxIcon fontSize='small' />

export default function UsersMultiSelect({ users, setUsers }: ILabelMultiSelect) {
  const [selected, setSelected] = useState<IUser[] | []>([])

  const {
    query: { id }
  } = useRouter()

  //   const dispatch = useDispatch()

  const { getAllStudents } = useStudents(null)

  React.useEffect(() => {
    getAllStudents({ query: '' })
  }, [])
  const store = useSelector((state: RootState) => state?.students)

  useMemo(() => {
    setSelected(users)
  }, [users])

  useMemo(() => {
    if (_.isArray(selected)) {
      setUsers(selected)
    }
  }, [selected])

  return (
    <Autocomplete
      fullWidth
      multiple
      id='label-multi-select'
      options={store?.entities || []}
      getOptionLabel={option => option?.first_name as string}
      value={selected}
      onChange={(r, e) => setSelected(e as IUser[])}
      disableCloseOnSelect
      renderOption={(props, option, { selected }) => (
        <li {...props}>
          {/* <Checkbox icon={icon} checkedIcon={checkedIcon} style={{ marginRight: 8 }} checked={selected} /> */}
          <Box component='span' m='{1}' sx={{ marginLeft: '15px' }}></Box>
          {/* {option?.title} */}
          {textOverflow(option?.first_name as string, 20)}
        </li>
      )}
      renderInput={params => <TextField {...params} label='Select Users' placeholder='Users' />}
    />
  )
}
