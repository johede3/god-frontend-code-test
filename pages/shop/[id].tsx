import { useRouter } from "next/router";
import React from "react";
import { Link, Text } from "vcc-ui";

export default function BuyPage() {
  const router = useRouter();
  const id = router.query.id as string;

  return (
    <div>
      <Link href="/">Go back</Link>
      <p>Purchase your very own {id}</p>
    </div>
  );
}
