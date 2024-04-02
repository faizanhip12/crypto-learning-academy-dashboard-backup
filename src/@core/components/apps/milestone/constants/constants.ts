export const MILESTONE_TYPES = {
  STREAK: 'STREAK',
  COUNT: 'COUNT'
}

export const MILESTONE_TYPES_LIST = [
  {
    value: 'STREAK',
    title: 'Streak'
  },
  {
    value: 'COUNT',
    title: 'Count'
  }
]

export const MILESTONE_ENTITIES = [
  {
    value: 'COURSE',
    title: 'Course'
  },
  {
    value: 'REVIEW',
    title: 'Review'
  },
  {
    value: 'VIDEO',
    title: 'Video'
  },
  {
    value: 'ASSIGNMENT',
    title: 'Assignment'
  },
  {
    value: 'COMMUNITY_PARTICIPATION',
    title: 'Community participation'
  },
  {
    value: 'CERTIFICATION',
    title: 'Certifications'
  },
  {
    value: 'GRADES',
    title: 'Grades'
  }
]

export function getReadableMilestoneEntityName(milestoneEntity: string) {
  const type = MILESTONE_ENTITIES.find(el => el.value === milestoneEntity)
  if (!type) return ''

  return type.title
}
