import {useRouter} from 'next/router'

function Slug() {
    const router = useRouter()
  return (
    <div>{router.query.slug}</div>
  )
}

export default Slug