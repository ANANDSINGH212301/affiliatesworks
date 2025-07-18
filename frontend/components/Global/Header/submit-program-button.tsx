import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

const SubmitProgramButton = () => {
  return (
    <>
    <Link href={"/submit-program"}>
       <Button className='hidden lg:block font-normal opacity-90 text-white hover:bg-primary'>Submit Your Program</Button>
    </Link>
    </>
  )
}

export default SubmitProgramButton
