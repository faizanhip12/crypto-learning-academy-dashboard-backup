import { Button } from '@mui/material'
import React from 'react'

const CreateMeetingBtn = ({ onClick }: { onClick: () => {} }) => {
    return (
        <Button variant='contained' onClick={() => onClick()}>
            Create Meeting
        </Button>
    )
}

export default CreateMeetingBtn