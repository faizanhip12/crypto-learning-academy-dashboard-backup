import { Stack, Typography, Box, Button, Skeleton, Grid, TextField } from '@mui/material'
import Image from 'next/image'
import AddIcon from '@mui/icons-material/Add'
import FileUploader from 'src/@core/components/apps/workspace/components/FileUploader'
import { useWorkspace } from 'src/@core/hooks/apps/useWorkspace'
import { useRouter } from 'next/router'
import { useContext, useEffect, useState, Fragment } from 'react'
import WorkSpaceFiles from 'src/@core/components/apps/workspace/components/WorkSpaceFiles'
import UploadFoldersSection from 'src/@core/components/apps/workspace/components/UploadFoldersSection'
import useToggleDrawer from 'src/@core/hooks/useToggleDrawer'
import { AbilityContext } from 'src/layouts/components/acl/Can'
import { useAuth } from 'src/hooks/useAuth'
import { IWorkspace } from 'src/types/apps/workspace'
import DataNotFound from 'src/@core/components/apps/channels/components/DataNotFound'
import { FolderRefresh } from 'mdi-material-ui'
import { Edit, Delete } from '@mui/icons-material'

const Page = () => {
  const { store, getWorkspace, getAllWorkspacesFolder, updateWorkspaceFolderName, deleteWorkspaceFolder } =
    useWorkspace(null)
  const { handleDrawer, handleModal } = useToggleDrawer()
  const ability = useContext(AbilityContext)
  const [isEdit, setIsEdit] = useState(false)
  const [text, setText] = useState('')
  const [idd, setId] = useState('')

  const handleDelete = async () => {
    handleModal(null)
    // handleRowOptionsClose()
  }

  const {
    query: { id }
  } = useRouter()

  const { user } = useAuth()

  useEffect(() => {
    // getAllWorkspacesFolder(id)
    getWorkspace(id as string)
  }, [])

  const handleUpdateFolderName = async (e: any) => {
    // setText(e.target.value)
    // let data = {
    //   name: text
    // }
    // const response = await updateWorkspaceFolderName(idd, { name: text })
    // if (response) {
    //   setIsEdit(false)
    //   getWorkspace(id as string)
    //   // setIsEdit
    // }
  }

  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <Image
          src={
            (store?.entity && 'course' in store?.entity && store?.entity?.course?.thumbnail) ||
            '/images/avatars/Group.png'
          }
          width='100px'
          height='100px'
          alt='Remy sharp'
          style={{ borderRadius: 10, cursor: 'pointer' }}
        />
        <Stack direction='column' sx={{ marginLeft: '20px' }}>
          <Box display={'flex'} m={'auto'}>
            <Box display={'flex'} flexDirection={'column'}>
              <Typography variant='h4' color='white'>
                {(store?.entity && 'course' in store?.entity && store?.entity?.course?.name) || 'Workspace'}
              </Typography>
              <Typography variant='body1' color='white'>
                Short Description Here
              </Typography>
            </Box>
          </Box>
        </Stack>
      </Box>
      {ability.can('itsHaveAccess', 'upload-folder-button') &&
        user?.activeChannel?.channel?.id === (store?.entity as IWorkspace)?.course?.channelId && (
          <Box component='div' mt={5}>
            <Button variant='outlined' endIcon={<AddIcon />} sx={{ ml: 2 }} onClick={handleDelete}>
              Create New
            </Button>
          </Box>
        )}
      {store?.status === 'pending' ? (
        <Skeleton variant='rectangular' width={'100%'} height={'80vh'} />
      ) : store.status === 'success' && !store.entity?.folders?.length ? (
        <Box component='div' width={'300px'} mt={5}>
          <DataNotFound />
        </Box>
      ) : store.status === 'error' ? (
        <Box mt={5}>
          <Typography textAlign={'center'}>An Error Occured</Typography>
        </Box>
      ) : (
        store?.entity?.folders?.map((folders: IWorkspace) => {
          return (
            <Fragment key={folders.id}>
              {isEdit && idd === folders?.id ? (
                <TextField
                  style={{
                    borderTop: 0
                  }}
                  defaultValue={folders?.name}
                  autoFocus
                  onBlur={e => {
                    const inputValue = e.target.value.trim()
                    if (inputValue === '') {
                      setIsEdit(false)
                    } else {
                      setText(inputValue)
                      updateWorkspaceFolderName(idd, { name: inputValue }).then(res => {
                        if (res) {
                          setIsEdit(false)
                          setText('')
                          setId('')
                        }
                      })
                    }
                  }}
                />
              ) : (
                <Box display='flex'>
                  <Typography variant='h4' mt={2} sx={{ margin: '20px 0' }}>
                    {folders?.name}{' '}
                    <Edit
                      sx={{ marginLeft: 5 }}
                      cursor={'pointer'}
                      onClick={() => {
                        setIsEdit(true)
                        setId(folders?.id)
                      }}
                    />
                    <Delete
                      cursor={'pointer'}
                      sx={{ marginLeft: 5 }}
                      onClick={() => {
                        deleteWorkspaceFolder(folders?.id)
                      }}
                    />
                  </Typography>
                </Box>
              )}
              <Box display='flex'>
                <Grid container>
                  <Grid lg={8} marginRight='20px' sm={6} md={6} xs={12}>
                    <WorkSpaceFiles direction={'rtl'} folders={folders} />
                  </Grid>
                  {ability.can('itsHaveAccess', 'upload-files-button') &&
                    user?.activeChannel?.channel?.id === (store?.entity as IWorkspace)?.course?.channelId && (
                      <Grid lg={3} sx={{ zIndex: '99999' }} sm={5} md={5} xs={12}>
                        <FileUploader
                          name='file'
                          accept={{
                            'video/*': [
                              '.png',
                              '.jpg',
                              '.jpeg',
                              '.gif',
                              '.mp4',
                              '.mp3',
                              '.pdf',
                              '.doc',
                              '.docx',
                              '.xls',
                              '.xlsx',
                              '.ppt',
                              '.pptx',
                              '.zip',
                              '.rar',
                              '.exe'
                            ]
                          }}
                          maxFiles={1}
                          maxSize={1000000000}
                          minSize={1}
                          id={folders?.id}
                        />
                      </Grid>
                    )}
                </Grid>
              </Box>
            </Fragment>
          )
        })
      )}
      <UploadFoldersSection title='Upload Folders' onAgree={handleDelete} id={(store?.entity as IWorkspace)?.id} />
    </>
  )
}

Page.acl = {
  action: 'itsHaveAccess',
  subject: 'workspace-page'
}

export async function getServerSideProps() {
  // Return the fetched data as props
  return {
    props: {}
  }
}

export default Page
