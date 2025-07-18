import Link from 'next/link';
import React from 'react'
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";


        

const SocialLinks = () => {
  return (
    <div className='hidden lg:block'>

    <div className='flex gap-3 '>
        <Link href={"Https://facebook.com/affiliatesworks"}  ><FaFacebook  className="hover:text-secondary " size={"23px"}/></Link>
      <Link href={"Https://instagram.com/affiliatesworks"} ><FaInstagram className="hover:text-secondary "size={"23px"}/></Link>
      <Link href={"https://linkedin.com/company/affiliatesworks"} ><FaLinkedin className="hover:text-secondary " size={"23px"}/></Link>
      <Link href={"https://x.com/affiliatesworks"} ><FaXTwitter className="hover:text-secondary "  size={"23px"}/></Link>

      
    </div>
    </div>
  )
}

export default SocialLinks
