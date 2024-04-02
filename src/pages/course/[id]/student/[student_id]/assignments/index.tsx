import LoadingButton from '@mui/lab/LoadingButton'
import {
  Stack,
  Typography,
  Box,
  Card,
  CardContent,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Divider,
  Skeleton
} from '@mui/material'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import DataNotFound from 'src/@core/components/apps/channels/components/DataNotFound'
import { useAssignment } from 'src/@core/hooks/apps/useAssignment'
import { IAssignment } from 'src/types/apps/assignment'

const Page = () => {
  const { store, getSingleStudentAssignments, addCertificate } = useAssignment(null)

  const {
    query: { student_id, id },
    push
  } = useRouter()

  useEffect(() => {
    if (!student_id || !id) return
    getSingleStudentAssignments(student_id as string, id as string)
  }, [])

  async function onCertificateHandler() {
    if (!student_id || !id) return

    const response = await addCertificate({
      courseId: id as string,
      studentId: student_id as string
    })
    if (response) {
      getSingleStudentAssignments(student_id as string, id as string)
    }
  }

  function onCertificateViewHandler() {
    if (!student_id || !id) return
    push(`/course/${id}/student/${student_id}/certification`)
  }

  const course = store?.entity as any

  return (
    <>
      <Box sx={{ display: 'flex' }} style={{ width: '100%' }}>
        <Stack style={{ width: '100%' }}>
          <Typography variant='h3'>Student Assignment</Typography>
          <Typography variant='caption'>
            Name: {`${course?.user?.first_name} ${course?.user?.last_name}` || ''} ({course?.user?.email})
          </Typography>

          <Box sx={{ mt: 5 }} />

          <Card>
            <CardContent>
              <Stack direction='row' justifyContent='space-between' alignItems='flex-start'>
                <Box>
                  <Typography variant='caption'>Course Name</Typography>
                  <Typography variant='h5'>{course?.name}</Typography>
                  <Typography variant='caption'>
                    Overall Progress: {course?.totalVideosCompletedCount}/{course?.totalVideosCount} (
                    {course?.courseCompletePercentage}% Completed)
                  </Typography>
                  <Box />
                  <Typography variant='caption'>
                    Overall Scored: {course?.totalScoredByStudent}/{course?.totalCourseMarks} (
                    {course?.totalCoursePercentage || 0}%)
                  </Typography>
                  <Box />
                  {!course?.canCertified && !course?.isCertified ? (
                    <Typography variant='caption'>(Not eligible for certificate)</Typography>
                  ) : null}
                  {course?.isCertified ? (
                    <Typography variant='caption' color='green'>
                      Student Certificate is generated
                    </Typography>
                  ) : null}
                </Box>
                <Box>
                  {course?.canCertified || (course?.isCertified && !course?.canCertified) ? (
                    <LoadingButton
                      variant='contained'
                      onClick={course?.isCertified ? onCertificateViewHandler : onCertificateHandler}
                      loading={store.status === 'pending'}
                      color='primary'
                    >
                      {course?.isCertified ? 'View Certificate' : 'Generate Certificate'}
                    </LoadingButton>
                  ) : null}
                </Box>
              </Stack>
            </CardContent>
          </Card>

          <Box sx={{ mt: 5 }} />

          {store.status === 'pending' ? (
            <Skeleton variant='rectangular' width={'100%'} height={'80vh'} />
          ) : store.status === 'success' && !store.entities?.length ? (
            <Box maxWidth={300}>
              <DataNotFound />
            </Box>
          ) : store.status === 'error' ? (
            <Typography variant='h5' textAlign={'center'}>
              An Error Occured
            </Typography>
          ) : (
            store.entities?.map((assignment: IAssignment) => (
              <Card sx={{ mt: 3 }} style={{ width: '100%' }} key={assignment.id}>
                <CardContent>
                  <Typography variant='caption'>Video Name</Typography>
                  <Typography variant='h5'>{assignment?.video?.title}</Typography>
                  <Typography variant='caption'>
                    Student Scored: {(assignment?.assignmentResult?.[0]?.assignmentScore?.[0]?.points).toFixed(2)} %
                  </Typography>
                  <Divider />
                  <Box sx={{ mt: 5 }} />
                  <Typography variant='caption'>Assignment Name</Typography>
                  <Typography variant='h5'>{assignment?.video?.Assignment?.[0]?.title}</Typography>

                  {assignment?.video?.Assignment?.[0]?.questions?.map((question: any, i: number) => (
                    <FormControl fullWidth key={i}>
                      <Stack direction='row' justifyContent='flex-start' alignItems='center'>
                        <Typography variant='caption' sx={{ mr: 1 }}>
                          Q{i + 1}:
                        </Typography>
                        <Typography
                          dangerouslySetInnerHTML={{
                            __html: question?.text
                          }}
                        />
                        <Typography variant='caption' sx={{ ml: 2 }}>
                          ({question?.point})
                        </Typography>
                      </Stack>
                      <RadioGroup row>
                        {question?.choices?.map((choice: any) => {
                          let isChecked = !!assignment?.assignmentResult?.[0]?.assignmentAnswer?.find(
                            (el2: any) => el2.choiceId === choice.id
                          )
                          let isCorrect = choice?.isCorrect
                          return (
                            <FormControlLabel
                              key={choice.id}
                              value={choice.id}
                              disabled
                              control={
                                <Radio
                                  checked={isChecked || isCorrect}
                                  sx={{
                                    color: isChecked && choice?.isCorrect ? 'green' : isCorrect ? 'yellow' : 'red',
                                    '&.Mui-checked': {
                                      color: isChecked && choice?.isCorrect ? 'green' : isCorrect ? 'yellow' : 'red'
                                    }
                                  }}
                                />
                              }
                              label={choice.text}
                            />
                          )
                        })}
                      </RadioGroup>
                    </FormControl>
                  ))}
                </CardContent>
              </Card>
            ))
          )}
        </Stack>
      </Box>
    </>
  )
}

Page.acl = {
  action: 'itsHaveAccess',
  subject: 'single-student-assignment-page'
}

export async function getServerSideProps() {
  return {
    props: {}
  }
}

export default Page
