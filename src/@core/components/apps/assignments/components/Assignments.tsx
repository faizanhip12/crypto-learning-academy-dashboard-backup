import { Box, Grid, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import LoadingButton from '@mui/lab/LoadingButton'
import ControlledRadioButtonsGroup from 'src/@core/components/form/Radio'
import { useAssignment } from 'src/@core/hooks/apps/useAssignment'
import { IAssignment } from 'src/types/apps/assignment'
import toast from 'react-hot-toast'
import { useTheme } from '@mui/material/styles'

const Assignments: React.FC<{}> = () => {
  const {
    form: { control, handleSubmit, setValue, getValues, watch },
    store,
    getAssignment,
    addAssignment
  } = useAssignment(null)

  const {
    palette: {
      linear_gradient: { modalGradient }
    }
  } = useTheme()
  const [score, setScore] = useState<Number>()
  const [isSubmitted, setIsSubmitted] = useState(false)

  const {
    query: { id, slug },
    push
  } = useRouter()

  useEffect(() => {
    return () => {
      setScore(0)
      setIsSubmitted(false)
    }
  }, [])

  useEffect(() => {
    getAssignment(slug as string)
  }, [slug])

  useEffect(() => {
    if (store?.entity?.assignmentResult?.[0]?.assignmentAnswer) {
      store?.entity?.assignmentResult[0]?.assignmentAnswer?.forEach((answer: any, index: number) => {
        const questionIndex = store?.entity?.questions.findIndex((question: any) => question.id === answer.questionId)
        if (questionIndex !== -1) {
          const defaultChoiceId = answer.choiceId
          // @ts-ignore
          setValue(`choice_${questionIndex}`, defaultChoiceId)
        }
      })
    }
  }, [store?.entity])

  const onSubmit = async (body: IAssignment) => {
    const results: any[] = []
    store?.entity?.questions?.forEach((question: any, index: number) => {
      const selectedChoiceId = body[`choice_${index}`]
      results?.push({
        questionId: question.id,
        choiceId: selectedChoiceId
      })
    })
    const data = {
      assignmentId: store?.entity?.id,
      courseId: id,
      videoId: slug,
      results
    }
    if (results.some(item => item.choiceId === undefined)) {
      toast.error('You Must Fill Out All Fields To Submit')
    } else {
      const { data: scoreData } = await addAssignment(data)
      setIsSubmitted(true)
      setScore(scoreData?.score?.points)
      if (scoreData?.score?.isPassed) {
        toast.success('Congrats You Have Successfully Passed This Assignment')
        setTimeout(() => {
          push(`/course/${id}/video/${slug}`)
        }, 2000)
      } else {
        toast.error(`You Score ${scoreData?.score?.points} Points`)
      }
    }
  }

  if (!store?.entity?.title) {
    return (
      <Typography variant='h3' textAlign={'center'}>
        Assignment Not Uploaded
      </Typography>
    )
  } else {
    return (
      <>
        <Typography variant='h4' textAlign={'center'} marginBottom={10}>
          Assignment
        </Typography>
        {store?.entity?.assignmentResult[0]?.isPassed && (
          <Typography variant='h6' textAlign={'center'} marginBottom={10}>
            You Have Successfully Passed This Assignment with{' '}
            {store?.entity?.assignmentResult[0]?.assignmentScore[0]?.points?.toFixed(2) + '%'}
          </Typography>
        )}
        {store?.entity?.assignmentResult?.length > 0 || score !== null ? (
          <Typography variant='h4' textAlign={'center'} marginBottom={10}>
            {/* You Score :{' '} */}
            {isSubmitted
              ? `You Score :${score?.toFixed(2)}` + '%'
              : store?.entity?.assignmentResult?.length > 0
              ? `You Score :${store?.entity?.assignmentResult[0]?.assignmentScore[0]?.points?.toFixed(2)}` + '%'
              : null}{' '}
          </Typography>
        ) : null}
        <Typography variant='h4'>{store?.entity?.title}</Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container>
            <Grid item width='100%'>
              {store?.entity?.questions?.map((item: IAssignment, k: number) => {
                return (
                  <Box component={'div'} key={item?.id}>
                    <Box
                      component={'div'}
                      sx={{
                        background: modalGradient,
                        mt: 10,
                        padding: 5,
                        borderRadius: 2
                      }}
                    >
                      <Typography
                        variant='body1'
                        dangerouslySetInnerHTML={{ __html: `Question ${k + 1 + ': ' + item?.text}` }}
                      ></Typography>
                      {/* <Typography variant='body1'>{`Question ${k + 1 + ': ' + item?.text}`}</Typography> */}
                    </Box>
                    <Box>
                      <ControlledRadioButtonsGroup
                        key={k}
                        name={`choice_${k}`}
                        label=' '
                        control={control}
                        disabled={store?.entity?.assignmentResult[0]?.isPassed}
                        questionId={item.id}
                        options={item?.choices?.map((choice: IAssignment, index: number) => {
                          return {
                            value: choice?.id,
                            label: choice?.text
                          }
                        })}
                      />
                    </Box>
                  </Box>
                )
              })}
            </Grid>
          </Grid>
          {!store?.entity?.assignmentResult[0]?.isPassed && (
            <LoadingButton
              variant='contained'
              type='submit'
              sx={{ mt: 5 }}
              loading={store.status === 'pending'}
              disabled={store.status === 'pending' || store?.entity?.assignmentResult[0]?.isPassed}
              color='primary'
            >
              Submit
            </LoadingButton>
          )}
        </form>
      </>
    )
  }
}

export default Assignments
