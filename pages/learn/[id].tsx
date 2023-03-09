import { useRouter } from "next/router";
import React from "react";
import { Link, Text } from "vcc-ui";

export default function AboutPage() {
  const router = useRouter();
  const id = router.query.id as string;

  return (
    <div>
      <Link href="/">Go back</Link>
      <p>Learn more about {id}</p>
    </div>
  );
}
