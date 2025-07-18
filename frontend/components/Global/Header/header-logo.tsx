import Image from "next/image";
import Link from "next/link";
import React from "react";

function HeaderLogo() {
  return (
    <Link href={"/"}>
      <Image
        src={"/images/AFFILIATESWORKS.png"}
        alt="Affiliatesworks"
        width={250}
        height={50}
      />
    </Link>
  );
}

export default HeaderLogo;
