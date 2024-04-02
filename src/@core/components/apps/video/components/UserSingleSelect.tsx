import React, { useState, useMemo } from 'react'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import { useSelector } from 'react-redux'
import _ from 'lodash'
import Box from '@mui/material/Box'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank'
import CheckBoxIcon from '@mui/icons-material/CheckBox'

// ** types
import { RootState } from 'src/store'
import { IUser } from 'src/types/apps/user'

interface ILabelMultiSelect {
  user: IUser
  setUser: (user: IUser) => void
}

const icon = <CheckBoxOutlineBlankIcon fontSize='small' />
const checkedIcon = <CheckBoxIcon fontSize='small' />

export default function UserSingleSelect({ user, setUser }: ILabelMultiSelect) {
  const [selected, setSelected] = useState<IUser | {} | any>({})
  const store = useSelector((state: RootState) => state?.user)

  useMemo(() => {
    setSelected(user)
  }, [user])

  useMemo(() => {
    if (selected) {
      setUser(selected)
    }
  }, [selected])

  return (
    <Autocomplete
      disablePortal
      fullWidth
      id='combo-box-demo'
      options={store?.entities}
      getOptionLabel={option => (typeof option === 'string' ? option : option?.first_name)}
      value={selected}
      sx={{ width: 300 }}
      renderOption={(props, option) => (
        <Box component='li' key={option?.first_name} {...props}>
          {option?.first_name || 'Users'}
        </Box>
      )}
      renderInput={params => <TextField {...params} label='users' />}
      onChange={(r, e): any => setSelected(e)}
    />
  )
}
