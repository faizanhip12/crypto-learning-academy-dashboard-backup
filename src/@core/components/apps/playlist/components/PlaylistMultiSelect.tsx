import React, { useState, useMemo } from 'react'
import _ from 'lodash'
import Checkbox from '@mui/material/Checkbox'
import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank'
import CheckBoxIcon from '@mui/icons-material/CheckBox'
import { usePlaylist } from 'src/@core/hooks/apps/usePlaylist'

// ** types
import { IPlaylist } from 'src/types/apps/playlist'

interface ILabelMultiSelect {
  playlist: IPlaylist[]
  setPlaylist: (playlist: IPlaylist[]) => void
}

const icon = <CheckBoxOutlineBlankIcon fontSize='small' />
const checkedIcon = <CheckBoxIcon fontSize='small' />

export default function MultiSelect({ playlist, setPlaylist }: ILabelMultiSelect) {
  const [selected, setSelected] = useState<IPlaylist[] | []>([])
  const { getAllPlaylist, store, getPlaylistById } = usePlaylist(null)

  React.useEffect(() => {
    const { query } = { query: '' }
    getAllPlaylist(query)
  }, [])

  useMemo(() => {
    setSelected(playlist)
  }, [playlist])

  useMemo(() => {
    if (_.isArray(selected)) {
      setPlaylist(selected)
    }
  }, [selected])

  return (
    <Autocomplete
      fullWidth
      multiple
      id='label-multi-select'
      options={store?.entities}
      getOptionLabel={option => option?.playlistName}
      value={selected}
      onChange={(r, e) => setSelected(e as IPlaylist[])}
      disableCloseOnSelect
      renderOption={(props, option, { selected }) => (
        <li {...props}>
          <Checkbox icon={icon} checkedIcon={checkedIcon} style={{ marginRight: 8 }} checked={selected} />
          {option?.playlistName}
        </li>
      )}
      renderInput={params => <TextField {...params} label='Select Categories' placeholder='Playlist' />}
    />
  )
}
