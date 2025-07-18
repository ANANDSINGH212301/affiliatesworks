import Link from 'next/link';
import React from 'react'
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";


        

const FooterSocialLinks = () => {
  return (
    

    <div className='flex gap-3 '>
        <Link href={"Https://facebook.com/affiliatesworks"}  ><FaFacebook  className="text-black  hover:text-secondary" size={"25px"}/></Link>
      <Link href={"Https://instagram.com/affiliatesworks"} ><FaInstagram className="text-black  hover:text-secondary" size={"25px"}/></Link>
      <Link href={"https://linkedin.com/company/affiliatesworks"} ><FaLinkedin className="text-black  hover:text-secondary" size={"25px"}/></Link>
      <Link href={"https://x.com/affiliatesworks"} ><FaXTwitter className="text-black  hover:text-secondary" size={"25px"}/></Link>

      
    </div>
  )
}

export default FooterSocialLinks
